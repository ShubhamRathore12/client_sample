import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import BankCard from "./BankCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import ContentBox from "../../components/common/ContentBox";
import ConsentForm from "../../components/common/ConsentForm";
import PublicLayout from "../../components/layouts/PublicLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { apiService } from "../../services/api.service";
import extractErrorAndShowToast from "../../utils/extract-error";
import { showSingleToast } from "../../utils/toast-util";
import {
  setBankFormType,
  setCombinedUserData,
  setDelayText,
  setEsignData,
  setRequestType,
} from "../../slices/app";
import ViewEntryStatus from "../../components/common/ViewEntryStatus";

interface FormValues {
  consent: boolean;
  // selectedBank: string;
}

const UpdateBank = () => {
  const theme = useTheme();
  const userData = useSelector((state: RootState) => state.app.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentLoader, setPaymentLoader] = useState(false);

  const [selectedPrimary, setSelectedPrimary] = React.useState<string | null>(
    userData?.current?.bankAccounts?.find((acc) => acc.isPrimary)
      ?.accountNumber || null
  );

  const changeRequestsStatus = useSelector(
    (state: RootState) => state?.app?.data?.changesRequests?.bankMeta
  );

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const result = await apiService.getCombinedUserData();
        dispatch(setCombinedUserData(result));
        // dispatch(setFormTexts(consent));
      } catch (error) {}
    };
    dispatch(setBankFormType("ADD"));
    fetchDropdowns();
  }, []);

  const onSubmit = async () => {
    try {
      setPaymentLoader(true);
      const data = userData?.current?.bankAccounts?.find(
        (acc) => acc?.accountNumber === selectedPrimary
      );
      const response: any = await apiService.initiateManualBankVerification({
        isPrimary: true,
        accountNumber: selectedPrimary,
        bank: {
          code: data?.bank?.code,
          name: data?.bank?.name,
          ifsc: data?.bank?.ifsc,
          micr: data?.bank?.micr,
          branch: data?.bank?.branchName,
        },
        type: data?.type,
        holderName: data?.holderName,
        // vpa: ""
      });
      showSingleToast(response?.msg || "Bank verification started");
      const payload = {
        toProceed: {
          target: "BANK_ACCOUNT",
          ids: [Number(response?.data?.id)], // replace with your actual account change request IDs
        },
      };

      const esignData = await apiService.proceedWithEsignBankAccount(payload);
      dispatch(setEsignData(esignData));
      navigate("/updateBank/esign");
    } catch (error: any) {
      extractErrorAndShowToast(error);
      setPaymentLoader(true); // show backdrop
    } finally {
      setPaymentLoader(false); // show backdrop
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      consent: false,
    },
    validationSchema: Yup.object({
      // consent: Yup.boolean().oneOf([true], "Consent is required"),
    }),
    onSubmit: onSubmit,
  });

  // const handleSubmit = () => navigate("/updateBank/addBankAccount");
  const handleSubmit = () => navigate("/cdu/updateBank/addBankAccount");

  if (
    // changeRequestsStatus?.status &&
    // changeRequestsStatus?.status !== "" &&
    // changeRequestsStatus?.status !== "VERIFIED"
    !changeRequestsStatus?.isPendingOnUser
  ) {
    dispatch(setDelayText(changeRequestsStatus?.delayText));
    dispatch(setRequestType("bank changes."));
    return (
      <PublicLayout>
        <ViewEntryStatus
          statusText={changeRequestsStatus?.status}
          // requestType="bank changes."
          // delayText={changeRequestsStatus?.delayText}
        />
      </PublicLayout>
    );
  }
  return (
    <PublicLayout>
      <ContentBox
        isBoxShadow={false}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ alignSelf: "start" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem" }}
          >
            Update Bank Details
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            border: {
              xs: 0,
              md: `1px solid ${theme.palette.background.boxBorder}`,
            },
            borderRadius: 2,
            paddingY: { xs: 0, md: 4 },
            paddingX: { xs: 0, md: 2 },
          }}
        >
          {userData?.current?.bankAccounts?.map((item, index) => (
            <>
              <BankCard
                logo={item?.bank?.code}
                text={item.accountNumber}
                selected={selectedPrimary === item.accountNumber}
                primary={item?.isPrimary}
                onSelectPrimary={() => setSelectedPrimary(item.accountNumber)}
                name={item?.bank?.name}
              />
              {index < userData?.current?.bankAccounts?.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </>
          ))}

          {userData?.current?.bankAccounts?.length ? (
            userData?.current?.bankAccounts?.length > 1 && (
              <Button
                type="submit"
                sx={{ marginTop: 4 }}
                fullWidth
                variant="outlined"
                // disabled={userData?.current?.bankAccounts?.length <= 1}
                // onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            )
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              No Data Found
            </Typography>
          )}
        </Box>

        <ConsentForm
          checked={formik.values.consent}
          onChange={formik.handleChange}
          touched={formik.touched.consent}
          error={formik.errors.consent}
          text={`I/We hereby request Stoxkart to add bank in Trading and
            Demat account I/we hold with Stoxkart. I/We confirm & declare that the
            bank belongs to me and I/We authorise Stoxkart / Exchanges /
            Depositories to use this bank to send me/us any information
            / alert / email.`}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={!formik.values.consent}
        >
          Add Bank Account
        </Button>
      </ContentBox>
    </PublicLayout>
  );
};

export default UpdateBank;
