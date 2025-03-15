import * as Yup from "yup";

export const projectRegisterValidation = Yup.object({
  projectName: Yup.string().required("Tên đề tài không được bỏ trống"),
  projectContent: Yup.string().required("Nội dung đề tài không được bỏ trống"),
  projectFile: Yup.string().url("Đường dẫn file không hợp lệ"),
});
