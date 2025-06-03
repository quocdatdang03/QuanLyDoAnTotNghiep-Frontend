import * as Yup from "yup";

export const createStageValidation = Yup.object({
  stageName: Yup.string().trim().required("Tên giai đoạn không được bỏ trống"),
  stageTitle: Yup.string()
    .trim()
    .required("Tên tiêu đề giai đoạn không được bỏ trống"),
  stageContent: Yup.string().test(
    "not-empty",
    "Nội dung giai đoạn không được bỏ trống",
    (value) => value && value.replace(/<(.|\n)*?>/g, "").trim() !== ""
  ),
  stageFile: Yup.string().url("Đường dẫn file không hợp lệ"),
  startDate: Yup.date()
    .nullable()
    .typeError("Thời gian bắt đầu không hợp lệ")
    .required("Thời gian bắt đầu không được bỏ trống"),

  endDate: Yup.date()
    .nullable()
    .typeError("Thời gian kết thúc không hợp lệ")
    .required("Thời gian kết thúc không được bỏ trống")
    .min(Yup.ref("startDate"), "Thời gian kết thúc phải sau thời gian bắt đầu"),
});
