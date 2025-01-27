import * as Yup from "yup";

export const teamRegisterFormValidation = Yup.object({
  teamName: Yup.string()
    .required("Tên nhóm không được bỏ trống.")
    .min(3, "Tên nhóm phải có ít nhất 3 ký tự."),
});
