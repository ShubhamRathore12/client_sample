import { Box, Radio, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  setCombinedUserData,
  setNomineeState,
  setSelectedNominee,
} from "../../slices/app";
import EditIcon from "../../assests/assets/Edit.svg";
import ViewBorderIcon from "../../assests/assets/ViewBorder.svg";
import DeleteIcon from "../../assests/assets/Delete.svg";
import { useDispatch } from "react-redux";
import { apiService } from "../../services/api.service";
import extractErrorAndShowToast from "../../utils/extract-error";
import { showSingleToast } from "../../utils/toast-util";

interface NomineeCardProps {
  name?: string;
  share?: string;
  selected?: boolean;
  primary?: boolean;
  item?: any;
  key?: string | number;
}

const NomineeCard = ({
  name,
  share,
  selected = false,
  primary = false,
  item,
  key,
}: NomineeCardProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    dispatch(setSelectedNominee(item));
    dispatch(setNomineeState("edit"));
    navigate("/updateNominee/NomineeForm");
  };
  const handleView = () => {
    dispatch(setNomineeState("view"));
    dispatch(setSelectedNominee(item));
    navigate("/updateNominee/NomineeForm");
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await apiService.deleteNominee(item?.id);
      showSingleToast(response?.data);
      const result = await apiService.getCombinedUserData();
      dispatch(setCombinedUserData(result));
    } catch (error) {
      extractErrorAndShowToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid ${theme.palette.background.boxBorder}`,
        borderRadius: 2,
        padding: 2,
        width: "100%",
      }}
      key={key}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: theme.palette.text.primary }}
        >
          {name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Share: {share} %
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
      >
        <img
          src={EditIcon}
          alt="Edit Logo"
          width={24}
          height={24}
          onClick={handleEdit}
          style={{ cursor: "pointer" }}
        />
        <img
          src={ViewBorderIcon}
          alt="View Logo"
          width={24}
          height={24}
          onClick={handleView}
          style={{ cursor: "pointer" }}
        />
        <img
          src={DeleteIcon}
          alt="Delete Logo"
          width={24}
          height={24}
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default NomineeCard;
