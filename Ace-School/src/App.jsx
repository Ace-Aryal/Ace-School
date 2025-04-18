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
import WelcomePage from "./pages/WelcomePage";
import authService from "./appwrite/auth/auth";
import { setUser } from "./features/authSlice";
import ErrorPage from "./pages/ErrorPage";
import GallaryPage from "./components/Organisms/GallaryPage";
import GallaryItem from "./components/Organisms/GallaryItem";
import DashBoardPage from "./pages/DashBoardPage";
import InboxPage from "./pages/InboxPage";
import Calenderpage from "./pages/Calenderpage";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  async function getCurrentUserData() {
    const currentuser = await authService.getCurrentUser();
    if (currentuser) {
      dispatch(
        setUser({
          isLoggedIn: true,
          username: currentuser.name,
          email: currentuser.email,
          role: currentuser.prefs.role,
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
          </>
        )}

        {isAuthenticated && (
          <>
            <Route index element={<DashBoardPage />} />

            <Route path="attendance" element={<AttendancePage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path="timetable" element={<TimetablePage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="calender" element={<Calenderpage />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
