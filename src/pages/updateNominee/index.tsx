import { Box, Button, Typography } from "@mui/material";
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

const UpdateNominee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useFetchCombinedData();
  const [loading, setLoading] = useState(false);
  const nominees = useCombinedNominees();

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
      const response = await apiService.proceedNominee();
      dispatch(setEsignData(response?.esign));
      navigate("/updateNominee/esign");
    } catch (error) {
      extractErrorAndShowToast(error);
    } finally {
      setLoading(false);
    }
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

        {changeRequests?.length && allVerified ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={proceedWithEsign}
              disabled={totalSharePercentage !== 100 || loading}
              sx={{
                marginTop: 2,
                display: totalSharePercentage !== 100 && "none",
              }}
            >
              {loading ? "Proceeding to Esign" : " Proceed to Esign"}
            </Button>
          </Box>
        ) : null}
      </ContentBox>
    </PublicLayout>
  );
};

export default UpdateNominee;
