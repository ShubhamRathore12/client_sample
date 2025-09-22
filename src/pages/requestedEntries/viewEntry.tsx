import React from "react";
import PublicLayout from "../../components/layouts/PublicLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ViewEntryStatus from "../../components/common/ViewEntryStatus";

const ViewEntry = () => {
  const { id } = useParams();
  const changeEntries = useSelector(
    (state: any) => state.app?.data?.changesRequests
  );

  // Flatten all entries and find the one matching the ID
  const allRequests = Object.values(changeEntries).flatMap((section: any) =>
    Array.isArray(section) ? section : []
  );

  const matchedEntry = allRequests.find((entry) => entry.id === Number(id));

  const statusText = matchedEntry?.status || "UNKNOWN";

  return (
    <PublicLayout>
      <ViewEntryStatus statusText={statusText}/>
    </PublicLayout>
  );
};

export default ViewEntry;
