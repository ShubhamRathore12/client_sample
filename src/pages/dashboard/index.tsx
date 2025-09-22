import React, { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import StyledCenterBox from "../../components/common/CenterBox"; // adjust paths if needed
import DashboardCard from "../../components/common/DashboardCard"; // adjust paths if needed
import PublicLayout from "../../components/layouts/PublicLayout";
import rquestedEntries from "../../assests/assets/requestedEntries.svg";
import updateContact from "../../assests/assets/updateContact.svg";
import addBank from "../../assests/assets/addBank.svg";
import updateNominne from "../../assests/assets/updateNominne.svg";
import addSegment from "../../assests/assets/addSegment.svg";
import {
  clearDelayText,
  clearEsignData,
  clearRequestType,
  setCombinedUserData,
  setOptionsAll,
} from "../../slices/app";
import { useDispatch, useSelector } from "react-redux";
import { apiService } from "../../services/api.service";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { RootState } from "../../store";
import { showSingleToast } from "../../utils/toast-util";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  usePreventBackNavigation();
  const isAllSegmentsActive = useSelector(
    (state: RootState) => state?.app?.data?.current?.isAllSegmentsActive
  );

  useEffect(() => {
    dispatch(clearEsignData());
    dispatch(clearDelayText());
    dispatch(clearRequestType());
    const fetchDropdowns = async () => {
      try {
        const result = await apiService.getCombinedUserData();
        const response = await apiService.getOptionsAll();
        // const consent = await apiService.getFormTexts();
        dispatch(setOptionsAll(response));
        dispatch(setCombinedUserData(result));
        // dispatch(setFormTexts(consent));
      } catch (error) {}
    };
    fetchDropdowns();
  }, []);

  return (
    <PublicLayout>
      <Box
        sx={{
          paddingX: { xs: 2, md: 8 },
          paddingY: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          minHeight: { xs: "75vh", md: "500px" },
          margin: "auto",
        }}
      >
        <StyledCenterBox
          sx={{ flexDirection: "column", width: "100%", gap: 2 }}
        >
          <DashboardCard
            logo={rquestedEntries}
            text="Already Requested Entries"
            selected={false}
            func={() => navigate("/requestedEntries")}
            bgColor="linear-gradient(90deg, #265949 0%, #52BF9D 133.99%)"
            textColor={theme.palette.background.default}
          />
        </StyledCenterBox>

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, alignSelf: "start", fontSize: "1.25rem" }}
        >
          Select an option to update details
        </Typography>

        <StyledCenterBox
          sx={{ flexDirection: "column", width: "100%", gap: 2 }}
        >
          <DashboardCard
            logo={updateContact}
            text="Update Contact Details"
            selected={false}
            func={() => navigate("/updateContact")}
          />
          <DashboardCard
            logo={addBank}
            text="Add Bank Details"
            selected={false}
            func={() => navigate("/updateBank")}
          />
          <DashboardCard
            logo={updateNominne}
            text="Update Nominee Details"
            selected={false}
            func={() => navigate("/updateNominee")}
          />
          <DashboardCard
            logo={addSegment}
            text="Segment Addition"
            selected={false}
            func={() => isAllSegmentsActive ? showSingleToast.error("All Segments are already activated") :navigate("/addSegment")}
          />
        </StyledCenterBox>
      </Box>
    </PublicLayout>
  );
};

export default Dashboard;
