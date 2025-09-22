// import React from "react";
// import {
//   BrowserRouter,
//   Route,
//   Routes,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import Login from "../pages/Login";
// import UpdateContact from "../pages/UpdateContact";
// import { useSelector } from "react-redux";
// import VerifyOtp from "../pages/VerifyOtp";
// import Dashboard from "../pages/dashboard";
// import ClientList from "../pages/clientList";
// import UpdateBank from "../pages/updateBank";
// import UpdateNominee from "../pages/updateNominee";
// import RequestedEntries from "../pages/requestedEntries";
// import VerifyContact from "../pages/UpdateContact/verify";
// import NomineeForm from "../pages/updateNominee/NomineeForm";
// import AddBank from "../pages/updateBank/addBankAccount";
// import UpdateForm from "../pages/updateBank/updateForm";
// import UploadProof from "../pages/updateBank/uploadProof";
// import EsignContact from "../pages/UpdateContact/esign";
// import EsignBank from "../pages/updateBank/esign";

// type Props = {};

// const PrivateRoute = () => {
//   const user = useSelector((state: any) => !!state.app.multipleUsers?.length);
//   return user ? <Outlet /> : <Navigate to="/login" replace />;
// };

// const Routing = (props: Props) => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/verifyOTP" element={<VerifyOtp />} />

//         {/* Private Routes */}
//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/clientList" element={<ClientList />} />
//           <Route path="/updateBank" element={<UpdateBank />} />
//           <Route path="/updateContact" element={<UpdateContact />} />
//           <Route path="/updateContact/verify" element={<VerifyContact />} />
//           <Route path="/updateContact/esign" element={<EsignContact />} />
//           <Route path="/updateNominee/NomineeForm" element={<NomineeForm />} />
//           <Route path="/updateBank/addBankAccount" element={<AddBank />} />
//           <Route path="/updateBank/esign" element={<EsignBank />} />
//           <Route path="/updateBank/updateForm" element={<UpdateForm />} />
//           <Route path="/updateBank/uploadProof" element={<UploadProof />} />
//           <Route path="/updateNominee" element={<UpdateNominee />} />
//           <Route path="/requestedentries" element={<RequestedEntries />} />

//           {/* Add more private routes as needed */}
//         </Route>
//         <Route path="/" element={<Login />} />

//         {/* Default route: redirect to login */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Routing;

import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Main App Routes
import MainLogin from "../pages/MainLogin";
import MainVerifyOtp from "../pages/MainVerifyOtp";
import MainClientList from "../pages/MainClientList";
import ProjectSelection from "../pages/ProjectSelection";

// CDU Module Routes
import CDULogin from "../modules/cdu/pages/Login";
import UpdateContact from "../pages/UpdateContact";
import VerifyOtp from "../pages/VerifyOtp";
import Dashboard from "../pages/dashboard";
import ClientList from "../pages/clientList";
import UpdateBank from "../pages/updateBank";
import UpdateNominee from "../pages/updateNominee";
import RequestedEntries from "../pages/requestedEntries";
import VerifyContact from "../pages/UpdateContact/verify";
import NomineeForm from "../pages/updateNominee/NomineeForm";
import AddBank from "../pages/updateBank/addBankAccount";
import UpdateForm from "../pages/updateBank/updateForm";
import UploadProof from "../pages/updateBank/uploadProof";
import EsignContact from "../pages/UpdateContact/Esign";
import EsignBank from "../pages/updateBank/Esign";
import EsignNominee from "../pages/updateNominee/Esign";
import ViewEntry from "../pages/requestedEntries/viewEntry";
import AddSegment from "../pages/addSegment";
import SegmentUpload from "../pages/addSegment/SegmentUpload";
import EsignSegment from "../pages/addSegment/Esign";
import SegmentUploadMannual from "../pages/addSegment/ManualUpload";
import SegmentUploadDialog from "../pages/addSegment/UploadDialog";

// Other Module Routes
import RekycDashboard from "../modules/rekyc/pages/Dashboard";
import DDPIDashboard from "../modules/ddpi/pages/Dashboard";
import AccountClosuresDashboard from "../modules/account-closures/pages/Dashboard";

type Props = {};

const PrivateRoute = () => {
  const isLoggedIn = useSelector(
    (state: any) => !!state.app.multipleUsers?.length
  );
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

// Main app login route guard
const PublicMainLoginRoute = () => {
  const isLoggedIn = useSelector(
    (state: any) => !!state.app.multipleUsers?.length
  );
  return isLoggedIn ? <Navigate to="/project-selection" replace /> : <Outlet />;
};

// CDU specific login route guard
const PublicCDULoginRoute = () => {
  const isLoggedIn = useSelector(
    (state: any) => !!state.app.multipleUsers?.length
  );
  return isLoggedIn ? <Navigate to="/cdu/dashboard" replace /> : <Outlet />;
};

const Routing = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main App Routes */}
        <Route element={<PublicMainLoginRoute />}>
          <Route path="/" element={<MainLogin />} />
        </Route>

        {/* Main public routes */}
        <Route path="/main-verify-otp" element={<MainVerifyOtp />} />
        <Route path="/client-list" element={<MainClientList />} />
        <Route path="/project-selection" element={<ProjectSelection />} />

        {/* CDU Module Routes */}
        <Route element={<PublicCDULoginRoute />}>
          <Route path="/cdu" element={<CDULogin />} />
        </Route>
        <Route path="/cdu/verify-otp" element={<VerifyOtp />} />
        <Route path="/cdu/client-list" element={<ClientList />} />

        {/* Other Module Routes */}
        <Route path="/rekyc" element={<RekycDashboard />} />
        <Route path="/ddpi" element={<DDPIDashboard />} />
        <Route path="/account-closures" element={<AccountClosuresDashboard />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* CDU Private Routes */}
          <Route path="/cdu/dashboard" element={<Dashboard />} />
          <Route path="/cdu/clientList" element={<ClientList />} />
          <Route path="/cdu/updateBank" element={<UpdateBank />} />
          <Route path="/cdu/updateContact" element={<UpdateContact />} />
          <Route path="/cdu/updateContact/verify" element={<VerifyContact />} />
          <Route path="/cdu/updateContact/esign" element={<EsignContact />} />
          <Route path="/cdu/updateBank/addBankAccount" element={<AddBank />} />
          <Route path="/cdu/updateBank/esign" element={<EsignBank />} />
          <Route path="/cdu/updateBank/updateForm" element={<UpdateForm />} />
          <Route path="/cdu/updateBank/uploadProof" element={<UploadProof />} />
          <Route path="/cdu/updateNominee" element={<UpdateNominee />} />
          <Route path="/cdu/updateNominee/NomineeForm" element={<NomineeForm />} />
          <Route path="/cdu/updateNominee/esign" element={<EsignNominee />} />
          <Route path="/cdu/requestedEntries" element={<RequestedEntries />} />
          <Route path="/cdu/addSegment" element={<AddSegment />} />
          <Route path="/cdu/addSegment/segmentUpload" element={<SegmentUpload />} />
          <Route path="/cdu/addSegment/segmentUpload/mannual" element={<SegmentUploadMannual />} />
          <Route path="/cdu/addSegment/segmentUpload/upload" element={<SegmentUploadDialog />} />
          <Route path="/cdu/addSegment/esign" element={<EsignSegment />} />
          <Route
            path="/cdu/requestedEntries/viewEntry/:id"
            element={<ViewEntry />}
          />

          {/* Legacy routes for backward compatibility */}
          <Route path="/login" element={<Navigate to="/cdu" replace />} />
          <Route path="/verifyOTP" element={<Navigate to="/cdu/verify-otp" replace />} />
          <Route path="/dashboard" element={<Navigate to="/cdu/dashboard" replace />} />
          <Route path="/clientList" element={<Navigate to="/cdu/clientList" replace />} />
          <Route path="/updateBank" element={<Navigate to="/cdu/updateBank" replace />} />
          <Route path="/updateContact" element={<Navigate to="/cdu/updateContact" replace />} />
          <Route path="/updateNominee" element={<Navigate to="/cdu/updateNominee" replace />} />
          <Route path="/requestedEntries" element={<Navigate to="/cdu/requestedEntries" replace />} />
          <Route path="/addSegment" element={<Navigate to="/cdu/addSegment" replace />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
