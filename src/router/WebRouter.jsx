import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Auth from "../components/Auth/Auth";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import StudentRoutes from "../components/studentComponent/StudentRoutes";
import NotFound from "../components/errors/NotFound";
import Unauthenticated from "../components/errors/Unauthenticated";
import Forbidden from "../components/errors/Forbidden";
import TeacherRoutes from "../components/teacherComponent/TeacherRoutes";

const WebRouter = () => {
  const { authReducer } = useSelector((store) => store);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/account/:siteName" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/user/profile/*"
          element={authReducer.user ? <Profile /> : <Unauthenticated />}
        />
        {authReducer.user ? (
          <>
            <Route
              path="/student/*"
              element={
                authReducer.user?.roles[0].roleName === "SINHVIEN" ? (
                  <StudentRoutes />
                ) : (
                  <Forbidden />
                )
              }
            />
            <Route
              path="/teacher/*"
              element={
                authReducer.user?.roles[0].roleName === "GIANGVIEN" ||
                authReducer.user?.roles[0].roleName === "ADMIN" ? (
                  <TeacherRoutes />
                ) : (
                  <Forbidden />
                )
              }
            />
          </>
        ) : (
          <>
            <Route path="/student/*" element={<Unauthenticated />} />
            <Route path="/teacher/*" element={<Unauthenticated />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default WebRouter;
