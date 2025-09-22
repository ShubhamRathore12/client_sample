import React from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PublicLayout from "../../components/layouts/PublicLayout";
import extractErrorAndShowToast from "../../utils/extract-error";
import { InfoOutlined } from "@mui/icons-material";
import ContentBox from "../../components/common/ContentBox";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { showSingleToast } from "../../utils/toast-util";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { setEsignData } from "../../slices/app";
import CloseIcon from "@mui/icons-material/Close";

type Props = {};
const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const maxFileSize = 5 * 1024 * 1024; // 5MB
function SegmentUploadDialog({}: Props) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const segmentProofType = useSelector(
    (state: RootState) => state.app.segmentProofType
  );
  const segmentResponse = useSelector(
    (state: RootState) => state.app.segmentResponse
  );
  const id = segmentResponse?.data?.targetId;

  const handleButtonClick = () => {
    fileRef.current.click(); // Trigger hidden input
  };

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
      const result: any = await apiService.uploadSegmentFile(file, id, segmentProofType?.id);
      dispatch(setEsignData(result?.data?.esign));
      showSingleToast("File uploaded successfully!");
      navigate("/cdu/addSegment/esign");
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
      <ContentBox sx={{ marginTop: 4, gap: 8 }} isBoxShadow={false}>
        <Stack gap={1}>
          <Typography variant="body1">Upload income proof</Typography>
          <Typography variant="h6">
            As per SEBI &amp; Exchange regulations you are required to share
            your income proof to enable trading in Futures &amp; Options
          </Typography>
        </Stack>
        <>
          <Stack gap={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.text.yellowBackground,
                padding: 2,
                borderRadius: 4,
                display: "flex",
                gap: 1,
              }}
            >
              <InfoOutlined sx={{ color: theme.palette.text.yellow }} />
              <Typography variant="subtitle2">
                Please note that you can either upload an image or a PDF file
                (Formats allowed: JPG, JPEG, PNG, PDF. Max size 5MB)
              </Typography>
            </Box>

            <Typography variant="h6">
              {segmentProofType?.value}
            </Typography>
            <>
              <input
                type="file"
                ref={fileRef}
                accept={allowedTypes.join(",")}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                onClick={handleButtonClick}
                sx={{ height: "56px", fontSize: "1rem" }}
              >
                Upload Document
              </Button>
            </>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                maxWidth: "100%",
                overflow: "hidden",
                justifyContent: "center",
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
            <Button
              variant="contained"
              onClick={handleUpload}
              sx={{ height: "56px", fontSize: "1rem" }}
            >
              CONFIRM
            </Button>
          </Stack>
        </>
      </ContentBox>
    </PublicLayout>
  );
}

export default SegmentUploadDialog;
