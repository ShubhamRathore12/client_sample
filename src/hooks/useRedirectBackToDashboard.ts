// hooks/useRedirectBackToDashboard.ts
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useRedirectBackToDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Push dummy state to trap back navigation
    // window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (location.pathname === "/cdu/requestedEntries") {
        navigate("/cdu/dashboard", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, navigate]);
};

export default useRedirectBackToDashboard;
