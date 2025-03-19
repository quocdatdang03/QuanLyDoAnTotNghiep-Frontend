import * as Yup from "yup";

export const createProgressReportValidation = Yup.object({
  progressReportName: Yup.string().required(
    "Tên tiêu đề báo cáo không được bỏ trống"
  ),
  progressReportContent: Yup.string().required(
    "Nội dung báo cáo không được bỏ trống"
  ),
  progressReportFile: Yup.string().url("Đường dẫn file không hợp lệ"),
});
