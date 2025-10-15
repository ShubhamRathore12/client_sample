import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import EntryCard from "./EntryCard";
import ContentBox from "../../components/common/ContentBox";
import PublicLayout from "../../components/layouts/PublicLayout";
import { useSelector } from "react-redux";
import useFetchCombinedData from "../../hooks/useFetchCombinedData";
import useRedirectBackToDashboard from "../../hooks/useRedirectBackToDashboard";

export const SECTION_LABELS: Record<string, string> = {
  mobile: "Mobile Number Update",
  email: "Email Update",
  nominee: "Nominee Updates",
  bankAccount: "Bank Account Updates",
  segment: "Segment Updates",
};

const RequestedEntries = () => {
  useRedirectBackToDashboard();
  const theme = useTheme();
  const changeEntries = useSelector(
    (state: any) => state.app?.data?.changesRequests
  );
  useFetchCombinedData();

  // Safe flatten of all change requests
  // const flattenedRequests = Object.entries(changeEntries || {}).flatMap(
  //   ([key, entries]: [string, any]) => {
  //     if (!Array.isArray(entries)) return [];
  //     return entries.map((entry: any) => ({
  //       ...entry,
  //       section: SECTION_LABELS[key] || key,
  //       fieldKey: key,
  //     }));
  //   }
  // );

  const nomineeExtraction = (enteries) => {
    return enteries.filter((item) => item?.status !== "VERIFIED" || item?.status !== "DRAFT");
  };

  const flattenedRequests = Object.entries(changeEntries || {}).flatMap(
    ([key, entries]: [string, any]) => {
      if (
        key === "nominee"
        // && changeEntries?.nomineeMeta?.isPendingOnUser === true
      ) {
        // return [];
        return nomineeExtraction(entries).map((entry: any) => ({
          ...entry,
          section: SECTION_LABELS[key] || key,
          fieldKey: key,
        }));
      }

      if (!Array.isArray(entries)) return [];

      return entries.map((entry: any) => ({
        ...entry,
        section: SECTION_LABELS[key] || key,
        fieldKey: key,
      }));
    }
  );

  return (
    <PublicLayout>
      <ContentBox isBoxShadow={false}>
        <Box sx={{ alignSelf: "start" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, fontSize: "1.25rem" }}
          >
            Request History
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            border: {
              xs: 0,
              md: `1px solid ${theme.palette.background.boxBorder}`,
            },
            borderRadius: 2,
            paddingY: { xs: 0, md: 4 },
            paddingX: { xs: 0, md: 2 },
            mt: 2,
          }}
        >
          {!!flattenedRequests.length ? (
            flattenedRequests.map((item, index) => {
              let displayText = item.section;
              // Adjust display per field type
              if (item.fieldKey === "mobile" || item.fieldKey === "email") {
                displayText += `: (${item.change?.value})`;
              } else if (item.fieldKey === "nominee") {
                displayText += `: (${item.change?.name} (${item.change?.sharePercentage}%))`;
              } else if (item.fieldKey === "bankAccount") {
                displayText += `: (${item.change?.accountNumber ?? "N/A"})`;
              } else if (item.fieldKey === "segment") {
                displayText += `: (${
                  item.change?.SegmentIds?.join(", ") ?? "N/A"
                })`;
              }

              return (
                <>
                  <EntryCard text={displayText} id={item.id} item={item} />
                  {index < flattenedRequests.length - 1 && (
                    <Divider sx={{ my: 2 }} />
                  )}
                </>
              );
            })
          ) : (
            <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
              No Data Found
            </Typography>
          )}
        </Box>
      </ContentBox>
    </PublicLayout>
  );
};

export default RequestedEntries;
