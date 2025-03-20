import * as Yup from "yup";

export const createProgressReviewValidation = Yup.object({
  progressReviewName: Yup.string().required(
    "Tên tiêu đề đánh giá không được bỏ trống"
  ),
  progressReviewContent: Yup.string().required(
    "Nội dung đánh giá không được bỏ trống"
  ),
  progressReviewFile: Yup.string().url("Đường dẫn file không hợp lệ"),
  progressReviewStatus: Yup.boolean().oneOf(
    [true, false],
    "Vui lòng chọn trạng thái đánh giá"
  ),
});
