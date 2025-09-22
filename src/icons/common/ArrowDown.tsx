import React from "react";
import { FunctionComponent, SVGProps } from "react";

const ArrowDown: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="100%"
      height="10px"
      viewBox="0 0 25 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1368 15.2514C12.2151 15.327 12.3225 15.3898 12.4577 15.434C12.6203 15.4871 12.8041 15.5071 12.992 15.4978C13.1793 15.5069 13.3624 15.4869 13.5245 15.4339C13.6592 15.3898 13.7662 15.3273 13.8444 15.2522C13.9483 15.1924 14.0425 15.1228 14.1224 15.0446L22.7542 6.58248C23.1486 6.19586 23.0428 5.74337 22.5178 5.57182C21.9928 5.40027 21.2475 5.57463 20.8532 5.96126L12.9916 13.6682L5.13151 5.95931C4.73721 5.57259 3.99202 5.39822 3.46708 5.56984C2.94213 5.74146 2.83622 6.19407 3.23052 6.58079L11.8601 15.0444C11.9396 15.1224 12.0334 15.1918 12.1368 15.2514Z"
        fill="#707070"
      />
    </svg>
  );
};

export default ArrowDown;
