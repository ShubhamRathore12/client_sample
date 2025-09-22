
import { useContext } from "react";
import { UserLocationContext } from "../contexts/location";
const useLocation = () => useContext(UserLocationContext);
export default useLocation;
