import React from "react";

import { NavigationContext } from "../contexts/navigation";

const useNavigation = () => React.useContext(NavigationContext);
export default useNavigation;
