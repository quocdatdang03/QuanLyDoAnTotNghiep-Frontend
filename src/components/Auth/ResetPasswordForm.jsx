import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordFormValidation } from "./validation/resetPasswordFormValidation";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  clearAuthError,
  clearAuthSuccess,
  resetPasswordAction,
} from "../../redux/Auth/Action";

const initialValues = {
  resetPasswordVerificationCode: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordFormValidation,
    onSubmit: (values) => {
      const requestData = {
        resetPasswordData: {
          email: authReducer?.resetPasswordEmail,
          resetPasswordVerificationCode: values.resetPasswordVerificationCode,
          newPassword: values.newPassword,
        },
        navigate,
        isAuthLoading,
      };
      dispatch(resetPasswordAction(requestData));
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

  // handle close message success or error:
  useEffect(() => {
    let timer;
    if (authReducer.success) {
      timer = setTimeout(() => {
        dispatch(clearAuthSuccess());
      }, 5000);
    }
    if (authReducer.error) {
      timer = setTimeout(() => {
        dispatch(clearAuthError());
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [authReducer.success, authReducer.error, dispatch]);

  return (
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md">
        <h1 className="text-xl uppercase text-center font-bold leading-tight tracking-tight md:text-2xl">
          ĐẶT LẠI MẬT KHẨU?
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
        <form className="space-y-2" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="resetPasswordVerificationCode"
              className="block mb-2 text-sm font-medium"
            >
              Mã xác thực
            </label>
            <TextField
              label="Nhập mã xác thực"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="text"
              name="resetPasswordVerificationCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetPasswordVerificationCode}
              error={
                formik.errors.resetPasswordVerificationCode &&
                Boolean(formik.errors.resetPasswordVerificationCode)
              }
              helperText={
                formik.errors.resetPasswordVerificationCode &&
                formik.errors.resetPasswordVerificationCode
              }
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium"
            >
              Mật khẩu mới
            </label>
            <TextField
              label="Nhập mật khẩu mới"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type={showPassword ? "text" : "password"} // Toggle password visibility
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              error={formik.errors.newPassword}
              helperText={
                formik.errors.newPassword && formik.errors.newPassword
              }
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
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Nhập lại mật khẩu mới
            </label>
            <TextField
              label="Nhập lại mật khẩu mới"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
              name="confirmNewPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmNewPassword}
              error={formik.errors.confirmNewPassword}
              helperText={
                formik.errors.confirmNewPassword &&
                formik.errors.confirmNewPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              Đặt lại mật khẩu
            </Button>
            <Button
              startIcon={<ArrowBackIosIcon />}
              onClick={() => navigate("/account/forgot-password")}
            >
              Quay lại
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
