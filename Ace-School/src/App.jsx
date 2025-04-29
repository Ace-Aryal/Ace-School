import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Applayout from "./components/Templates/Applayout";
import HomePage from "./components/Organisms/HomePage";
import AboutPage from "./components/Organisms/AboutPage";
import ServicesPage from "./components/Organisms/ServicesPage";
import ContactPage from "./components/Organisms/ContactPage";
import LoginPage from "./components/Organisms/LoginPage";
import AttendancePage from "./pages/AttendancePage";
import BillingPage from "./pages/BillingPage";
import NoticePage from "./pages/NoticePage";
import TimetablePage from "./pages/TimetablePage";
import authService from "./appwrite/auth/auth";
import { setUser } from "./features/authSlice";
import ErrorPage from "./pages/ErrorPage";
import GallaryPage from "./components/Organisms/GallaryPage";
import GallaryItem from "./components/Organisms/GallaryItem";
import DashBoardPage from "./pages/DashBoardPage";
import InboxPage from "./pages/InboxPage";
import Calenderpage from "./pages/Calenderpage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import RecoverInitiationPage from "./components/Organisms/RecoverInitiationPage";
import RecoveryPage from "./components/Organisms/Recoverypage";
import ViewStudents from "./pages/ViewStudents";
import ViewTeachers from "./pages/ViewTeachers";
import InboxViewPage from "./components/Organisms/InboxViewPage";
import ViewNoticePage from "./pages/ViewNoticePage";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  async function getCurrentUserData() {
    const currentuser = await authService.getCurrentUser();
    if (currentuser) {
      console.log("curr user", currentuser);

      dispatch(
        setUser({
          isLoggedIn: true,
          username: currentuser.name,
          email: currentuser.email,
          role: currentuser.labels[0],
          phone: currentuser.phone,
          createdAt: currentuser.$createdAt,
        })
      );
    }
    console.log("user", user);
  }
  useEffect(() => {
    getCurrentUserData();
  }, [isAuthenticated]);
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<Applayout />}>
        {!isAuthenticated && (
          <>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="gallary" element={<GallaryPage />} />
            <Route path="gallary/:id" element={<GallaryItem />} />

            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="recover-account" element={<RecoveryPage />} />
            <Route
              path="/recover-password-initiation"
              element={<RecoverInitiationPage />}
            />
          </>
        )}

        {isAuthenticated && (
          <>
            <Route index element={<DashBoardPage />} />

            <Route path="attendance" element={<AttendancePage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="notice" element={<ViewNoticePage />} />
            <Route path="notice/publish" element={<NoticePage />} />
            <Route path="timetable" element={<TimetablePage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="inbox/:id" element={<InboxViewPage />} />
            <Route path="calender" element={<Calenderpage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="view-students" element={<ViewStudents />} />
            <Route path="view-teachers" element={<ViewTeachers />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
