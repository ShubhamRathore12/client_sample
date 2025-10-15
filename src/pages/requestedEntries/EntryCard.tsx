import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ViewIcon from "../../assests/assets/view.svg";
import {
  setDelayText,
  setRejectionText,
  setRequestType,
} from "../../slices/app";
import { useDispatch, useSelector } from "react-redux";
import { getStatusStyle } from "../../components/common/ViewEntryStatus";

interface EntryCardProps {
  text: string;
  id?: string;
  item?: any;
}

const EntryCard: React.FC<EntryCardProps> = ({ text, id, item }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusStyle = getStatusStyle(item?.status, theme);
  const changeEntries = useSelector(
    (state: any) => state.app?.data?.changesRequests
  );

  const handleClick = () => {
    if (item.fieldKey === "mobile") {
      dispatch(setDelayText(changeEntries?.mobileMeta?.delayText));
      dispatch(setRejectionText(changeEntries?.mobileMeta?.reviewText));
      dispatch(setRequestType("phone number changes."));
    } else if (item.fieldKey === "nominee") {
      dispatch(setDelayText(changeEntries?.nomineeMeta?.delayText));
      dispatch(setRejectionText(changeEntries?.nomineeMeta?.reviewText));
      dispatch(setRequestType("nominee changes."));
    } else if (item.fieldKey === "bankAccount") {
      dispatch(setDelayText(changeEntries?.bankMeta?.delayText));
      dispatch(setRejectionText(changeEntries?.bankMeta?.reviewText));
      dispatch(setRequestType("bank changes."));
    } else if (item.fieldKey === "email") {
      dispatch(setDelayText(changeEntries?.emailMeta?.delayText));
      dispatch(setRejectionText(changeEntries?.emailMeta?.reviewText));
      dispatch(setRequestType("email changes."));
    } else if (item.fieldKey === "segment") {
      dispatch(setDelayText(changeEntries?.segmentMeta?.delayText));
      dispatch(setRejectionText(changeEntries?.segmentMeta?.reviewText));
      dispatch(setRequestType("segment changes."));
    }
    navigate(`/requestedEntries/viewEntry/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", width: "65%" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 400, color: theme.palette.text.primary }}
        >
          {text}
        </Typography>
      </Box>
      
      <Box
        sx={{
          // mt: 1,
          px: 0.5,
          py: 0.5,
          borderRadius: "8px",
          fontWeight: 400,
          textTransform: "capitalize",
          fontSize: {xs: "10px", md:"12px"},
          ...statusStyle,
          display: "flex",
          alignItems: "center",
          width: "25%",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        {item?.status.replaceAll("_", " ").toUpperCase()}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", width: "10%" }}>
        <img
          src={ViewIcon}
          alt="Arrow icon"
          width={24}
          height={24}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </Box>
    </Box>
  );
};

export default EntryCard;
