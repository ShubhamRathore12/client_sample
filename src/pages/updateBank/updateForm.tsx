import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { bankFieldConfig } from "../../constants/bankConstants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiService } from "../../services/api.service";
import {
  BankInfo,
  setBankInfo,
  setEsignData,
  setStausResponse,
} from "../../slices/app";
import ContentBox from "../../components/common/ContentBox";
import FormContentBox from "../../components/common/FormContentBox";
import { LoaderBackdrop } from "../../components/common/LoaderBackdrop";
import PublicLayout from "../../components/layouts/PublicLayout";
import { injectDropdownOptions } from "../../utils/injectdropdowns";
import extractErrorAndShowToast from "../../utils/extract-error";
import { RootState } from "../../store";
import { showSingleToast } from "../../utils/toast-util";

interface UpdateBankFormValues {
  ifsc: string;
  bank: string;
  micr?: string;
  holderName: string;
  accountNo: string;
  confirmAccountNo: string;
  accountType: string;
  bankType: string;
  consent: boolean;
}

const schema = Yup.object({
  ifsc: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
    .required("IFSC code is required"),

  bank: Yup.string().required("Bank name is required"),

  micr: Yup.string()
    .matches(/^\d{9}$/, "MICR must be a 9-digit number"),
    // .required("MICR is required"),

  accountNo: Yup.string()
    .matches(/^\d+$/, "Account number must be numeric")
    .required("Account number is required")
    .matches(/^[0-9]{9,18}$/, "Account number must be 9 to 18 digits"),
  // .matches(/^[0-9]+$/, "Account number should only contain numbers")
  // .min(5, "Account number should be atleast 5 characters")
  // .max(19, "Account number should be atmost 19 characters"),

  confirmAccountNo: Yup.string()
    .oneOf([Yup.ref("accountNo")], "Account numbers must match")
    .required("Please confirm your account number"),

  accountType: Yup.string().required("Account type is required"),

  bankType: Yup.string().required("Bank type is required"),
  holderName: Yup.string().required("Account Holder Name is required"),

  consent: Yup.boolean().oneOf([true], "You must accept the declaration"),
});

const UpdateForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dynamicConfig = injectDropdownOptions(bankFieldConfig);
  const [dynamicFields, setDynamicFields] = useState(dynamicConfig);
  const bankFormType = useSelector(
    (state: RootState) => state?.app?.bankFormType
  );

  const bankInfoByIFSC = useSelector(
    (state: RootState) => state.app.bankInfoByIfsc
  );
  const dispatch = useDispatch();
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const existingBankInfo = useSelector(
    (state: RootState) => state.app.statusBankInfo?.data?.change
  );
  const initialValues: UpdateBankFormValues =
    bankFormType === "EDIT" && existingBankInfo
      ? {
          ifsc: existingBankInfo?.bank?.ifsc || "",
          bank: existingBankInfo.bank?.name || "",
          micr: existingBankInfo.bank?.micr || "",
          holderName: existingBankInfo?.holderName || "",
          accountNo: existingBankInfo?.accountNumber || "",
          confirmAccountNo: existingBankInfo?.accountNumber || "",
          accountType: existingBankInfo?.isPrimary ? "yes" : "no",
          bankType: existingBankInfo?.type || "",
          consent: false,
        }
      : {
          ifsc: "",
          bank: "",
          micr: "",
          holderName: "",
          accountNo: "",
          confirmAccountNo: "",
          accountType: "",
          bankType: "",
          consent: false,
        };
  // const initialValues: UpdateBankFormValues = {
  //   ifsc: "",
  //   bank: "",
  //   micr: "",
  //   holderName: "",
  //   accountNo: "",
  //   confirmAccountNo: "",
  //   accountType: "",
  //   bankType: "",
  //   consent: false,
  // };

  const onSubmit = async (
    values: UpdateBankFormValues,
    { setSubmitting }: FormikHelpers<UpdateBankFormValues>
  ) => {
    try {
      setPaymentLoader(true);
      const response: any = await apiService.initiateManualBankVerification({
        isPrimary: values?.accountType === "yes" ? true : false,
        accountNumber: values.accountNo,
        bank: {
          code: bankInfoByIFSC?.code,
          name: values.bank,
          ifsc: values.ifsc,
          micr: values.micr,
          branch: bankInfoByIFSC?.branch,
          address: bankInfoByIFSC?.address,
        },
        type: values.bankType,
        holderName: values?.holderName.trim(),
        // vpa: ""
      });
      showSingleToast(response?.msg || "Bank verification started");
      // 2. Start polling for status
      startPolling(response?.data?.targetId);
    } catch (error: any) {
      extractErrorAndShowToast(error);
      setPaymentLoader(true); // show backdrop
      setSubmitting(false);
    } finally {
      setPaymentLoader(false); // show backdrop
      setSubmitting(false);
    }
  };

  const startPolling = (id: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setStatusLoader(true);

    pollingRef.current = setInterval(async () => {
      try {
        const response: any = await apiService.getBankPayVerificationStatus({
          id: id,
        });
        dispatch(setStausResponse(response));

        const status = response?.status;
        if (!status) return;

        if (status === "SUCCESS") {
          stopPolling();

          const payload = {
            toProceed: {
              target: "BANK_ACCOUNT",
              ids: [Number(response?.data?.id)], // replace with your actual account change request IDs
            },
          };

          const esignData = await apiService.proceedWithEsignBankAccount(
            payload
          );
          dispatch(setEsignData(esignData));
          navigate("/cdu/updateBank/esign");
          //  else {
          //   navigate("/cdu/updateBank/esign");
          // }
        } else if (status === "FAILED") {
          stopPolling();
          const bankProofRequired = response?.nextSteps?.BankProof?.required;
          if (bankProofRequired) {
            navigate("/cdu/updateBank/uploadProof");
          }
          // showSingleToast.error("Bank verification failed.");
          showSingleToast.error(response?.msg || "Bank verification failed.");
        }
        // If IN_PROGRESS, do nothing and keep polling
      } catch (err: any) {
        stopPolling();
        extractErrorAndShowToast(err);
      }
    }, 5000);
  };

  const stopPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setPaymentLoader(false);
    setStatusLoader(false);
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const formik = useFormik<UpdateBankFormValues>({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  const renderField = (field: any) => {
    const isEditMode = bankFormType === "EDIT";
    const isDisabled =
      isEditMode && field.name !== "accountType"
        ? true
        : field.disabled || false;
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
      // const { name, value } = e.target;
      const name = e.target.name;
      let value = String(e.target.value).trimStart();
      value = value.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+|[\u2011-\u26FF])/g,
        ""
      ); // remove emojis
      if (name === "ifsc") {
        value = String(value)
          .toUpperCase()
          .replace(/[^A-Z0-9]/gi, ""); // Remove all non-alphanumeric characters
        formik.setFieldValue(name, value);
      } else if (name === "holderName") {
        // Allow only letters and dot
        // value = value.replace(/[^a-zA-Z. ]/g, "");
        // formik.setFieldValue(name, value);
        // 1. Remove invalid characters (keep letters, dot, space)
        value = value.replace(/[^a-zA-Z. ]/g, "");
        // 2. Replace multiple spaces with a single space
        value = value.replace(/\s{2,}/g, " ");
        formik.setFieldValue(name, value);
      } else if (
        name === "accountNo" ||
        name === "confirmAccountNo" ||
        name === "micr"
      ) {
        value = value.replace(/[^0-9]/g, "");
        formik.setFieldValue(name, value);
      } else {
        formik.setFieldValue(name!, value);
      }
    };

    return (
      <Box key={field.name} sx={{ width: "100%", mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          {field.label}
        </Typography>

        {field.type === "text" ? (
          <TextField
            fullWidth
            name={field.name}
            value={(formik.values as any)[field.name]}
            // onChange={formik.handleChange}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched[field.name] &&
              Boolean((formik.errors as any)[field.name])
            }
            helperText={
              formik.touched[field.name] && (formik.errors as any)[field.name]
            }
            disabled={field?.disabled || false ||isDisabled}
            inputProps={{
              ...((field.name === "accountNo" ||
                field?.name === "confirmAccountNo") && {
                maxLength: 18,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }),
              ...(field.name === "ifsc" && {
                maxLength: 11,
              }),
              ...(field.name === "micr" && {
                maxLength: 9,
                inputMode: "numeric",
                pattern: "[0-9]*",
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
            disabled={field?.disabled || false || isDisabled}
            error={
              formik.touched[field.name] &&
              Boolean((formik.errors as any)[field.name])
            }
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

  React.useEffect(() => {
    if (bankFormType === "EDIT") return; // Don't override in edit mode
    const fetchBankDetails = async () => {
      const ifsc = formik.values.ifsc.trim().toUpperCase();
      if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc) && ifsc.length === 11) {
        try {
          const data: BankInfo = await apiService.getBankDetailsByIFSC(ifsc);
          dispatch(setBankInfo(data));
          formik.setFieldValue("bank", data.name || "");
          formik.setFieldValue("micr", data.micr || "");
          // Dynamically update disabled flag
          const updatedConfig = dynamicConfig.map((field) => {
            if (field.name === "bank") {
              return {
                ...field,
                disabled: !(data.name === null || data.name === ""),
              };
            }
            if (field.name === "micr") {
              return {
                ...field,
                disabled: !(data.micr === null || data.micr === ""),
              };
            }
            return field;
          });

          setDynamicFields(updatedConfig);
        } catch (error) {
          extractErrorAndShowToast(error);
          console.error("Failed to fetch bank details", error);
          formik.setFieldValue("bank", "");
          formik.setFieldValue("micr", "");
          // In case of failure, make both editable
          const updatedConfig = dynamicConfig.map((field) => {
            if (["bank", "micr"].includes(field.name)) {
              return {
                ...field,
                disabled: false,
              };
            }
            return field;
          });

          setDynamicFields(updatedConfig);
        }
      }
    };

    fetchBankDetails();
  }, [formik.values.ifsc]);

  return (
    <>
      <PublicLayout>
        <ContentBox
          component="form"
          onSubmit={formik.handleSubmit}
          isBoxShadow={false}
        >
          <Box sx={{ alignSelf: "start", mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, fontSize: "1.25rem" }}
            >
              Bank Details
            </Typography>
            {/* <Typography variant="h5">
          Ensure bank details are accurate for seamless transactions.
        </Typography> */}
          </Box>

          {/* <FormContentBox>{dynamicConfig.map(renderField)}</FormContentBox> */}
          <FormContentBox>{dynamicFields?.map(renderField)}</FormContentBox>

          <Box sx={{ width: "100%", mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="consent"
                  checked={formik.values.consent}
                  onChange={formik.handleChange}
                />
              }
              label={
                <Typography variant="subtitle2">
                  I/We hereby request Stoxkart to update my bank details. I/We
                  confirm & declare that the information provided above is
                  accurate, and I/we authorize Stoxkart to use it for processing
                  transactions.
                </Typography>
              }
            />
            {formik.touched.consent && formik.errors.consent && (
              <Typography variant="caption" color="error">
                {formik.errors.consent}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={formik.isSubmitting}
          >
            Verify Bank Details
          </Button>
        </ContentBox>
        {paymentLoader && (
          <LoaderBackdrop
            text="Verifying..."
            processing={paymentLoader}
            processingText="Please wait while we verify your bank account"
          />
        )}
        {statusLoader && (
          <LoaderBackdrop
            text="Checking Status..."
            processing={statusLoader}
            processingText="Please wait while we check status of your request"
          />
        )}
      </PublicLayout>
    </>
  );
};

export default UpdateForm;