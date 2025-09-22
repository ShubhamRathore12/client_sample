
import { useContext } from "react";
import { SettingsContext } from "../contexts/settings";
const useSettings = () => useContext(SettingsContext);
export default useSettings;
