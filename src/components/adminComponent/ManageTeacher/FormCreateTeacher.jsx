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
import { getAllFacultiesAction } from "../../../redux/Faculty/Action";
import { getAllDegreesAction } from "../../../redux/Degree/Action";
import { uploadImageToCloudinary } from "../../../util/UploadImageToCloudinary";
import { formTeacherValidation } from "./validation/formTeacherValidation";
import dayjs from "dayjs";
import { createTeacherAction } from "../../../redux/Teacher/Action";

const FormCreateTeacher = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { facultyReducer, degreeReducer } = useSelector((store) => store);

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

  // handle create teacher:
  const formik = useFormik({
    initialValues: {
      teacherCode: "",
      fullName: "",
      email: "",
      password: "dat03122003",
      dateOfBirth: null,
      phoneNumber: "",
      facultyId: "",
      degreeId: "",
      address: "",
      gender: false,
      isLeader: false,
      image: "",
    },
    validationSchema: formTeacherValidation,
    onSubmit: (values) => {
      const requestData = {
        teacherData: {
          ...values,
          dateOfBirth: formatDate(values.dateOfBirth),
          roleIds: [2],
          enable: true,
        },
        navigate,
        toast,
      };

      console.log(requestData);
      dispatch(createTeacherAction(requestData));
    },
  });

  // get all degrees and get all faculties:
  useEffect(() => {
    dispatch(getAllFacultiesAction());
    dispatch(getAllDegreesAction());
  }, []);

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
      <div className="mb-5">
        <Button
          variant="outlined"
          color="info"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/manage-teacher")}
        >
          Quay lại
        </Button>
      </div>
      <Paper className="p-5">
        <h2 className="text-center uppercase text-xl font-bold mb-5">
          Thêm giảng viên
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
                  htmlFor="teacherCode"
                  className="block mb-2 text-sm font-medium"
                >
                  Mã giảng viên
                </label>
                <TextField
                  label="Nhập mã giảng viên"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="teacherCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.teacherCode}
                  error={
                    formik.errors.teacherCode &&
                    Boolean(formik.errors.teacherCode)
                  }
                  helperText={
                    formik.errors.teacherCode && formik.errors.teacherCode
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium"
                >
                  Họ tên giảng viên
                </label>
                <TextField
                  label="Nhập họ tên giảng viên"
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
                  Email
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
                  Mật khẩu
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
                  value={formik.values.password}
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
                  Số điện thoại
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
                Địa chỉ
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

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="facultyId"
                  className="block mb-2 text-sm font-medium"
                >
                  Khoa
                </label>
                <FormControl
                  fullWidth
                  error={Boolean(
                    formik.errors.facultyId && formik.touched.facultyId
                  )}
                >
                  <InputLabel>Khoa</InputLabel>
                  <Select
                    value={formik.values.facultyId}
                    label="Khoa"
                    name="facultyId"
                    onChange={formik.handleChange}
                  >
                    {facultyReducer.faculties?.map((item) => {
                      return (
                        <MenuItem key={item.facultyId} value={item.facultyId}>
                          {item.facultyName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.errors.facultyId && (
                    <FormHelperText sx={{ color: "red" }}>
                      {formik.errors.facultyId}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div>
                <label
                  htmlFor="degreeId"
                  className="block mb-2 text-sm font-medium"
                >
                  Học vị
                </label>
                <FormControl
                  fullWidth
                  error={Boolean(
                    formik.errors.degreeId && formik.touched.degreeId
                  )}
                >
                  <InputLabel>Học vị</InputLabel>
                  <Select
                    value={formik.values.degreeId}
                    label="Học vị"
                    name="degreeId"
                    onChange={formik.handleChange}
                  >
                    {degreeReducer.degrees?.map((item) => {
                      return (
                        <MenuItem key={item.degreeId} value={item.degreeId}>
                          {item.degreeName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.errors.degreeId && (
                    <FormHelperText sx={{ color: "red" }}>
                      {formik.errors.degreeId}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
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
            <div>
              <FormControlLabel
                control={<Checkbox />}
                name="isLeader"
                checked={formik.values.isLeader}
                onChange={formik.handleChange}
                label="Là trưởng bộ môn"
                className="select-none"
              />
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

export default FormCreateTeacher;
