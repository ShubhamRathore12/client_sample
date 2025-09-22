import React from "react";
import { useSelector } from "react-redux";
import PublicLayout from "../../components/layouts/PublicLayout"; // Adjust the path as needed
import VerifyOTP from "../../components/common/VerifyOTP"; // Adjust the path as needed
import { RootState } from "../../store"; // Adjust the path as needed

const Verify: React.FC = () => {
  const { contactVerification } = useSelector((state: RootState) => state.app);

  if (!contactVerification) {
    return (
      <PublicLayout>
        <div>Missing verification data. Please go back and fill the form.</div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <VerifyOTP
        type={contactVerification.type as "mobileNumber" | "email" | "mobileAndEmail"}
        regMobile={contactVerification.regMobile ?? ""}
        regEmail={contactVerification.regEmail ?? ""}
      />
    </PublicLayout>
  );
};

export default Verify;
