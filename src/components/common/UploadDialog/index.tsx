import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Compress from "compress.js";
import React from "react";

import toast from "react-hot-toast";
import { Toast } from "../../../types/app";
import { b64toBlob } from "../../../utils/convert-base64-to-blob";
import convertBase64ToFile from "../../../utils/convert-base64-to-file";
import convertFileToBase64 from "../../../utils/convert-file-to-base64";
import { convertFileToJPEG } from "../../../utils/convert-file-to-jpeg";
import handleError from "../../../utils/error-handler";
import { renameExtension } from "../../../utils/rename-extension";
import { EditDialog } from "../EditDialog";
import UploadIco from "../../../assests/assets/upload.svg";
import { showSingleToast } from "../../../utils/toast-util";
import extractErrorAndShowToast from "../../../utils/extract-error";

interface UploadDialogProps {
  open: boolean;
  fileTitle?: string;
  subtitle?: string;
  loading?: boolean;
  preview?: File;
  progress?: number;
  validFileTypes?: string[];
  maxFileSize?: number;
  fileSizeError?: string;
  onClose: () => void;
  onSuccess: (base64: string, file: File) => void;
  maxFileSizeText?: string;
}

const compressOptions = {
  size: 5, // the max size in MB, defaults to 2MB
  quality: 1, // the quality of the image, max is 1,
  maxWidth: 1920, // the max width of the output image, defaults to 1920px
  maxHeight: 1920, // the max height of the output image, defaults to 1920px
  resize: true, // defaults to true, set false if you do not want to resize the image width and height
  orientation: 0,
};

const UploadDialog: React.FC<UploadDialogProps> = (props) => {
  const {
    open,
    fileTitle,
    preview,
    subtitle,
    validFileTypes = [
      "application/pdf",
      "image/jpg",
      "image/jpeg",
      "image/png",
    ],
    loading,
    progress,
    onClose,
    onSuccess,
    maxFileSize = 5 * 1024 * 1024,
    fileSizeError = "File size too large",
    maxFileSizeText = "5 MB",
  } = props;
  const [file, setFile] = React.useState<File>(null);
  const [base64, setBase64] = React.useState<string>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [cropOpen, setOpen] = React.useState<boolean>(false);
  const [blobUrl, setBlobUrl] = React.useState<string>();

  const handleUploadImage: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const _file = e.target.files[0];

    if (_file === undefined) {
      return;
    }

    let file = _file;

    if (
      file.size > maxFileSize &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg")
    ) {
      const compress = new Compress();
      const data = await compress.compress([_file], compressOptions);
      const img = data[0];
      const fileSrc = `${img.prefix}${img.data}`;
      file = await convertBase64ToFile(fileSrc, renameExtension(_file.name));
    }

    if (validFileTypes.indexOf(file?.type) === -1) {
      showSingleToast.error("Invalid file type", { id: Toast.INVALID_FILE_TYPE });
    } else if (file.size > maxFileSize) {
      showSingleToast.error(fileSizeError, { id: Toast.FILE_SIZE_TOO_LARGE });
    } else {
      if (file.type === "application/pdf") {
        const text = await file.text();
        /** 
         * Look for any javascript code in the text
         * <<
          /Type /Action
          /S /JavaScript
          /JS (app.alert\('document.location=https://evil.com'\); Object.getPrototypeOf(function*(){}).constructor = null; ((function*(){}).constructor("document.write('<script>confirm(document.cookie);</script><iframe src=https://14.rs>');"))().next();)
          >>
         */

        if (text.includes("/S /JavaScript") && text.includes("/JS")) {
          showSingleToast.error("Invalid file type", { id: Toast.INVALID_FILE_TYPE });
          return;
        }
      }
      setBase64(URL.createObjectURL(file));
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        setOpen(true);
      }
      if (file.type === "image/png") {
        try {
          const converted = await convertFileToJPEG(file);
          setFile(converted);
        } catch (error) {
           extractErrorAndShowToast(error);
        }
      } else {
        setFile(file);
      }
    }
  };

  React.useEffect(() => {
    if (preview) {
      setFile(preview);
      convertFileToBase64(preview).then((result) =>
        setBase64(result as string)
      );
    }
  }, [preview]);

  React.useEffect(() => {
    setFile(null);
    setBase64(null);
  }, [open]);

  React.useEffect(() => {
    if (!base64 || !preview) return;
    const blob = b64toBlob(base64, "application/pdf");
    const blobUrl = URL.createObjectURL(blob);
    setBlobUrl(blobUrl);
  }, [base64, preview]);

  return (
    <>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& path": { fill: `${theme.palette.secondary.main} !important` },
        }}
      >
        <Typography
          data-testid={`title__dialog`}
          width="100%"
          fontWeight={500}
          fontSize={28}
          textAlign={"center"}
          color="primary.900"
        >
          Upload Document
        </Typography>
        <IconButton
          edge="end"
          sx={{ background: "transparent !important" }}
          onClick={onClose}
          aria-label="close"
        >
          <Close fontSize="large" />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          gap: 2,
        }}
      >
        <Typography
          data-testid={`label__dialog`}
          color={"text.disabled"}
          fontSize={16}
          textAlign={"center"}
        >
          {subtitle}
        </Typography>
        <Box display={"flex"} justifyContent={"center"}>
          {base64 ? (
            preview?.type === "application/pdf" ||
            file?.type === "application/pdf" ? (
              <Box>
                <object
                  width="376px"
                  height="250px"
                  data={preview ? blobUrl : base64}
                >
                  {" "}
                </object>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "376px",
                  height: "300px",
                  overflow: "auto",
                }}
              >
                <img width="100%" src={base64} />
              </Box>
            )
          ) : (
            <Box
              sx={{
                borderRadius: "4px",
                border: "1px solid",
                borderColor: "divider",
                width: "376px",
                height: "300px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                position: "relative",
                px: 1,
              }}
            >
              <Box
                sx={{
                  "& input": {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    opacity: 0,
                  },
                }}
              >
                <input
                  ref={fileRef}
                  onChange={handleUploadImage}
                  type={"file"}
                  accept={validFileTypes.join(", ")}
                  data-testid={`input__file`}
                />
              </Box>
              <img src={UploadIco} alt="Upload Logo" width={54} height={54} />
              <Box>
                <Typography fontSize={14} color="text.disabled">
                  Tap to Upload
                </Typography>
                {/* <Typography fontSize={14} color="text.disabled">
                    (Maximum Size: {maxFileSizeText})
                  </Typography> */}
              </Box>
              <Typography fontSize={15} color="text.disabled">
                {fileTitle}
              </Typography>
            </Box>
          )}
        </Box>
        {!preview && (
          <Box display="flex" justifyContent="flex-end">
            <Typography
              fontSize={14}
              sx={{ cursor: "pointer" }}
              onClick={() => setBase64(null)}
              color="link.main"
            >
              {base64 ? "Upload again" : " "}
            </Typography>
          </Box>
        )}
        {base64 ? (
          <Button
            fullWidth
            disabled={loading}
            onClick={() => onSuccess(base64, preview ?? file)}
            variant="contained"
            data-testid={`btn__confirm-PAN-image`}
          >
            {loading ? (
              <>
                <CircularProgress
                  variant={progress === 100 ? "indeterminate" : "determinate"}
                  value={progress}
                />{" "}
                Uploading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        ) : (
          <Button
            fullWidth
            onClick={() => {
              fileRef.current.click();
            }}
            variant="contained"
            data-testid={`btn__confirm-PAN-image`}
          >
            Browse
          </Button>
        )}
      </Box>

      <EditDialog
        open={cropOpen}
        onClose={() => setOpen(false)}
        maxFileSize={maxFileSize}
        base64={base64}
        filename={renameExtension(file?.name)}
        onChange={async (file, base64) => {
          try {
            const converted = await convertFileToJPEG(file);
            setFile(converted);
            setBase64(base64);
          } catch (error) {
            handleError(error);
          }
        }}
      />
    </>
  );
};

export default UploadDialog;
