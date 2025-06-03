import * as Yup from "yup";

export const createProgressReportValidation = Yup.object({
  progressReportTitle: Yup.string()
    .trim()
    .required("Tên tiêu đề báo cáo không được bỏ trống"),
  progressReportContent: Yup.string().test(
    "not-empty",
    "Nội dung báo cáo không được bỏ trống",
    (value) => value && value.replace(/<(.|\n)*?>/g, "").trim() !== ""
  ),
  progressReportFile: Yup.string().url("Đường dẫn file không hợp lệ"),
});
