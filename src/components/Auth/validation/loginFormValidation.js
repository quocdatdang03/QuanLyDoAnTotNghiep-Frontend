import * as Yup from "yup";

export const loginFormValidation = Yup.object({
  code: Yup.string().required("Tài khoản không được bỏ trống."),
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống.")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
