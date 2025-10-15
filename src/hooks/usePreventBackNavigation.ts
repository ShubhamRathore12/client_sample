// hooks/usePreventBackNavigation.ts
import { useEffect } from "react";

const usePreventBackNavigation = () => {
  useEffect(() => {
    // Push a fake history entry so back button stays on dashboard
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (window.location.pathname === "/dashboard") {
        window.location.reload(); // Refresh dashboard instead of going back
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};

export default usePreventBackNavigation;
