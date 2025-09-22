// src/components/BankLogo.tsx
import React from "react";
import { getBankLogo } from "../../utils/getBankLogo";
import AvatarInitials from "../../utils/getInitials";

interface BankLogoProps {
  bankCode: string;
  size?: number | string;
  name?: string;
}

const BankLogo: React.FC<BankLogoProps> = ({ bankCode, size = "100%", name }) => {
  const logo = getBankLogo(bankCode);

  return (
    <>
      {logo ? (
        <img
          src={logo}
          alt={`${bankCode} Logo`}
          style={{ width: size, height: size, objectFit: "contain", borderRadius: "50%" }}
        />
      ) : (
        AvatarInitials({ name })
      )}
    </>
  );
};

export default BankLogo;
