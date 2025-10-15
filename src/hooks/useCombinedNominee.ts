import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ChangeRequest, Nominee } from "../slices/app";

// type CombinedNominee = ChangeRequest<Nominee> & { type: string; status: string };

const useCombinedNominees = (): any => {
  const currentNominees = useSelector(
    (state: RootState) => state?.app?.data?.current?.nominees || []
  );

  // const requestedNominees = useSelector(
  //   (state: RootState) => state?.app?.data?.changesRequests?.nominee || []
  // ).map((item: any) => item?.change);
  const requestedNominees = useSelector(
    (state: RootState) => state?.app?.data?.changesRequests?.nominee || []
  ).filter((item)=>item?.status==="DRAFT" || item?.status === "VERIFIED" || item?.status === "ESIGN_INITIATED")?.map((item: any) => ({
    ...item?.change,
    updatedId: item?.change?.id,
    id: item?.id,
  }));

  //   const normalizedCurrentNominees = Array.isArray(currentNominees)
  //     ? currentNominees.map((nominee) => ({
  //         id: nominee.id || null,
  //         type: "CURRENT",
  //         status: "ACTIVE",
  //         change: nominee,
  //       }))
  //     : [];

  return [...currentNominees, ...requestedNominees];
};

export default useCombinedNominees;
