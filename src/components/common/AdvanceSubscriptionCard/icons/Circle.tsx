import { FunctionComponent } from "react";

const Circle: FunctionComponent = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_188_4279" fill="white">
        <path d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z" />
      </mask>
      <path
        d="M23 12C23 18.0751 18.0751 23 12 23V25C19.1797 25 25 19.1797 25 12H23ZM12 23C5.92486 23 1 18.0751 1 12H-1C-1 19.1797 4.82029 25 12 25V23ZM1 12C1 5.92486 5.92486 1 12 1V-1C4.82029 -1 -1 4.82029 -1 12H1ZM12 1C18.0751 1 23 5.92486 23 12H25C25 4.82029 19.1797 -1 12 -1V1Z"
        fill="#0CA750"
        mask="url(#path-1-inside-1_188_4279)"
      />
    </svg>
  );
};

export default Circle;
