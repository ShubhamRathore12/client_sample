import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { apiService } from "../../services/api.service";
import { setEsignData, setUploadResponse } from "../../slices/app";
import ContentBox from "../../components/common/ContentBox";
import PublicLayout from "../../components/layouts/PublicLayout";
import { useNavigate } from "react-router-dom";
import extractErrorAndShowToast from "../../utils/extract-error";
import { showSingleToast } from "../../utils/toast-util";
import uploadImage from "../../assests/assets/upload.svg";
import CloseIcon from "@mui/icons-material/Close";

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const maxFileSize = 5 * 1024 * 1024; // 5MB
const UploadProof = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const statusResponse = useSelector(
    (state: RootState) => state.app.statusBankInfo
  );
  const accountId = statusResponse?.data?.change?.id;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!allowedTypes.includes(selected.type)) {
      showSingleToast.error(
        "Invalid file format. Please upload JPG, JPEG, PNG or PDF."
      );
      return;
    }
    if (selected.size > maxFileSize) {
      showSingleToast.error("File size exceeds 5MB.");
      return;
    }
    setFile(selected);
    setFileName(selected.name);
  };
  const handleUpload = async () => {
    if (!file) {
      showSingleToast.error("Please select a file to upload.");
      return;
    }
    try {
      const result: any = await apiService.uploadBankProofFile(file, accountId);
      const payload = {
        toProceed: {
          target: "BANK_ACCOUNT",
          ids: [Number(result?.data?.id)], // replace with your actual account change request IDs
        },
      };
      const esignData = await apiService.proceedWithEsignBankAccount(payload);
      dispatch(setUploadResponse(result));
      dispatch(setEsignData(esignData));
      showSingleToast("File uploaded successfully!");
      navigate("/updateBank/esign");
    } catch (err: any) {
      extractErrorAndShowToast(err);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    if (fileRef.current) {
      fileRef.current.value = ""; // Clear input
    }
  };
  return (
    <PublicLayout>
      <ContentBox isBoxShadow={false} sx={{ width: { md: "570px" } }}>
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem" }}
          >
            Upload Bank Proof
          </Typography>
          <Typography variant="h6">
            Please upload cheque, bank statement, passbook, or bank letter
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "4px",
            border: "1px dashed",
            borderColor: "divider",
            width: { xs: "280px", md: "376px" },
            height: "170px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            position: "relative",
            px: 1,
            mt: 2,
          }}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept={allowedTypes.join(",")}
            onChange={handleFileChange}
            style={{
              display: "none",
            }}
          />
          <img src={uploadImage} alt="Upload Icon" width={54} height={54} />
          <Typography fontSize={14} color="text.disabled">
            Tap to Upload
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              maxWidth: "90%",
              overflow: "hidden",
            }}
          >
            <Typography
              fontSize={10}
              color="text.secondary"
              sx={{
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {fileName || "No file selected"}
            </Typography>
            {file && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering file picker
                  handleRemoveFile();
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography variant="subtitle2" mt={1}>
          Formats allowed: JPG, JPEG, PNG, PDF. Max size 5MB
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleUpload}>
          Proceed to E-sign
        </Button>
      </ContentBox>
    </PublicLayout>
  );
};

export default UploadProof;
