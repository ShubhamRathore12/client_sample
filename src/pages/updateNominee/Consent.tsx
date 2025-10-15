import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ContentBox from "../../components/common/ContentBox";
import PublicLayout from "../../components/layouts/PublicLayout";
import useFetchCombinedData from "../../hooks/useFetchCombinedData";
import { apiService } from "../../services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { setEsignData } from "../../slices/app";
import extractErrorAndShowToast from "../../utils/extract-error";
import ConsentForm from "../../components/common/ConsentForm";
import { NOMINEE_NO_CONSENT } from "../../constants/nomineeConstants";
import { RootState } from "../../store";

const Consent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useFetchCombinedData();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.app.user);

  const [formState, setFormState] = useState({
    wantsToAddNominee: "no",
    consentChecked: false,
  });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFormState((prev) => ({
      ...prev,
      wantsToAddNominee: newValue,
      consentChecked: newValue === "no" ? prev.consentChecked : false,
    }));
  };

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      consentChecked: event.target.checked,
    }));
  };

  const proceedWithEsign = async () => {
    setLoading(true);
    try {
      const response = await apiService.proceedNominee(`?isSoleNomination=true`);
      dispatch(setEsignData(response?.esign));
      navigate("/updateNominee/esign");
    } catch (error) {
      extractErrorAndShowToast(error);
    } finally {
      setLoading(false);
    }
  };

  const proceed = () => {
    const { wantsToAddNominee, consentChecked } = formState;

    if (wantsToAddNominee === "no") {
      if (!consentChecked) {
        extractErrorAndShowToast(
          "Please provide your consent to proceed without a nominee."
        );
        return;
      }
      proceedWithEsign();
    } else {
      navigate("/updateNominee/add");
    }
  };

  return (
    <PublicLayout>
      <ContentBox isBoxShadow={false}>
        <Box sx={{ alignSelf: "start" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem" }}
          >
            Nominee Details
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <FormLabel id="radio-group-label">
            Would you like to add a nominee?
          </FormLabel>
          <RadioGroup
            aria-labelledby="radio-group-label"
            name="nominee-radio-group"
            value={formState.wantsToAddNominee}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {formState.wantsToAddNominee === "no" && (
          <ConsentForm
            checked={formState.consentChecked}
            onChange={handleConsentChange}
            text={NOMINEE_NO_CONSENT.replace("${username}", user?.name)}
          />
        )}

        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={proceed}
            disabled={loading}
          >
            {formState.wantsToAddNominee === "no"
              ? "Proceed to Esign"
              : "Continue"}
          </Button>
        </Box>
      </ContentBox>
    </PublicLayout>
  );
};

export default Consent;
