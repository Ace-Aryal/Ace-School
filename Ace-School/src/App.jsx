import { useState } from "react";
import { Route, Routes } from "react-router";
import { Button } from "./components/Atoms/button";
import Applayout from "./components/Templates/Applayout";
import HomePage from "./components/Organisms/HomePage";
import AboutPage from "./components/Organisms/AboutPage";
import ServicesPage from "./components/Organisms/ServicesPage";
import ContactPage from "./components/Organisms/ContactPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Applayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
