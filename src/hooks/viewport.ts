import React from "react";

import { userAgentFromString } from "utils/user-agent";

export const useViewport = () => {
  const [viewport, setViewport] = React.useState<string>(
    "width=device-width,initial-scale=1"
  );

  React.useEffect(() => {
    if ("navigator" in window) {
      const ua = userAgentFromString(window.navigator.userAgent);
      if (ua.device.type === "mobile") {
        setViewport(
          "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        );
      }
    }
  }, []);

  return viewport;
};
