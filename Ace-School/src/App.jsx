import { useState } from "react";
import { Route, Routes } from "react-router";
import { Button } from "./components/Atoms/button";
import { useSelector } from "react-redux";
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
function App() {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Applayout />}>
        {!isAuthenticated && (
          <>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
          </>
        )}

        {isAuthenticated && (
          <>
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path="timetable" element={<TimetablePage />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
