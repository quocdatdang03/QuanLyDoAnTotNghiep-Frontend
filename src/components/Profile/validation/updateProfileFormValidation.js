import * as Yup from "yup";

export const updateProfileFormValidation = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại không được bỏ trống."),
  address: Yup.string().required("Địa chỉ không được bỏ trống."),
  image: Yup.string().url("Hình ảnh có đường dẫn không hợp lệ."),
});
