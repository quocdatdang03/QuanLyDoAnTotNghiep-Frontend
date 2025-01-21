import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Auth from "../components/Auth/Auth";
import Profile from "../components/Profile/Profile";

const WebRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/account/:siteName" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/profile/*" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
};

export default WebRouter;
