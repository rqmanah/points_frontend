import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "remixicon/fonts/remixicon.css";
import "./App.css";
import "./index.css";
import Login from "./pages/Login/index";
import Terms from "./pages/Terms/index";

import { QueryClient } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import AddAction from "./pages/AddPoints";
import Analysis from "./pages/analysis";
import Invoice from "./pages/invoice";
import DetailsInvoice from "./pages/invoice/detailsInvoice";
import LandingPage from "./pages/landing";
import Orders from "./pages/order";
import Packages from "./pages/packages";
import PaymentError from "./pages/paymentError";
import PaymentSuccess from "./pages/paymentSuccess";
import AddPrize from "./pages/Prizes/pages/add";
import AddStock from "./pages/Prizes/pages/addstock";
import EditPrize from "./pages/Prizes/pages/edit";
import SimplePage from "./pages/Prizes/pages/samplepage";
import SubtractStock from "./pages/Prizes/pages/subtractstock";
import Profile from "./pages/profile";
import Register from "./pages/register";
import ResetPassword from "./pages/ResetPassword";
import Schools from "./pages/schools/index";
import ShowSchool from "./pages/schools/showschool";
import AddSchool from "./pages/schools/showschool/add";
import Setting from "./pages/setting/Index";
import Behaviors from "./pages/settings/pages/behaviors";
import BehaviorsEdit from "./pages/settings/pages/behaviorsedit";
import PointsSettings from "./pages/settings/pages/pointssettings";
import ProfileSettings from "./pages/settings/pages/profilesettings";
import { StudentHome } from "./pages/studentPages/home";
import { StudentRequests } from "./pages/studentPages/requests";
import { StudentStore } from "./pages/studentPages/store";
import Students from "./pages/Students";
import AddStudent from "./pages/Students/pages/add";
import EditStudent from "./pages/Students/pages/edit";
import StudentProfile from "./pages/Students/pages/Profile";
import UploadFile from "./pages/Students/pages/uploadfile";
import Subscription from "./pages/subscription";
import Support from "./pages/Support";
import AddTicket from "./pages/Support/pages/add";
import SupportEdit from "./pages/Support/pages/edit";
import FirstStudents from "./pages/teacherPages/firstStudents";
import Notes from "./pages/teacherPages/notes";
import DetailsNotes from "./pages/teacherPages/notes/DetailsNotes";
import Reports from "./pages/teacherPages/reports";
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/Teachers/pages/add";
import EditTeacher from "./pages/Teachers/pages/edit";
import UploadTeachersFile from "./pages/Teachers/pages/upload";
import VerifyPhone from "./pages/VerifyPhone";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/register" element={<Register />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route path="/verifyPhoneNumber" element={<VerifyPhone />} />
      <Route path="/schools/add" element={<AddSchool />} />
      <Route path="/payment-error" element={<PaymentError />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/unauthorized" element={<Unauthorized />} /> 
      <Route element={<Layout />}>
        <Route path="/schools" element={<Schools />} />
        <Route path="/schools/show" element={<ShowSchool />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/add" element={<AddTeacher />} />
        <Route path="/teachers/edit/:id" element={<EditTeacher />} />
        <Route path="/teachers/upload" element={<UploadTeachersFile />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/students/profile/:id" element={<StudentProfile />} />

        <Route path="/students/upload" element={<UploadFile />} />
        <Route path="/prizes" element={<SimplePage />} />
        <Route path="/prizes/add" element={<AddPrize />} />
        <Route path="/prizes/edit/:id" element={<EditPrize />} />
        <Route path="/prizes/addstock/:id" element={<AddStock />} />
        <Route path="/prizes/minstock/:id" element={<SubtractStock />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/add" element={<AddTicket />} />
        <Route path="/support/edit/:id" element={<SupportEdit />} />
        <Route path="/behaviors" element={<Behaviors />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoice/:id" element={<DetailsInvoice />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="/settings/pointssettings" element={<PointsSettings />} />
        <Route path="/behaviors/edit/:id" element={<BehaviorsEdit />} />
        <Route path="/addaction/" element={<AddAction />} />

        <Route path="/analytics" element={<Analysis />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<DetailsNotes />} />

        <Route path="/first-students" element={<FirstStudents />} />

        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/prizes" element={<StudentStore />} />
        <Route path="/student/orders" element={<StudentRequests />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings/profilesettings" element={<ProfileSettings />} />
        <Route path="/packages" element={<Packages />} />
      </Route>
      <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
    </Routes>
  );
}

export default App;
