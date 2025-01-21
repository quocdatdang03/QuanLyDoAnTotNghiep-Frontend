import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { uploadImageToCloudinary } from "../../util/UploadImageToCloudinary";
import { updateProfileFormValidation } from "./validation/updateProfileFormValidation";
import { updateUserProfileAction } from "../../redux/Auth/Action";

const FormUpdateProfile = () => {
  const { authReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(false);
  const isAuthLoading = authReducer.isLoading;

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: authReducer.user?.phoneNumber || "",
      address: authReducer.user?.address || "",
      image: authReducer.user?.image || "",
    },
    validationSchema: updateProfileFormValidation,
    onSubmit: (values) => {
      const userProfileData = {
        accountId: authReducer.user?.accountId,
        ...values,
      };

      const requestData = {
        userProfileData,
        navigate,
        isAuthLoading,
      };

      dispatch(updateUserProfileAction(requestData));
      console.log(requestData);
    },
  });

  return (
    <form className="space-y-2 md:space-y-3" onSubmit={formik.handleSubmit}>
      <div className="flex items-center gap-5">
        <div>
          <input
            accept="image/*"
            type="file"
            id="imageUploadInput"
            className="hidden"
            onChange={handleUploadImage}
          />
          <label className="inline-block relative" htmlFor="imageUploadInput">
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
        <div className="flex items-center flex-wrap gap-3">
          <div className="relative w-24 h-24 rounded overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={formik.values.image}
            />
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block mb-2 text-sm font-semibold"
        >
          Số điện thoại <span className="text-red-500">(*)</span>
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
            formik.errors.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.errors.phoneNumber && formik.errors.phoneNumber}
        />
      </div>
      <div>
        <label htmlFor="address" className="block mb-2 text-sm font-semibold">
          Địa chỉ <span className="text-red-500">(*)</span>
        </label>
        <TextField
          label="Nhập địa chỉ"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          type="text"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          error={formik.errors.address && Boolean(formik.errors.address)}
          helperText={formik.errors.address && formik.errors.address}
        />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          loading={isAuthLoading}
          variant="contained"
          sx={{ paddingY: 1 }}
          type="submit"
        >
          Lưu thay đổi
        </Button>
        <Button onClick={() => navigate("/user/profile")}>Quay lại</Button>
      </div>
    </form>
  );
};

export default FormUpdateProfile;
