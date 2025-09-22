import React from "react";
import { FunctionComponent, SVGProps } from "react";

const ArrowUp: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
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
        d="M12.1368 5.74859C12.2151 5.67304 12.3225 5.6102 12.4577 5.56601C12.6203 5.51287 12.8041 5.49292 12.992 5.50219C13.1793 5.49314 13.3624 5.51314 13.5245 5.56613C13.6592 5.61015 13.7662 5.67266 13.8444 5.74781C13.9483 5.80758 14.0425 5.87716 14.1224 5.95544L22.7542 14.4175C23.1486 14.8041 23.0428 15.2566 22.5178 15.4282C21.9928 15.5997 21.2475 15.4254 20.8532 15.0387L12.9916 7.33179L5.13151 15.0407C4.73721 15.4274 3.99202 15.6018 3.46708 15.4302C2.94213 15.2585 2.83622 14.8059 3.23052 14.4192L11.8601 5.9556C11.9396 5.87759 12.0334 5.80822 12.1368 5.74859Z"
        fill="#707070"
      />
    </svg>
  );
};

export default ArrowUp;
