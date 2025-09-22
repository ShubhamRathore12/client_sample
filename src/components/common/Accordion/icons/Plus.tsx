import { FunctionComponent } from "react";

interface IProps {
  onClick: () => void;
}

const Plus: FunctionComponent<IProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4995 9C17.4995 8.44772 17.0518 8 16.4995 8C15.9472 8 15.4995 8.44772 15.4995 9V15.5195H9C8.44772 15.5195 8 15.9672 8 16.5195C8 17.0718 8.44772 17.5195 9 17.5195H15.4995V24C15.4995 24.5523 15.9472 25 16.4995 25C17.0518 25 17.4995 24.5523 17.4995 24V17.5195H24C24.5523 17.5195 25 17.0718 25 16.5195C25 15.9672 24.5523 15.5195 24 15.5195H17.4995V9Z"
        fill="#707070"
      />
    </svg>
  );
};

export default Plus;
