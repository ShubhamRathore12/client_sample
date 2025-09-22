import { FunctionComponent } from "react";

interface IProps {
  onClick: () => void;
}

const Minus: FunctionComponent<IProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.6731 16L23.6731 16" stroke="#707070" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default Minus;
