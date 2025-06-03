import * as Yup from "yup";

export const createProgressReviewValidation = Yup.object({
  progressReviewTitle: Yup.string()
    .trim()
    .required("Tên tiêu đề đánh giá không được bỏ trống"),
  progressReviewContent: Yup.string().test(
    "not-empty",
    "Nội dung đánh giá không được bỏ trống",
    (value) => value && value.replace(/<(.|\n)*?>/g, "").trim() !== ""
  ),
  progressReviewFile: Yup.string().url("Đường dẫn file không hợp lệ"),
  isApproved: Yup.boolean().oneOf(
    [true, false],
    "Vui lòng chọn trạng thái đánh giá"
  ),
});
