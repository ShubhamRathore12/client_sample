import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiService } from "../services/api.service";
import { setCombinedUserData } from "../slices/app";
import extractErrorAndShowToast from "../utils/extract-error";

const useFetchCombinedData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getCombinedUserData();

        dispatch(setCombinedUserData(result));
      } catch (error) {
         extractErrorAndShowToast(error);
      }
    };

    fetchData();
  }, [dispatch]);
};

export default useFetchCombinedData;
