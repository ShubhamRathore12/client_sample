import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust the path
import PublicLayout from "../../components/layouts/PublicLayout"; // Adjust path
import VerifyOTP from "../../components/common/VerifyOTP"; // Adjust path

const VerifyContact: React.FC = () => {
  const contactVerification = useSelector((state: RootState) => state.app.contactVerification);

  return (
    <PublicLayout>
      <VerifyOTP
        type={contactVerification?.type as "mobileNumber" | "email" | "mobileAndEmail"}
        regMobile={contactVerification?.regMobile}
        regEmail={contactVerification?.regEmail}
      />
    </PublicLayout>
  );
};

export default VerifyContact;
