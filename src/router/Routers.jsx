import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import WebRouter from "./WebRouter";

const Routers = () => {
  const location = useLocation();

  // Cuộn lên đầu trang khi navigate
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
