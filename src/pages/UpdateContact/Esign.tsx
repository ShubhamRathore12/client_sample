import React, { useEffect } from "react";
import Esign from "../../components/common/Esign";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const EsignContact = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      navigate(location.pathname, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, location.pathname]);

  return (
    <>
      <Esign />
    </>
  );
};

export default EsignContact;
