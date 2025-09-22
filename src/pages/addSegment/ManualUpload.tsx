import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import PublicLayout from "../../components/layouts/PublicLayout";
import RiskDisclosure from "./RiskDisclosureModal";
import ContentBox from "../../components/common/ContentBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSegmentProofType } from "../../slices/app";
import { RootState } from "../../store";

type Props = {};

function SegmentUploadMannual({}: Props) {
  const [fetchRiskDialogOpen, setFetchRiskDialogOpen] = React.useState(false);
  const dropdowns = useSelector((state: RootState) => state?.app?.optionsAll);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              Select any one Income proof
            </Typography>
            {
            // [
            //   "Last six months Bank statement",
            //   "Latest Salary slip",
            //   "Latest form 16",
            //   "Latest ITR Acknowledgement",
            //   "Latest Holding Statement with",
            // ]
            dropdowns?.SegmentProofType?.map((item) => (
              <Button
                variant="outlined"
                sx={{
                  fontSize: 15,
                }}
                onClick={() => {
                  dispatch(setSegmentProofType(item));
                  // setSelectedManualOption(item);
                  setFetchRiskDialogOpen(true);
                }}
              >
                {item?.value}
              </Button>
            ))}
          </Stack>
          <RiskDisclosure
            open={fetchRiskDialogOpen}
            onClose={() => setFetchRiskDialogOpen(false)}
            onSubmit={() => {
              navigate("/cdu/addSegment/segmentUpload/upload");
              setFetchRiskDialogOpen(false);
            }}
          />
        </>
      </ContentBox>
    </PublicLayout>
  );
}

export default SegmentUploadMannual;
