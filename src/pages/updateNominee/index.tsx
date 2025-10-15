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
import React, { useState } from "react";
import NomineeCard from "./NomineeCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import {
  clearSelectedNominee,
  setDelayText,
  setEsignData,
  setNomineeState,
  setRequestType,
} from "../../slices/app";
import useFetchCombinedData from "../../hooks/useFetchCombinedData";
import { apiService } from "../../services/api.service";
import extractErrorAndShowToast from "../../utils/extract-error";
import useCombinedNominees from "../../hooks/useCombinedNominee";
import ViewEntryStatus from "../../components/common/ViewEntryStatus";
import { showSingleToast } from "../../utils/toast-util";
import {
  NOMINEE_YES_CONSENT,
} from "../../constants/nomineeConstants";

const UpdateNominee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useFetchCombinedData();
  const [loading, setLoading] = useState(false);
  const nominees = useCombinedNominees();
  const [nominationName, setNominationName] = useState("yes");

  const changeRequests = useSelector(
    (state: RootState) => state?.app?.data?.changesRequests?.nominee || []
  );

  const changeRequestsStatus = useSelector(
    (state: RootState) => state?.app?.data?.changesRequests?.nomineeMeta
  );

  const allVerified = changeRequests?.every(
    (item) => item.status === "VERIFIED"
  );

  const totalSharePercentage = nominees?.reduce(
    (a, b) => a + Number(b?.sharePercentage),
    0
  );

  const handleNominee = () => {
    dispatch(setNomineeState("add"));
    dispatch(clearSelectedNominee());
    if (totalSharePercentage >= 100) {
      showSingleToast.error(
        "The sum of the share percentages of all nominees is 100%. Please update percentage share of nominee first"
      );
    } else {
      navigate("/updateNominee/NomineeForm");
    }
  };

  const proceedWithEsign = async () => {
    setLoading(true);
    try {
      const response = await apiService.proceedNominee(
        nominationName === "name" ? "?showOnStatementChoice=name" : undefined
      );
      dispatch(setEsignData(response?.esign));
      navigate("/updateNominee/esign");
    } catch (error) {
      extractErrorAndShowToast(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNominationRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setNominationName(newValue);
  };

  if (
    // !allVerified
    !changeRequestsStatus?.isPendingOnUser
  ) {
    dispatch(setDelayText(changeRequestsStatus?.delayText));
    dispatch(setRequestType("nominee changes."));
    return (
      <PublicLayout>
        <ViewEntryStatus
          statusText={changeRequestsStatus?.status}
          // requestType="nominee changes."
          // delayText={changeRequestsStatus?.delayText}
        />
      </PublicLayout>
    );
  }

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

        {nominees && !!nominees.length ? (
          nominees?.map((n, idx) => (
            <NomineeCard
              name={n?.name}
              key={idx}
              share={n?.sharePercentage}
              item={n}
            />
          ))
        ) : (
          <Typography variant="subtitle2">No Nominee</Typography>
        )}

        <Box sx={{ width: "100%", textAlign: "center", marginTop: 4 }}>
          <Typography variant="subtitle2">
            You can add up to max <strong>3 nominees</strong>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleNominee}
            disabled={nominees?.length === 3}
            sx={{ marginTop: 2 }}
          >
            Add New Nominee +
          </Button>
        </Box>

        {nominees?.length && totalSharePercentage !== 100 ? (
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            Please make sure that the sum of the share percentages of all
            nominees is 100%.
          </Typography>
        ) : null}

        {changeRequests?.length &&
        allVerified &&
        totalSharePercentage === 100 ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <FormLabel id="radio-group-label" sx={{ textAlign: "left" }}>
                {NOMINEE_YES_CONSENT}
              </FormLabel>
              <RadioGroup
                aria-labelledby="radio-group-label"
                name="nominee-radio-group"
                value={nominationName}
                onChange={handleNominationRadioChange}
              >
                <FormControlLabel
                  value="name"
                  control={<Radio />}
                  label="Name of Nominee's"
                />
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Nomination: Yes"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={proceedWithEsign}
              disabled={totalSharePercentage !== 100 || loading}
              sx={{
                marginTop: 2,
              }}
            >
              {loading ? "Proceeding" : " Proceed"}
            </Button>
          </Box>
        ) : null}
      </ContentBox>
    </PublicLayout>
  );
};

export default UpdateNominee;
