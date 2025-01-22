import * as Yup from "yup";

export const forgotPasswordFormValidation = Yup.object({
  email: Yup.string()
    .email("Email không đúng định dạng.")
    .required("Email không được bỏ trống."),
});
