import { Backdrop, Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
// import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
// import VerificationForm from "./VerificationForm";
// import ForgotPasswordForm from "./ForgotPasswordForm";
// import SendEmailForgotPasswordSuccess from "./SendEmailForgotPasswordSuccess";
// import ResetPasswordForm from "./ResetPasswordForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transhtmlForm: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#191919",
  border: "2px solid #000",
  boxShadow: 24,
  trasition: "all linear 0.1s",
  p: 4,
};

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-5">
      <div
        className="flex items-center mb-6 text-2xl font-semibold text-[#003b4f] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        UTE
      </div>
      {/* {location.pathname === "/account/register" && <RegisterForm />} */}
      {location.pathname === "/account/login" && <LoginForm />}
      {/* {location.pathname === "/account/verify-email" && <VerificationForm />}
      {location.pathname === "/account/forgot-password" && (
        <ForgotPasswordForm />
      )}
      {location.pathname === "/account/forgot-password-success" && (
        <SendEmailForgotPasswordSuccess />
      )}
      {location.pathname === "/account/reset-password" && <ResetPasswordForm />} */}
    </div>
  );
};

export default Auth;
