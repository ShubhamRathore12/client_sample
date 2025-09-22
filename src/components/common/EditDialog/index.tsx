import { Close, RotateLeft, RotateRight } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import Compress from "compress.js";
import "cropperjs/dist/cropper.css";
import * as React from "react";
import type { ReactCropperElement } from "react-cropper";
import Cropper from "react-cropper";
import convertBase64ToFile from "../../../utils/convert-base64-to-file";
import handleError from "../../../utils/error-handler";
import { renameExtension } from "../../../utils/rename-extension";

interface Props {
  filename: string;
  base64: string | null;
  open: boolean;
  maxFileSize: number;
  onChange: (file: File | null, base64: string | null) => void;
  onClose: () => void;
}

const compressOptions = {
  size: 5, // the max size in MB, defaults to 2MB
  quality: 1, // the quality of the image, max is 1,
  maxWidth: 1920, // the max width of the output image, defaults to 1920px
  maxHeight: 1920, // the max height of the output image, defaults to 1920px
  resize: true, // defaults to true, set false if you do not want to resize the image width and height
  orientation: 0,
};

export const EditDialog = ({
  open,
  maxFileSize,
  filename,
  base64,
  onClose,
  onChange,
}: Props) => {
  const cropperRef = React.useRef<ReactCropperElement>(null);
  const [isCompressing, setIsCompressing] = React.useState(false);

  const compressFile = async () => {
    setIsCompressing(true);
    try {
      const canvas = cropperRef?.current?.cropper?.getCroppedCanvas?.({
        fillColor: "white",
      });
      const blob = await new Promise<Blob>((resolve) => {
        canvas?.toBlob((resolvedBlob) => resolve(resolvedBlob as Blob));
      });
      const compress = new Compress();
      const file = new File([blob], filename, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
      const data = await compress.compress([file], {
        ...compressOptions,
        size: maxFileSize / (1024 * 1024),
      });
      const img = data[0];
      const fileSrc = `${img.prefix}${img.data}`;
      const convertedFile = await convertBase64ToFile(
        fileSrc,
        renameExtension(filename)
      );
      onChange(convertedFile, fileSrc);
      onClose();
    } catch (error) {
      handleError(error);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { p: 3, m: 2, width: "min(96%, 400px)" } }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& path": {
            fill: (theme) => `${theme.palette.secondary.main} !important`,
          },
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Edit Image
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
      <Box sx={{ height: 300, width: "auto", m: "0 auto" }}>
        <Cropper
          ref={cropperRef}
          src={base64 || ""}
          viewMode={2}
          style={{ height: 300 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          my: 2,
        }}
      >
        <Button
          fullWidth
          variant="text"
          startIcon={<RotateLeft />}
          onClick={() => cropperRef.current?.cropper?.rotate?.(-90)}
        >
          Rotate Left
        </Button>
        <Button
          fullWidth
          variant="text"
          startIcon={<RotateRight />}
          onClick={() => cropperRef.current?.cropper?.rotate?.(90)}
        >
          Rotate Right
        </Button>
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={compressFile}
        disabled={isCompressing}
      >
        {isCompressing ? <CircularProgress /> : "Continue"}
      </Button>
    </Dialog>
  );
};
