import React, { useEffect, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordFormValidation } from "./validation/forgotPasswordFormValidation";
import {
  clearAuthError,
  clearAuthSuccess,
  sendResetPasswordEmailAction,
} from "../../redux/Auth/Action";

const initialValues = {
  email: "",
};

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgotPasswordFormValidation,
    onSubmit: (values) => {
      const requestData = {
        email: values.email,
        navigate,
        isAuthLoading,
      };
      console.log(requestData);
      dispatch(sendResetPasswordEmailAction(requestData));
    },
  });

  // handle loading :
  useEffect(() => {
    if (isAuthLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isAuthLoading]);

  return (
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md">
        <h1 className="text-xl uppercase text-center font-bold leading-tight tracking-tight md:text-2xl">
          QUÊN MẬT KHẨU?
        </h1>
        {authReducer.success && !isDelayedLoading && (
          <Alert variant="filled" severity="success" style={{ color: "white" }}>
            {authReducer.success}
          </Alert>
        )}
        {authReducer.error && !isDelayedLoading && (
          <Alert
            variant="filled"
            severity="error"
            className="flex items-center"
          >
            {authReducer.error}
          </Alert>
        )}
        <p className="text-center text-gray-600">
          Nhập địa chỉ email và chúng tôi sẽ gửi cho bạn hướng dẫn để khôi phục
          mật khẩu.
        </p>
        <form className="space-y-2" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email của bạn
            </label>
            <TextField
              label="Nhập email"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.errors.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email && formik.errors.email}
            />
          </div>
          <div className="space-y-4">
            <Button
              fullWidth
              variant="contained"
              sx={{ paddingY: 1 }}
              type="submit"
              loading={isDelayedLoading}
            >
              Tiếp tục
            </Button>
            <Button
              startIcon={<ArrowBackIosIcon />}
              onClick={() => navigate("/account/login")}
            >
              Quay lại
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
