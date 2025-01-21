import * as Yup from "yup";

export const loginFormValidation = Yup.object({
  email: Yup.string()
    .email("Email không đúng định dạng.")
    .required("Email không được bỏ trống."),
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống.")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
