import React from "react";

import { useTheme, useMediaQuery } from "@mui/material";
import LogoHeader from "./Header/LogoHeader";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Logout from "../../common/Logout";

interface Props {
  children?: React.ReactNode;
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  // Define routes where the back button should be hidden
  const hideBackButtonRoutes = ["/cdu/dashboard", "/project-selection"];
  const shouldHideBackButton = hideBackButtonRoutes.includes(
    window.location.pathname
  );
  const isLogoutPopupOpen = useSelector((state: RootState) => state.app.isLogoutPopupOpen);

  return (
    <>
      {isAboveMd && <LogoHeader />}
      <Header />
      {isAboveMd && !shouldHideBackButton && <BackButton />}
      {children}
      {isLogoutPopupOpen && <Logout />}
      {/* <Footer /> */}
    </>
  );
};

export default PublicLayout;
