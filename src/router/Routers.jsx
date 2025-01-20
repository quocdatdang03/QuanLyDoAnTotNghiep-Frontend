import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import WebRouter from "./WebRouter";

const Routers = () => {
  return (
    <>
      <Routes>
        {/* Web routers */}
        <Route path="/*" element={<WebRouter />} />

        {/* Admin routers */}
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </>
  );
};

export default Routers;
