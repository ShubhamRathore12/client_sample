import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React from "react";
import { differenceInYears, isValid } from "date-fns";
import { nomineeFieldConfig } from "../../constants/nomineeConstants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parse, format } from "date-fns";
import { makeDate } from "../../utils/date";
import { RootState } from "../../store";
import ContentBox from "../../components/common/ContentBox";
import FormContentBox from "../../components/common/FormContentBox";
import { apiService } from "../../services/api.service";
import PublicLayout from "../../components/layouts/PublicLayout";
import { injectDropdownOptions } from "../../utils/injectdropdowns";
import toast from "react-hot-toast";
import extractErrorAndShowToast from "../../utils/extract-error";
import {
  clearSelectedNominee,
  setNomineeInCurrent,
  setNomineeState,
  setSelectedNominee,
} from "../../slices/app";
import { showSingleToast } from "../../utils/toast-util";

interface NomineeFormValues {
  nominee_name: string;
  share_percentage: number;
  email: string;
  relation: string;
  dob: string;
  guardian_name: string;
  guardian_pan_number: string;
  mobile: string;
  is_address_same: boolean;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  id_proof_type: string;
  id_proof_number: string;
}

const initialValues: NomineeFormValues = {
  nominee_name: "",
  share_percentage: null,
  email: "",
  relation: "",
  dob: "",
  guardian_name: "",
  guardian_pan_number: "",
  mobile: "",
  is_address_same: false,
  address_line_1: "",
  address_line_2: "",
  address_line_3: "",
  country: "India",
  state: "",
  city: "",
  pin_code: "",
  id_proof_type: "",
  id_proof_number: "",
};

const validationSchema = Yup.object({
  nominee_name: Yup.string()
    .required("Name is required")
    .test(
      "no-multiple-spaces",
      "No multiple consecutive spaces",
      (val) => !/\s{2,}/.test(val ?? "")
    ),
  share_percentage: Yup.number()
    .required("Share percentage is required")
    .min(1, "Must be > 0")
    .max(100, "Must be ≤ 100"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  relation: Yup.string().required("Relation is required"),
  dob: Yup.date()
    .required("Date of birth is required")
    .min(
      new Date(1900, 0, 1), // January 1, 1900 in local timezone
      "Date must be on or after 01-01-1900"
    )
    .max(new Date(), "Date cannot be in the future"),
  // dob: Yup.string().required("DOB is required"),
  //   .test("valid-date", "Invalid date", (val) => !isNaN(new Date(makeDate(val ?? "")).getTime())),
  guardian_name: Yup.string().when("dob", {
    is: (dob: string) => {
      if (!dob) return false;

      const dobDate = new Date(dob); // HTML date input gives 'yyyy-MM-dd' string

      if (isNaN(dobDate.getTime())) return false;

      const today = new Date();
      const age =
        today.getFullYear() -
        dobDate.getFullYear() -
        (today.getMonth() < dobDate.getMonth() ||
        (today.getMonth() === dobDate.getMonth() &&
          today.getDate() < dobDate.getDate())
          ? 1
          : 0);
      return age < 18;
    },
    then: (schema) => schema.required("Guardian name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  guardian_pan_number: Yup.string().when("dob", {
    is: (dob: string) => {
      if (!dob) return false;

      const dobDate = new Date(dob); // HTML date input gives 'yyyy-MM-dd' string

      if (isNaN(dobDate.getTime())) return false;

      const today = new Date();
      const age =
        today.getFullYear() -
        dobDate.getFullYear() -
        (today.getMonth() < dobDate.getMonth() ||
        (today.getMonth() === dobDate.getMonth() &&
          today.getDate() < dobDate.getDate())
          ? 1
          : 0);
      return age < 18;
    },
    then: (schema) =>
      schema
        .required("Guardian PAN is required")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/i, "Invalid PAN format")
        .min(10, "PAN must be 10 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  mobile: Yup.string().required("Mobile is required"),
  address_line_1: Yup.string().when("is_address_same", {
    is: false,
    then: (schema) => schema.required("Address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  city: Yup.string().when("is_address_same", {
    is: false,
    then: (schema) => schema.required("City is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  state: Yup.string().when("is_address_same", {
    is: false,
    then: (schema) => schema.required("State is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  pin_code: Yup.string().when("is_address_same", {
    is: false,
    then: (schema) =>
      schema
        .required("Pincode is required")
        .matches(/^[1-9][0-9]{5}$/, "Invalid pincode"),
    otherwise: (schema) => schema.notRequired(),
  }),
  id_proof_type: Yup.string().required("ID proof type required"),
  // id_proof_number: Yup.string()
  //   .required("ID proof number required")
  //   .min(4, "ID proof must have minimum length"), // further per-type checks could be added
  id_proof_number: Yup.string()
    .required("ID Proof number is required")
    .test(
      "id-proof-number",
      "Please enter a valid ID proof number",
      (val, ctx) => {
        const type = ctx?.parent?.id_proof_type;
        if (!val) return false;

        switch (type) {
          case "AADHAAR":
            return /^[0-9]{4}$/.test(val);
          case "PAN":
            return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase());
          case "PASSPORT":
            return /^[A-Z]{1}[0-9]{7}$/.test(val.toUpperCase());
          case "DRIVING_LICENSE":
            return /^[A-Z]{2}[0-9]{2}[-/]?[0-9]{4}[-/]?[0-9]{6,7}$/.test(
              val.toUpperCase()
            );
          case "other_id_proof":
            return val.length >= 4;
          default:
            return true;
        }
      }
    ),
});

const NomineeForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dynamicConfig = injectDropdownOptions(nomineeFieldConfig);
  const nomineeState = useSelector(
    (state: RootState) => state?.app?.nomineeState
  );
  const nomineeData = useSelector(
    (state: RootState) => state?.app?.selectedNominee
  );
  const dispatch = useDispatch();

  const getInitialValues = (): NomineeFormValues => {
    if (!nomineeData) return initialValues;

    let parsedDob: Date | undefined;
    let formattedDob = "";

    if (nomineeData.dob) {
      parsedDob = parse(nomineeData.dob, "dd-MM-yyyy", new Date()); // fix here

      if (isValid(parsedDob)) {
        formattedDob = format(parsedDob, "yyyy-MM-dd"); // for HTML input
      }
    }

    return {
      nominee_name: nomineeData.name || "",
      share_percentage: Number(nomineeData.sharePercentage) || 0,
      email: nomineeData?.email, // email might not exist in backend response
      relation: nomineeData.relation || "",
      dob: formattedDob,
      guardian_name: nomineeData.guardian?.name || "",
      guardian_pan_number: nomineeData.guardian?.idProof?.value || "",
      mobile: nomineeData.mobile || "",
      is_address_same: nomineeData?.isAdressSameAsUser || false, // assume default false for edit/view
      address_line_1: nomineeData.address?.line1 || "",
      address_line_2: nomineeData.address?.line2 || "",
      address_line_3: nomineeData.address?.line3 || "",
      country: nomineeData.address?.country || "India",
      state: nomineeData.address?.state || "",
      city: nomineeData.address?.city || "",
      pin_code: nomineeData.address?.pincode || "",
      id_proof_type: nomineeData.idProof?.type || "",
      id_proof_number: nomineeData.idProof?.value || "",
    };
  };

  const handleSubmit = async (
    values: NomineeFormValues,
    helpers: FormikHelpers<NomineeFormValues>
  ) => {
    const dob = values.dob;

    if (!dob) return false;

    const dobDate = new Date(dob); // HTML date input gives 'yyyy-MM-dd' string

    if (isNaN(dobDate.getTime())) return false;

    const today = new Date();
    const age =
      today.getFullYear() -
      dobDate.getFullYear() -
      (today.getMonth() < dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() &&
        today.getDate() < dobDate.getDate())
        ? 1
        : 0);

    try {
      const isEdit = nomineeState === "edit";
      const nomineeId: any = nomineeData?.updatedId || "";
      // let formattedDob = "";
      // try {
      //   const parsedDob = values?.dob
      //     ? parse(values.dob, "dd-MM-yyyy", new Date())
      //     : new Date();
      //   if (isValid(parsedDob)) {
      //     formattedDob = format(parsedDob, "yyyy-MM-dd");
      //   }
      // } catch (e) {
      //   console.warn("DOB parse failed:", e);
      // }

      const payload = {
        id: isEdit ? nomineeId : "",
        name: values.nominee_name.trim(),
        sharePercentage: String(values.share_percentage),
        relation: values.relation,
        mobile: values.mobile,
        email: values.email,
        dob: format(new Date(values.dob), "dd-MM-yyyy"),
        // dob: values?.dob,
        idProof: {
          type: values.id_proof_type,
          value: values.id_proof_number,
        },
        isAdressSameAsUser: values?.is_address_same,
        address: {
          line1: values.address_line_1,
          line2: values.address_line_2,
          line3: values.address_line_3,
          city: values.city.trim(),
          state: values.state,
          country: values.country,
          pincode: values.pin_code,
        },
        guardian:
          age < 18
            ? {
                name: values.guardian_name.trim(),
                idProof: {
                  type: "PAN", // assuming PAN for now
                  value: values.guardian_pan_number,
                },
              }
            : undefined,
      };

      await apiService.addNominee([payload]);
      // navigate("/updateNominee/esign");

      navigate(-1);
      dispatch(setNomineeState("add"));
      dispatch(clearSelectedNominee());
      showSingleToast("Submitted successfully");
    } catch (error) {
      extractErrorAndShowToast(error);
      helpers.setSubmitting(false);
    }
  };

  const formik = useFormik<NomineeFormValues>({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  //   const isMinor = (() => {
  //     if (!formik.values.dob) return false;

  //     const parsedDob = parse(formik.values.dob, "dd-MM-yyyy", new Date());
  //     if (!isValid(parsedDob)) return false;

  //     const age = differenceInYears(new Date(), parsedDob);
  //     return age < 18;
  //   })();

  const isMinor = (() => {
    const dob = formik.values.dob;

    if (!dob) return false;

    const dobDate = new Date(dob); // HTML date input gives 'yyyy-MM-dd' string

    if (isNaN(dobDate.getTime())) return false;

    const today = new Date();
    const age =
      today.getFullYear() -
      dobDate.getFullYear() -
      (today.getMonth() < dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() &&
        today.getDate() < dobDate.getDate())
        ? 1
        : 0);

    return age < 18;
  })();

  const renderField = (field: any) => {
    // Show only if there's no dependsOn or current type matches
    if (field.dependsOn && formik.values.is_address_same) return null;
    if (field.dependsOnMinor && !isMinor) return null;
    if (field.dependsOnMinor && isMinor)
      return (
        <Box key={field.name} sx={{ width: "100%", marginTop: 2 }}>
          <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
            {field.label}
          </Typography>

          {field.type === "text" ? (
            <TextField
              fullWidth
              name={field.name}
              value={(formik.values as any)[field.name]}
              onChange={(e) => {
                const name = e.target.name;
                let value = String(e.target.value).trimStart(); // always trim leading/trailing spaces
                value = value.replace(
                  /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+|[\u2011-\u26FF])/g,
                  ""
                ); // remove emojis
                if (name.toLowerCase().includes("guardian_pan_number")) {
                  value = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
                  formik.setFieldValue(name, value);
                } else {
                  formik.setFieldValue(name, value);
                }
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field.name as keyof typeof formik.touched] &&
                Boolean((formik.errors as any)[field.name])
              }
              inputProps={{
                ...(field.name === "guardian_name" && {
                  maxLength: 100,
                }),
              }}
              helperText={
                formik.touched[field.name as keyof typeof formik.touched] &&
                (formik.errors as any)[field.name]
              }
              disabled={field?.disabled || nomineeState === "view"}
            />
          ) : field.type === "select" ? (
            <Select
              fullWidth
              name={field.name}
              value={(formik.values as any)[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              displayEmpty
              error={
                formik.touched[field.name as keyof typeof formik.touched] &&
                Boolean((formik.errors as any)[field.name])
              }
              disabled={field?.disabled || nomineeState === "view"}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {field?.options?.map((opt: any) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          ) : field.type === "date" ? (
            <TextField
              fullWidth
              type="date"
              name={field.name}
              value={(formik.values as any)[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[field.name as keyof typeof formik.touched] &&
                Boolean((formik.errors as any)[field.name])
              }
              helperText={
                formik.touched[field.name as keyof typeof formik.touched] &&
                (formik.errors as any)[field.name]
              }
              InputLabelProps={{
                shrink: true,
              }}
              disabled={field?.disabled || nomineeState === "view"}
            />
          ) : null}
        </Box>
      );

    return (
      <Box key={field.name} sx={{ width: "100%", marginTop: 2 }}>
        {field.type === "checkbox" ? (
          <FormControlLabel
            control={
              <Checkbox
                name={field.name}
                checked={Boolean((formik.values as any)[field.name])}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                disabled={field?.disabled || nomineeState === "view"}
              />
            }
            label={field.label}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "1rem",
              },
            }}
          />
        ) : (
          <>
            <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
              {field.label}
            </Typography>

            {field.type === "text" ? (
              <TextField
                fullWidth
                name={field.name}
                value={(formik.values as any)[field.name]}
                onChange={(e) => {
                  const name = e.target.name;
                  let value = String(e.target.value).trimStart(); // always trim leading/trailing spaces
                  value = value.replace(
                    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+|[\u2011-\u26FF])/g,
                    ""
                  ); // remove emojis
                  if (name.toLowerCase().includes("id_proof_number")) {
                    if (formik.values.id_proof_type === "DRIVING_LICENSE") {
                      value = value.replace(/[^A-Z0-9/-]/g, "").toUpperCase();
                      formik.setFieldValue(name, value);
                    } else {
                      value = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
                      formik.setFieldValue(name, value);
                    }
                  } else if (
                    name === "share_percentage" ||
                    name === "mobile" ||
                    name === "pin_code"
                  ) {
                    value = value.replace(/[^0-9]/g, "");
                    formik.setFieldValue(name, value);
                  } else if (name === "city") {
                    // Remove non-alphanumeric characters and emojis
                    value = value.replace(
                      /[^a-zA-Z0-9 ]/g, // removes special characters (but allows space)
                      ""
                    );
                    formik.setFieldValue(name, value);
                  } else {
                    formik.setFieldValue(name, value);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[field.name as keyof typeof formik.touched] &&
                  Boolean((formik.errors as any)[field.name])
                }
                helperText={
                  formik.touched[field.name as keyof typeof formik.touched] &&
                  (formik.errors as any)[field.name]
                }
                disabled={field?.disabled || nomineeState === "view"}
                inputProps={{
                  ...(field.name === "share_percentage" && {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 3,
                  }),
                  ...(field.name === "mobile" && {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }),
                  ...((field.name === "address_line_2" ||
                    field.name === "address_line_1" ||
                    field.name === "address_line_3" ||
                    field.name === "city") && {
                    maxLength: 50,
                  }),
                  ...(field.name === "pin_code" && {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 6,
                  }),
                  ...(field.name === "country" && {
                    maxLength: 100,
                  }),
                  ...(field.name === "nominee_name" && {
                    maxLength: 100,
                  }),
                  ...(field.name === "id_proof_number" &&
                    formik.values.id_proof_type === "AADHAAR" && {
                      maxLength: 4,
                      minLength: 4,
                    }),
                  ...(field.name === "id_proof_number" &&
                    formik.values.id_proof_type === "PAN" && {
                      maxLength: 10,
                      minLength: 10,
                    }),
                  ...(field.name === "id_proof_number" &&
                    formik.values.id_proof_type === "DRIVING_LICENSE" && {
                      maxLength: 15,
                    }),
                  ...(field.name === "id_proof_number" &&
                    formik.values.id_proof_type === "PASSPORT" && {
                      maxLength: 8,
                    }),
                  // startAdornment:
                  //   formik.values.id_proof_type === "aadhar_card"
                  //     ? "********"
                  //     : "",
                }}
                InputProps={{
                  ...(field.name === "id_proof_number" &&
                    formik.values.id_proof_type === "AADHAAR" && {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "monospace",
                              letterSpacing: "2px",
                              color: "#666",
                              userSelect: "none",
                            }}
                          >
                            XXXX XXXX
                          </Typography>
                        </InputAdornment>
                      ),
                    }),
                }}
              />
            ) : field.type === "select" ? (
              <Select
                fullWidth
                name={field.name}
                value={(formik.values as any)[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                displayEmpty
                error={
                  formik.touched[field.name as keyof typeof formik.touched] &&
                  Boolean((formik.errors as any)[field.name])
                }
                disabled={field?.disabled || nomineeState === "view"}
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                {field?.options?.map((opt: any) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            ) : field.type === "date" ? (
              <TextField
                fullWidth
                type="date"
                name={field.name}
                value={(formik.values as any)[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[field.name as keyof typeof formik.touched] &&
                  Boolean((formik.errors as any)[field.name])
                }
                helperText={
                  formik.touched[field.name as keyof typeof formik.touched] &&
                  (formik.errors as any)[field.name]
                }
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={field?.disabled || nomineeState === "view"}
                inputProps={{
                  min: "1900-01-01", // Minimum date
                  max: new Date().toISOString().split("T")[0], // Today's date
                  pattern: "\\d{4}-\\d{2}-\\d{2}", // Enforce format
                }}
              />
            ) : null}
          </>
        )}
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
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Nominee Details
        </Typography>
        <FormContentBox>{dynamicConfig.map(renderField)}</FormContentBox>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={formik.isSubmitting || nomineeState === "view"}
        >
          Submit Nominee
        </Button>
      </ContentBox>
    </PublicLayout>
  );
};

export default NomineeForm;
