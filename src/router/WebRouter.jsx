import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Auth from "../components/Auth/Auth";

const WebRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/account/:siteName" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default WebRouter;
