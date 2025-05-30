import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
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
import authService from "./appwrite/auth/auth";
import { setUser } from "./features/authSlice";
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
import UpdateStudentPage from "./pages/updateStudent";
import PublicAppLayout from "./components/Templates/PublicAppLayout";
import UpdateTimetable from "./pages/UpdateTimetable";
import "./App.css";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);

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
          <Route path="billing" element={<BillingPage />} />
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
