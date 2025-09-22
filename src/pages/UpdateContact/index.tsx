import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import ContentBox from "../../components/common/ContentBox";
import FormContentBox from "../../components/common/FormContentBox";
import ConsentForm from "../../components/common/ConsentForm";
import { contactFieldConfig } from "../../constants/contactConstants";
import { apiService } from "../../services/api.service";
import { setContactVerification } from "../../slices/app";
import PublicLayout from "../../components/layouts/PublicLayout";
import extractErrorAndShowToast from "../../utils/extract-error";
import { showSingleToast } from "../../utils/toast-util";

interface UpdateContactFormValues {
  type: string;
  regMobile: string;
  newMobile: string;
  regEmail: string;
  newEmail: string;
  consent: boolean;
}

const schema = Yup.object({
  type: Yup.string().required("Type is required"),

  regMobile: Yup.string().when("type", {
    is: (val: string) => val === "mobileNumber" || val === "mobileAndEmail",
    then: () =>
      Yup.string()
        .matches(/^\d{10}$/, "Must be a 10-digit number")
        .required("Registered mobile is required"),
    otherwise: () => Yup.string().notRequired(),
  }),

  newMobile: Yup.string().when("type", {
    is: (val: string) => val === "mobileNumber" || val === "mobileAndEmail",
    then: () =>
      Yup.string()
        .matches(/^\d{10}$/, "Must be a 10-digit number")
        .required("New mobile is required"),
    otherwise: () => Yup.string().notRequired(),
  }),

  regEmail: Yup.string().when("type", {
    is: (val: string) => val === "email" || val === "mobileAndEmail",
    then: () =>
      Yup.string()
        .matches(
          /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
          "Invalid email format"
        )
        .required("Registered email is required"),
    otherwise: () => Yup.string().notRequired(),
  }),

  newEmail: Yup.string().when("type", {
    is: (val: string) => val === "email" || val === "mobileAndEmail",
    then: () =>
      Yup.string()
        .max(100, "Email must be at most 100 characters")
        .matches(
          /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
          "Invalid email format. Only letters (a-z), numbers (0-9), and (. _ -) are allowed before the @ symbol."
        )
        // .email(
        //   "Invalid email format. Only letters (a-z), numbers (0-9), and (. _ -) are allowed before the @ symbol."
        // )
        .required("New email is required"),
    otherwise: () => Yup.string().notRequired(),
  }),

  consent: Yup.boolean().oneOf([true], "You must accept the declaration"),
});

const UpdateContact: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.app.data);

  const initialValues: UpdateContactFormValues = React.useMemo(
    () => ({
      type: "email",
      regMobile: userData?.current?.mobile?.value || "",
      newMobile: "",
      regEmail: userData?.current?.email?.value || "",
      newEmail: "",
      consent: false,
    }),
    [userData]
  );

  const onSubmit = async (
    values: UpdateContactFormValues,
    { setSubmitting }: FormikHelpers<UpdateContactFormValues>
  ) => {
    setSubmitting(true);
    try {
      const phone = values.newMobile?.trim() || undefined;
      const email = values.newEmail?.trim() || undefined;

      if (!phone && !email) {
        throw new Error("Please enter mobile or email.");
      }

      await apiService.sendContactUpdateOtp(phone, email);

      dispatch(
        setContactVerification({
          type: values.type,
          regMobile: phone,
          regEmail: email,
        })
      );

      showSingleToast("OTP sent successfully");
      navigate("/updateContact/verify");
    } catch (error: any) {
      extractErrorAndShowToast(error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<UpdateContactFormValues>({
    initialValues,
    validationSchema: schema,
    onSubmit,
    enableReinitialize: true,
  });

  const currentType = formik.values.type;

  const renderField = (field: any) => {
    if (field.dependsOn && !field.dependsOn.includes(currentType)) return null;

    return (
      <Box key={field.name} sx={{ width: "100%", mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {field.label}
        </Typography>

        {field.type === "text" ? (
          <TextField
            fullWidth
            name={field.name}
            value={formik.values[field.name as keyof UpdateContactFormValues]}
            onChange={(e) => {
              const name = e.target.name;
              let value = String(e.target.value).trim(); // always trim leading/trailing spaces
              value = value.replace(/\s+/g, "");
              value = value.replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+|[\u2011-\u26FF])/g,
                ""
              ); // remove emojis

              if (name.toLowerCase().includes("mobile")) {
                value = value.replace(/\D/g, ""); // only digits
                if (value.length <= 10) {
                  formik.setFieldValue(name, value);
                }
              } else {
                value = value.toLowerCase();
                formik.setFieldValue(name, value);
              }
            }}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched[field.name as keyof UpdateContactFormValues] &&
                formik.errors[field.name as keyof UpdateContactFormValues]
            )}
            helperText={
              formik.touched[field.name as keyof UpdateContactFormValues] &&
              formik.errors[field.name as keyof UpdateContactFormValues]
            }
            disabled={field?.disabled}
            type={field.name.toLowerCase().includes("mobile") ? "tel" : "text"}
            inputProps={
              field.name.toLowerCase().includes("mobile")
                ? { maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }
                : field.name.toLowerCase().includes("email")
                ? { maxLength: 100 }
                : {}
            }
          />
        ) : field.type === "select" ? (
          <Select
            fullWidth
            name={field.name}
            value={formik.values[field.name as keyof UpdateContactFormValues]}
            // onChange={formik.handleChange}
            onChange={(e) => {
              const selectedType = e.target.value;

              if (field.name === "type") {
                // Reset form with new type and default values
                formik.setValues({
                  ...initialValues,
                  type: String(selectedType),
                });
              } else {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            displayEmpty
            error={Boolean(
              formik.touched[field.name as keyof UpdateContactFormValues] &&
                formik.errors[field.name as keyof UpdateContactFormValues]
            )}
            disabled={field?.disabled}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            {field.options.map((opt: any) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        ) : null}
      </Box>
    );
  };

  return (
    <PublicLayout>
      <ContentBox
        component="form"
        onSubmit={formik.handleSubmit}
        isBoxShadow={false}
      >
        <Box sx={{ alignSelf: "start" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem" }}
          >
            Update Contact Details
          </Typography>
          <Typography variant="h5">
            Keep contact details current for timely updates.
          </Typography>
        </Box>

        <FormContentBox>{contactFieldConfig.map(renderField)}</FormContentBox>

        <ConsentForm
          checked={formik.values.consent}
          onChange={formik.handleChange}
          error={formik.errors.consent}
          touched={formik.touched.consent}
          text={`I/We hereby request Stoxkart to update contact details in Trading and
            Demat account I/we hold with Stoxkart. I/We confirm & declare that the
            contact details belongs to me and I/We authorise Stoxkart / Exchanges /
            Depositories to use this contact information to send me/us any information
            / alert / email.`}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
        >
          Send OTP and Proceed to E-Sign
        </Button>
      </ContentBox>
    </PublicLayout>
  );
};

export default UpdateContact;
