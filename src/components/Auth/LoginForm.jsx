import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import {
//   clearAuthError,
//   loginUserAction,
//   resendCodeAction,
// } from "../../Redux/Auth/Action";
import { loginFormValidation } from "./validation/loginFormValidation";
import { clearAuthError, loginUserAction } from "../../redux/Auth/Action";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginFormValidation,
    onSubmit: (values) => {
      const requestData = {
        userData: values,
        navigate,
        isAuthLoading,
      };
      dispatch(loginUserAction(requestData));
      console.log(values);
    },
  });

  useEffect(() => {
    return () => {
      if (authReducer.error) {
        dispatch(clearAuthError());
      }
    };
  }, [dispatch, authReducer.error]);

  // const handleSendVerificationCode = () => {
  //   dispatch(resendCodeAction({ email: formik.values.email }));
  //   navigate(`/account/verify-email?email=${formik.values.email}`);
  // };

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
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
          ĐĂNG NHẬP HỆ THỐNG
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
            {/* {authReducer.error ===
              "Account not verified, Please verify your account" && (
              <>
                . Click{" "}
                <span
                  className="font-bold underline cursor-pointer"
                  onClick={handleSendVerificationCode}
                >
                  here
                </span>{" "}
                to verify your email
              </>
            )} */}
          </Alert>
        )}
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
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
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Mật khẩu của bạn
            </label>
            <TextField
              label="Nhập mật khẩu"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type={showPassword ? "text" : "password"} // Toggle password visibility
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.errors.password}
              helperText={formik.errors.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            sx={{ paddingY: 1 }}
            type="submit"
            loading={isDelayedLoading}
          >
            Đăng Nhập
          </Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Bạn chưa có tài khoản?
            <span
              onClick={() => navigate("/account/register")}
              className="font-semibold text-primary-600 hover:underline cursor-pointer pl-1"
            >
              Đăng ký
            </span>
          </p>
          <p className="text-center">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/account/forgot-password")}
            >
              Quên mật khẩu?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
