import React from "react";
import SideBar from "../components/adminComponent/SideBar/SideBar";
import { useSelector } from "react-redux";
import Unauthenticated from "../components/errors/Unauthenticated";
import Forbidden from "../components/errors/Forbidden";

const AdminRouter = () => {
  const { authReducer } = useSelector((store) => store);

  return (
    <>
      {authReducer.user ? (
        authReducer.user?.roles[0].roleName === "ADMIN" ? (
          <SideBar />
        ) : (
          <Forbidden />
        )
      ) : (
        <Unauthenticated />
      )}
    </>
  );
};

export default AdminRouter;
