import * as Yup from "yup";

export const formNotificationValidation = Yup.object({
  notificationTitle: Yup.string().required(
    "Tên tiêu đề thông báo không được bỏ trống"
  ),
  notificationContent: Yup.string().required(
    "Nội dung thông báo không được bỏ trống"
  ),
});
