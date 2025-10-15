import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentBox from "../../components/common/ContentBox";
import ConsentForm from "../../components/common/ConsentForm";
import { apiService } from "../../services/api.service";
import {
  setCombinedUserData,
  setEsignData,
  setSegmentResponse,
} from "../../slices/app";
import PublicLayout from "../../components/layouts/PublicLayout";
import extractErrorAndShowToast from "../../utils/extract-error";
import { showSingleToast } from "../../utils/toast-util";
import { RootState } from "../../store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Segment = { id: string; isEnabled: boolean; isLocked?: boolean };

interface SegmentFormValues {
  segments: Segment[];
  consent: boolean;
}

// const SEGMENTTYPE = ["Activate all segments", "Add Manually"];
const SEGMENTTYPE = ["Activate all segments"];

const AddSegment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdowns = useSelector((state: RootState) => state?.app?.optionsAll);
  const [segmentType, setSegmentType] = useState(SEGMENTTYPE[1]);
  const defaultSelectedSegments = useRef<Segment[]>();
  const currentSegments = useSelector(
    (state: RootState) => state?.app?.data?.current?.segments || []
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

  const initialValues: SegmentFormValues = {
    segments: [],
    consent: false,
  };

  const validationSchema = Yup.object().shape({
    segments: Yup.array()
      .min(1, "Please select at least one segment")
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          isEnabled: Yup.boolean().required(),
        })
      ),
    consent: Yup.boolean().oneOf([true], "Consent is required"),
  });

  const onSubmit = async (
    values: SegmentFormValues,
    { setSubmitting }: FormikHelpers<SegmentFormValues>
  ) => {
    setSubmitting(true);
    try {
      const payload = {
        segments: values.segments.map(({ id, isEnabled }) => ({
          id,
          isEnabled,
        })),
      };

      const response: any = await apiService.submitSegmentRequest(payload);
      dispatch(setSegmentResponse(response));
      if (response?.nextSteps?.FileUpload?.required) {
        showSingleToast(response?.nextSteps?.FileUpload?.msg);
        // navigate("/addSegment/segmentUpload");
        navigate("/addSegment/segmentUpload/mannual");
      } else {
        showSingleToast("Segment request initiated");
        dispatch(setEsignData(response?.data?.esign));
        navigate("/addSegment/esign");
      }
    } catch (error: any) {
      extractErrorAndShowToast(error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<SegmentFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const result = await apiService.getCombinedUserData();
        dispatch(setCombinedUserData(result));
      } catch (error) {}
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    const allActivatedSegments = currentSegments
      ?.filter((segment) => segment.isEnabled)
      .map((item) => ({
        id: item.id,
        isEnabled: item.isEnabled,
        isLocked: true,
      }));
    defaultSelectedSegments.current = allActivatedSegments;
    formik.setFieldValue("segments", allActivatedSegments);
  }, [currentSegments]);

  const handleSegmentToggle = (segmentId: string) => {
    const isSelected = formik.values.segments.some((s) => s.id === segmentId);
    const segment = formik.values.segments.find((s) => s.id === segmentId);
    if (isSelected && !segment.isLocked) {
      formik.setFieldValue(
        "segments",
        formik.values.segments.filter((s) => s.id !== segmentId)
      );
      setSegmentType(SEGMENTTYPE[1]);
    } else {
      formik.setFieldValue("segments", [
        ...formik.values.segments,
        { id: segmentId, isEnabled: true },
      ]);
    }
  };

  // const handleAllSegment = () => {
  //   const allSegments =
  //     dropdowns?.Segment?.map((segment: any) => ({
  //       id: segment.id,
  //       isEnabled: true,
  //     })) || [];

  //   formik.setFieldValue("segments", [
  //     ...formik.values.segments,
  //     ...allSegments,
  //   ]);
  // };

  const handleAllSegment = () => {
    if (!isAllSelected) {
      // First click — select all segments
      const allSegments =
        dropdowns?.Segment?.map((segment: any) => ({
          id: segment.id,
          isEnabled: true,
        })) || [];

      formik.setFieldValue("segments", [
        ...formik.values.segments,
        ...allSegments,
      ]);
      setIsAllSelected(true);
    } else {
      // Second click — reset to default locked segments only
      formik.setFieldValue("segments", defaultSelectedSegments.current || []);
      setIsAllSelected(false);
    }
  };

  return (
    <PublicLayout>
      <ContentBox
        isBoxShadow={false}
        sx={{ marginTop: 4 }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ alignSelf: "start" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem" }}
          >
            Add Segment
          </Typography>
        </Box>

        <Stack sx={{ gap: 1, width: "100%" }}>
          {/* <Typography variant="h6">Segment Type</Typography> */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {/* <Button
              onClick={() =>
                formik.setFieldValue("is_all_segments_active", true)
              }
              sx={{ flexBasis: { xs: "100%", sm: "48%" }, flexGrow: 1 }}
            >
              Activate all segments
            </Button>
            <Button
              onClick={() =>
                formik.setFieldValue("is_all_segments_active", false)
              }
              sx={{ flexBasis: { xs: "100%", sm: "48%" }, flexGrow: 1 }}
              variant="outlined"
            >
              Add Manually
            </Button> */}
            {SEGMENTTYPE?.map((item, idx) => {
              const isSelected = segmentType === item;
              return (
                <Button
                  key={idx}
                  onClick={() => {
                    if (item === SEGMENTTYPE[0]) {
                      handleAllSegment();
                    } else {
                      formik.setFieldValue(
                        "segments",
                        defaultSelectedSegments.current
                      );
                    }
                    setSegmentType(item);
                  }}
                  sx={{
                    flexBasis: { xs: "100%", sm: "48%" },
                    flexGrow: 1,
                  }}
                  variant={isAllSelected ? "contained" : "outlined"}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
          {/* </Stack> */}

          {/* <Stack sx={{ gap: 1, marginTop: 2 }}>
            <Typography variant="h6">Selected Segments</Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {dropdowns?.Segment.map((item, idx) => {
                const isSelected = formik.values.segments.some(
                  (s) => s.id === item?.id
                );
                return (
                  <Button
                    key={idx}
                    // onClick={() => handleSegmentToggle(item?.id)}
                    sx={{
                      flexBasis: { xs: "100%", sm: "48%" },
                      flexGrow: 1,
                      px: 4,
                    }}
                    variant={isSelected ? "contained" : "outlined"}
                  >
                    {item?.value}
                  </Button>
                );
              })}
            </Box>
            {formik.touched.segments && formik.errors.segments && (
              <Typography color="error">{formik.errors.segments}</Typography>
            )}
          </Stack> */}

          <Box>
            <Accordion sx={{ gap: 1, marginTop: 2, }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Selected Segments</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {dropdowns?.Segment.map((item, idx) => {
                    const isSelected = formik.values.segments.some(
                      (s) => s.id === item?.id
                    );
                    return (
                      <Button
                        key={idx}
                        // onClick={() => handleSegmentToggle(item?.id)}
                        sx={{
                          flexBasis: { xs: "100%", sm: "48%" },
                          flexGrow: 1,
                          px: 4,
                        }}
                        variant={isSelected ? "contained" : "outlined"}
                      >
                        {item?.value}
                      </Button>
                    );
                  })}
                </Box>
                {formik.touched.segments && formik.errors.segments && (
                  <Typography color="error">
                    {formik.errors.segments}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>

        <ConsentForm
          checked={formik.values.consent}
          onChange={formik.handleChange}
          error={formik.errors.consent}
          touched={formik.touched.consent}
          text={`I/We hereby request Stoxkart to change segment in Trading and
            Demat account I/we hold with Stoxkart. I/We confirm & declare that the
            segment belongs to me and I/We authorise Stoxkart / Exchanges /
            Depositories to use this segment to send me/us any information
            / alert / email.`}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          //   disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
          // onClick={() => navigate("/segmentUpload")}
          disabled={formik.isSubmitting}
        >
          CONFIRM
        </Button>
      </ContentBox>
    </PublicLayout>
  );
};

export default AddSegment;
