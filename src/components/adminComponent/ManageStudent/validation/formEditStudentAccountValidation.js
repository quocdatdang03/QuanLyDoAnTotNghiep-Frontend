import * as Yup from "yup";

export const formEditStudentAccountValidation = Yup.object({
  studentCode: Yup.string()
    .required("Mã sinh viên không được bỏ trống")
    .matches(/^\d{14}$/, "Mã sinh viên không hợp lệ"),
  fullName: Yup.string()
    .required("Họ tên sinh viên không được bỏ trống")
    .min(2, "Họ tên phải chứa ít nhất 2 ký tự"),
  email: Yup.string()
    // .email("Email không hợp lệ")
    .required("Email không được bỏ trống")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email phải đúng định dạng, ví dụ: example@domain.com"
    ),
  password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  dateOfBirth: Yup.date()
    .nullable()
    .required("Ngày sinh không được bỏ trống")
    .max(new Date(), "Ngày sinh không hợp lệ"),
  phoneNumber: Yup.string()
    .required("Số điện thoại không được bỏ trống")
    .matches(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ"),
  classId: Yup.string().required("Lớp sinh hoạt không được bỏ trống"),
  address: Yup.string().required("Địa chỉ không được bỏ trống"),
  gender: Yup.boolean().required("Giới tính không được bỏ trống"),
  mage: Yup.string()
    .nullable()
    .url("Ảnh đại diện phải là một đường dẫn hợp lệ"),
});
