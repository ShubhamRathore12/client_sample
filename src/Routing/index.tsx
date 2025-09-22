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

import Login from "../pages/Login";
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

type Props = {};

const PrivateRoute = () => {
  const isLoggedIn = useSelector(
    (state: any) => !!state.app.multipleUsers?.length
  );
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

// 👇 Only blocks /login if user is logged in
const PublicLoginRoute = () => {
  const isLoggedIn = useSelector(
    (state: any) => !!state.app.multipleUsers?.length
  );
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const Routing = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Only guard login route */}
        <Route element={<PublicLoginRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Other public routes - accessible even if logged in */}
        <Route path="/verifyOTP" element={<VerifyOtp />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientList" element={<ClientList />} />
          <Route path="/updateBank" element={<UpdateBank />} />
          <Route path="/updateContact" element={<UpdateContact />} />
          <Route path="/updateContact/verify" element={<VerifyContact />} />
          <Route path="/updateContact/esign" element={<EsignContact />} />
          <Route path="/updateBank/addBankAccount" element={<AddBank />} />
          <Route path="/updateBank/esign" element={<EsignBank />} />
          <Route path="/updateBank/updateForm" element={<UpdateForm />} />
          <Route path="/updateBank/uploadProof" element={<UploadProof />} />
          <Route path="/updateNominee" element={<UpdateNominee />} />
          <Route path="/updateNominee/NomineeForm" element={<NomineeForm />} />
          <Route path="/updateNominee/esign" element={<EsignNominee />} />
          <Route path="/requestedEntries" element={<RequestedEntries />} />
          <Route path="/addSegment" element={<AddSegment />} />
          <Route path="/addSegment/segmentUpload" element={<SegmentUpload />} />
          <Route path="/addSegment/segmentUpload/mannual" element={<SegmentUploadMannual />} />
          <Route path="/addSegment/segmentUpload/upload" element={<SegmentUploadDialog />} />
          <Route path="/addSegment/esign" element={<EsignSegment />} />
          <Route
            path="/requestedEntries/viewEntry/:id"
            element={<ViewEntry />}
          />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
