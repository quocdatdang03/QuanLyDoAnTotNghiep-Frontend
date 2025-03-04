import * as Yup from "yup";

export const formSemesterValidation = Yup.object({
  semesterName: Yup.number().required("Học kỳ không được bỏ trống"),
  schoolYearId: Yup.string().required("Năm học không được bỏ trống"),
});
