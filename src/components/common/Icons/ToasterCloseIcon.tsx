import { useTheme } from "@mui/material/styles";
import React from "react";
import { FunctionComponent } from "react";

interface IProps {
  onClick: () => void;
}

const ToasterCloseIcon: FunctionComponent<IProps> = ({ onClick }) => {
  const theme = useTheme();

  return (
    <svg
      onClick={onClick}
      style={{
        marginLeft: 16,
        cursor: "pointer",
        color: theme.palette.text.secondary,
      }}
      fill="currentColor"
      width={20}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );
};
export default ToasterCloseIcon;
