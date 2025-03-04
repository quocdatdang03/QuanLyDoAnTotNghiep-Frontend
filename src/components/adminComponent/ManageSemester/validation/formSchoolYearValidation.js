import * as Yup from "yup";

export const formSchoolYearValidation = Yup.object({
  startYear: Yup.number().required("Năm bắt đầu không được bỏ trống"),
  endYear: Yup.number()
    .required("Năm kết thúc không được bỏ trống")
    .test(
      "greaterThan",
      "Năm kết thúc phải lớn hơn năm bắt đầu",
      function (value) {
        return value > this.parent.startYear;
      }
    ),
});
