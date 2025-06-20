import { Route, Routes, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Applayout from "./components/Templates/Applayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AttendancePage from "./pages/AttendancePage";
import BillingPage from "./pages/BillingPage";
import NoticePage from "./pages/NoticePage";
import TimetablePage from "./pages/TimetablePage";

import ErrorPage from "./pages/ErrorPage";
import GallaryPage from "./pages/GallaryPage";
import GallaryItem from "./components/Organisms/GallaryItem";
import DashBoardPage from "./pages/DashBoardPage";
import InboxPage from "./pages/InboxPage";
import Calenderpage from "./pages/Calenderpage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import RecoverInitiationPage from "./pages/RecoverInitiationPage";
import RecoveryPage from "./pages/Recoverypage";
import ViewStudents from "./pages/ViewStudents";
import ViewTeachers from "./pages/ViewTeachers";
import InboxViewPage from "./pages/InboxViewPage";
import ViewNoticePage from "./pages/ViewNoticePage";
import NoticeElement from "./components/Molecules/NoticeElementPage";
import UpdateNoticePage from "./components/Organisms/UpdateNotice";
import AddTeachersPage from "./pages/AddTeachersPage";
import AddStudentsPage from "./pages/AddStudentsPage";
import ViewStaffsPage from "./pages/ViewStaffsPage";
import AddStaffsPage from "./pages/AddStaffsPage";
import SignupPage from "./pages/SignupPage";
import UpdateStaffPage from "./pages/UpdateStaff";
import UpdateTeacherPage from "./pages/UpdateTeacher";
import UpdateStudentPage from "./pages/UpdateStudent";
import PublicAppLayout from "./components/Templates/PublicAppLayout";
import UpdateTimetable from "./pages/UpdateTimetable";
import "./App.css";
import AddAttendencePage from "./pages/AddAttendencePage";
import { useEffect } from "react";
import { setUser } from "./features/authSlice";
import authService from "./appwrite/auth/auth";
import Librarypage from "./pages/Librarypage";
import databaseService from "./appwrite/Database/database";
import ViewAttendancePage from "./pages/ViewAttendancePage";
import ViewIndividualAttendancePage from "./pages/ViewIndividualAttendanceRecordPage";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function checkAuth() {
    console.log("checking auth");
    try {
      const currentuser = await authService.getCurrentUser();
      let currentUserDocument;
      let roles = currentuser.labels;
      if (currentuser?.labels?.length === 0) {
        currentUserDocument = await databaseService.getUserDocument(
          currentuser.email
        );
        roles = [currentUserDocument.documents[0].role];
      }
      if (currentuser.labels || currentUserDocument.total) {
        dispatch(
          setUser({
            isLoggedIn: true,
            username: currentuser.name,
            email: currentuser.email,
            roles,
            phone: currentuser.phone,
            createdAt: currentuser.$createdAt,
          })
        );
      }
    } catch (error) {
      dispatch(
        setUser({
          isLoggedIn: false,
          username: "",
          email: "",
          roles: "",
          phone: "",
          createdAt: "",
        })
      );
      console.error(error);
    }
  }

  useEffect(() => {
    const handleKeys = (e) => {
      // e.preventDefault();
      console.log("checking keys");

      if (e.key === "F3") {
        e.preventDefault(); // optional
        // Your custom logic for back
        navigate(-1);
      }
      if (e.key === "F4") {
        e.preventDefault(); // optional
        // Your custom logic for forward
        navigate(1);
      }
    };

    document.addEventListener("keydown", handleKeys);
    checkAuth();
    return () => document.removeEventListener("keydown", handleKeys);
  }, []);
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />

      {!isAuthenticated && (
        <Route path="/" element={<PublicAppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallary" element={<GallaryPage />} />
          <Route path="gallary/:id" element={<GallaryItem />} />

          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="recover-account" element={<RecoveryPage />} />
          <Route
            path="/recover-password-initiation"
            element={<RecoverInitiationPage />}
          />
        </Route>
      )}

      {isAuthenticated && (
        <Route path="/" element={<Applayout />}>
          <Route index element={<DashBoardPage />} />

          <Route path="attendance" element={<AttendancePage />} />
          <Route
            path="attendance/add-attendance"
            element={<AddAttendencePage />}
          />
          <Route
            path="attendance/view-records"
            element={<ViewAttendancePage />}
          />
          <Route
            path="/attendance/view-individual-records"
            element={<ViewIndividualAttendancePage />}
          />
          <Route path="billing" element={<BillingPage />} />
          <Route path="library" element={<Librarypage />} />
          <Route path="notice" element={<ViewNoticePage />} />
          <Route path="notice/:id" element={<NoticeElement />} />
          <Route path="notice/publish" element={<NoticePage />} />
          <Route path="notice/update" element={<UpdateNoticePage />} />
          <Route path="timetable" element={<TimetablePage />} />
          <Route
            path="timetable/modify-timetable"
            element={<UpdateTimetable />}
          />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="inbox/:id" element={<InboxViewPage />} />
          <Route path="calender" element={<Calenderpage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="view-students" element={<ViewStudents />} />
          <Route
            path="view-students/add-student"
            element={<AddStudentsPage />}
          />
          <Route
            path="view-students/update-student"
            element={<UpdateStudentPage />}
          />
          <Route path="view-staffs" element={<ViewStaffsPage />} />
          <Route path="view-staffs/add-staff" element={<AddStaffsPage />} />
          <Route
            path="view-staffs/update-staff"
            element={<UpdateStaffPage />}
          />
          <Route path="view-teachers" element={<ViewTeachers />} />
          <Route
            path="view-teachers/add-teacher"
            element={<AddTeachersPage />}
          />
          <Route
            path="view-teachers/update-teacher"
            element={<UpdateTeacherPage />}
          />
        </Route>
      )}
    </Routes>
  );
}

export default App;
