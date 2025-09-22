import React from "react";
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import PublicLayout from "../../components/layouts/PublicLayout";
import RiskDisclosure from "./RiskDisclosureModal";
import extractErrorAndShowToast from "../../utils/extract-error";
import { DocumentScanner } from "@mui/icons-material";
import ContentBox from "../../components/common/ContentBox";
import { useNavigate } from "react-router-dom";

type Props = {};

function SegmentUpload({}: Props) {
  const [fetchRiskDialogOpen, setFetchRiskDialogOpen] = React.useState(false);
  const [AALoading, setAALoading] = React.useState(false);
  const navigate = useNavigate();
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
            <Stack gap={1}>
              <Button
                sx={{ fontSize: 15 }}
                onClick={() => setFetchRiskDialogOpen(true)}
              >
                {AALoading ? (
                  <CircularProgress
                    sx={{
                      "& circle": {
                        stroke: (theme) => theme.palette.primary.main,
                      },
                    }}
                  />
                ) : (
                  "Fetch 6 Months Bank Statement"
                )}
              </Button>
              <Typography
                align="center"
                color="text.secondary"
                variant="subtitle2"
              >
                OR
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  fontSize: 15,
                }}
                startIcon={<DocumentScanner />}
                onClick={() => {
                  navigate("/cdu/addSegment/segmentUpload/mannual")
                }}
              >
                Upload Documents Manually
              </Button>
            </Stack>
            <RiskDisclosure
              open={fetchRiskDialogOpen}
              onClose={() => setFetchRiskDialogOpen(false)}
              onSubmit={async () => {
                setAALoading(true);
                try {
                  // const win = window.open("");
                  //   setWin(win);
                  //   setProcessing(true);
                } catch (error) {
                  extractErrorAndShowToast(error);
                } finally {
                  setAALoading(false);
                  setFetchRiskDialogOpen(false);
                }
              }}
            />
          </>
     
      </ContentBox>
    </PublicLayout>
  );
}

export default SegmentUpload;
