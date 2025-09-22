import React from "react";
import Avatar from "@mui/material/Avatar";

interface AvatarInitialsProps {
  name: string;
  size?: number;
}

const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map(p => p[0].toUpperCase()).join("");
};

const stringToHSLColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash &= hash;
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const hslToLightBackground = (hslColor: string, opacity = 0.15): string => {
  return hslColor.replace("hsl", "hsla").replace(")", `, ${opacity})`);
};

const getColorsFromString = (str: string, opacity = 0.15) => {
  const color = stringToHSLColor(str);
  const backgroundColor = hslToLightBackground(color, opacity);
  return { color, backgroundColor };
};

const AvatarInitials: React.FC<AvatarInitialsProps> = ({ name, size = 40 }) => {
  const initials = getInitials(name);
  const { color, backgroundColor } = getColorsFromString(name);

  return (
    <Avatar
      sx={{
        width: {xs: 30, md: size},
        height: {xs: 30, md: size},
        bgcolor: backgroundColor,
        color: color,
        fontWeight: "bold",
        fontSize: size * 0.4,
        textTransform: "uppercase",
      }}
      title={name}
    >
      {initials}
    </Avatar>
  );
};

export default AvatarInitials;
