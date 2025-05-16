import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { uploadImageToCloudinary } from "../../../util/UploadImageToCloudinary";
import dayjs from "dayjs";
import { getAllClassesAction } from "../../../redux/Class/Action";
import { formCreateStudentAccountValidation } from "./validation/formCreateStudentAccountValidation";
import { createStudentAccountAction } from "../../../redux/Student/Action";
import AdminBreadCrumbs from "../AdminBreadCrumbs/AdminBreadCrumbs";

const FormCreateStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classReducer } = useSelector((store) => store);

  const [uploadImage, setUploadImage] = useState(false);
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);

  const handleUploadImage = async (e) => {
    setUploadImage(true);

    const imageData = e.target.files[0];
    const imageUrlFromCloudinary = await uploadImageToCloudinary(
      imageData,
      "User-Profile"
    );
    formik.setFieldValue("image", imageUrlFromCloudinary);

    setUploadImage(false);
  };

  // format type date time:
  const formatDate = (value) => {
    return dayjs(value).format("YYYY-MM-DD");
  };

  // handle create student:
  const formik = useFormik({
    initialValues: {
      studentCode: "",
      fullName: "",
      email: "",
      password: "dat03122003",
      dateOfBirth: null,
      phoneNumber: "",
      classId: "",
      address: "",
      gender: false,
      image: "",
    },
    validationSchema: formCreateStudentAccountValidation,
    onSubmit: (values) => {
      const requestData = {
        studentData: {
          ...values,
          dateOfBirth: formatDate(values.dateOfBirth),
          roleIds: [1],
          enable: true,
        },
        navigate,
        toast,
      };

      console.log(requestData);
      dispatch(createStudentAccountAction(requestData));
    },
  });

  // get all classes
  useEffect(() => {
    dispatch(getAllClassesAction);
  }, [dispatch]);

  //   // handle loading:
  //   useEffect(() => {
  //     if (isSchoolYearLoading) {
  //       setIsDelayedLoading(true);
  //     } else {
  //       const timer = setTimeout(() => {
  //         setIsDelayedLoading(false);
  //       }, 800);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [isSchoolYearLoading]);

  return (
    <>
      {/* Breadcrumbs */}
      <AdminBreadCrumbs
        links={[
          {
            label: "Quản lý tài khoản sinh viên",
            href: "/admin/manage-student",
          },
          {
            label: "Thêm tài khoản",
            href: "/admin/manage-student/create",
          },
        ]}
      />
      <Paper className="p-5">
        <h2 className="text-center uppercase text-xl font-bold mb-5">
          Thêm tài khoản sinh viên
        </h2>
        <div>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="flex items-center gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Ảnh đại diện
                </label>
                <input
                  accept="image/*"
                  type="file"
                  id="imageUploadInput"
                  className="hidden"
                  onChange={handleUploadImage}
                />
                <label
                  className="inline-block relative"
                  htmlFor="imageUploadInput"
                >
                  <span className="w-24 h-24 flex items-center justify-center border border-gray-500 rounded cursor-pointer">
                    <AddAPhotoIcon fontSize="medium" />
                  </span>
                  {uploadImage && (
                    <div className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                {formik.errors.image && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.image}
                  </div>
                )}
              </div>
              {formik.values.image && (
                <div className="flex items-center flex-wrap gap-3">
                  <div className="relative w-24 h-24 rounded overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={formik.values.image}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="studentCode"
                  className="block mb-2 text-sm font-medium"
                >
                  Mã sinh viên <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập mã sinh viên"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="studentCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.studentCode}
                  error={
                    formik.errors.studentCode &&
                    Boolean(formik.errors.studentCode)
                  }
                  helperText={
                    formik.errors.studentCode && formik.errors.studentCode
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium"
                >
                  Họ tên sinh viên <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập họ tên sinh viên"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="fullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  error={
                    formik.errors.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.errors.fullName && formik.errors.fullName}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập email"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.errors.email && Boolean(formik.errors.email)}
                  helperText={formik.errors.email && formik.errors.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Mật khẩu <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập mật khẩu"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password.trim()}
                  error={
                    formik.errors.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.errors.password && formik.errors.password}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <label className="text-sm block font-medium mb-2">
                    Ngày sinh <b className="text-red-600">(*)</b>
                  </label>
                  <DatePicker
                    className="w-full"
                    name="dateOfBirth"
                    format="DD/MM/YYYY"
                    value={formik.values.dateOfBirth || null}
                    onChange={(newValue) =>
                      formik.setFieldValue("dateOfBirth", newValue || null)
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <p className="text-[12px] text-red-500 mt-[3px] mx-[14px]">
                      {formik.errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </LocalizationProvider>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium"
                >
                  Số điện thoại <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập số điện thoại"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  error={
                    formik.errors.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.errors.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium"
              >
                Địa chỉ <b className="text-red-600">(*)</b>
              </label>
              <TextField
                label="Nhập địa chỉ"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="address"
                multiline
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={formik.errors.address && Boolean(formik.errors.address)}
                helperText={formik.errors.address && formik.errors.address}
              />
            </div>

            <div>
              <label
                htmlFor="facultyId"
                className="block mb-2 text-sm font-medium"
              >
                Lớp sinh hoạt <b className="text-red-600">(*)</b>
              </label>
              <FormControl
                fullWidth
                error={Boolean(formik.errors.classId && formik.touched.classId)}
              >
                <InputLabel> Lớp sinh hoạt</InputLabel>
                <Select
                  value={formik.values.classId}
                  label="Lớp sinh hoạt"
                  name="classId"
                  onChange={formik.handleChange}
                >
                  {classReducer.classes?.map((item) => {
                    return (
                      <MenuItem key={item.classId} value={item.classId}>
                        {item.className}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.errors.classId && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.classId}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Giới tính <b className="text-red-600">(*)</b>
              </label>
              <RadioGroup
                row
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio color="primary" />}
                  label="Nam "
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="primary" />}
                  label="Nữ"
                />
              </RadioGroup>
              {formik.errors.gender && (
                <p className="text-red-500 text-sm">{formik.errors.gender}</p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <Button
                variant="contained"
                sx={{ paddingY: 1 }}
                type="submit"
                className="w-[50%] md:w-[30%]"
                //   loading={isDelayedLoading}
              >
                Thêm mới
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default FormCreateStudent;
