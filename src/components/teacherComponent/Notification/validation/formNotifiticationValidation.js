import * as Yup from "yup";

export const formNotificationValidation = Yup.object({
  notificationTitle: Yup.string()
    .trim()
    .required("Tên tiêu đề thông báo không được bỏ trống"),
  notificationContent: Yup.string().test(
    "not-empty",
    "Nội dung không được bỏ trống",
    (value) => value && value.replace(/<(.|\n)*?>/g, "").trim() !== ""
  ),
});
