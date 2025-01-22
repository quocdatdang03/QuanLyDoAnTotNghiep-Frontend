import * as Yup from "yup";

export const resetPasswordFormValidation = Yup.object({
  resetPasswordVerificationCode: Yup.string()
    .required("Mã xác thực không được bỏ trống")
    .matches(/^\d{6}$/, "Mã xác thực phải có đúng 6 chữ số"),
  newPassword: Yup.string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmNewPassword: Yup.string()
    .required("Nhập lại mật khẩu không được bỏ trống")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Mật khẩu và nhập lại mật khẩu không khớp"
    ),
});
