import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { uploadFileToCloudinary } from "../../../util/UploadFileToCloudinary";
import StageDetail from "./StageDetail";

const StageManager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

  const handleOpenMenuOptionFile = (event, currentFile) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedFile(currentFile);
  };
  const handleCloseMenuOptionFile = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  // handle upload file to cloudinary:
  const handleUploadFile = async (e) => {
    setUploadFile(true);

    const fileData = e.target.files[0];

    try {
      const fileUrlFromCloudinary = await uploadFileToCloudinary(
        fileData,
        "Stage-file"
      );

      const progressReviewFileData = {
        nameFile: fileData.name,
        pathFile: fileUrlFromCloudinary,
      };

      console.log(progressReviewFileData);

      formik.setFieldValue("progressReviewFiles", [
        ...formik.values.progressReviewFiles,
        progressReviewFileData,
      ]);

      setUploadFile(false);
    } catch (error) {
      toast.error("Xảy ra lỗi khi upload file");
      setUploadFile(false);
    }
  };

  // handle delete current uploaded file:
  const handleDeleteCurrentUploadedFile = (e, currentFile) => {
    const progressReviewFilesAfterDelete =
      formik.values.progressReviewFiles.filter(
        (item) => item.pathFile !== currentFile.pathFile
      );

    formik.setFieldValue("progressReviewFiles", progressReviewFilesAfterDelete);

    handleCloseMenuOptionFile(e);
  };

  // handle create progressReview
  const formik = useFormik({
    initialValues: {
      progressReviewName: "",
      progressReviewContent: "",
      progressReviewFiles: [],
      progressReviewStatus: false,
    },
    // validationSchema: createProgressReviewValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        progressReviewData: {
          ...values,
        },
        toast,
      };

      // dispatch(createprogressReviewAction(requestData));

      resetForm();
    },
  });

  // handle show view file:
  const handleShowViewFile = (e, pathFile) => {
    e.stopPropagation();
    window.open(`https://docs.google.com/gview?url=${pathFile}`, "_blank");
    handleCloseMenuOptionFile(e);
  };

  // handle download file:
  const handleDownloadFile = (e, pathFile) => {
    e.stopPropagation();
    window.location.href = pathFile;
    handleCloseMenuOptionFile(e);
  };

  // handle delete file :
  const handleDeleteFile = (e, currentFile) => {
    e.stopPropagation();

    const requestData = {
      progressReviewFileId: currentFile.progressReviewFileId,
      toast,
    };

    //   dispatch(deleteProjectFileByIdAction(requestData));

    handleCloseMenuOptionFile(e);
  };

  return (
    <>
      <Container className="my-10 py-10" component={Paper}>
        <Typography
          color="primary"
          className="text-center uppercase"
          component="h2"
          sx={{ fontSize: 35 }}
        >
          QUẢN LÝ GIAI ĐOẠN
        </Typography>

        {/* FORM CREATE STAGE */}
        <div>
          <h1 className="border-[#0355d2] border-b-[2px] text-[#0355d2] font-bold mb-5 mt-6 pb-3 uppercase">
            Khởi tạo giai đoạn cho đồ án
          </h1>
          <form
            className="md:space-y-6 space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="stageName"
                  className="text-sm block font-medium mb-2"
                >
                  Tên giai đoạn <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập tên giai đoạn"
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="stageName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stageName}
                  error={
                    formik.errors.stageName && Boolean(formik.errors.stageName)
                  }
                  helperText={
                    formik.errors.stageName && formik.errors.stageName
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="stageTitle"
                  className="text-sm block font-medium mb-2"
                >
                  Tiêu đề giai đoạn <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập tiêu đề giai đoạn"
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="stageTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stageTitle}
                  error={
                    formik.errors.stageTitle &&
                    Boolean(formik.errors.stageTitle)
                  }
                  helperText={
                    formik.errors.stageTitle && formik.errors.stageTitle
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="stageContent"
                  className="text-sm block font-medium mb-2"
                >
                  Nội dung giai đoạn <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập nội dung giai đoạn"
                  variant="outlined"
                  fullWidth
                  rows={4}
                  multiline
                  type="text"
                  name="stageContent"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stageContent}
                  error={
                    formik.errors.stageContent &&
                    Boolean(formik.errors.stageContent)
                  }
                  helperText={
                    formik.errors.stageContent && formik.errors.stageContent
                  }
                />
              </div>
              {/* <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="startTime"
                    className="text-sm block font-medium mb-2"
                  >
                    Thời gian bắt đầu <b className="text-red-600">(*)</b>
                  </label>
                  <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="endTime"
                    className="text-sm block font-medium mb-2"
                  >
                    Thời gian kết thúc <b className="text-red-600">(*)</b>
                  </label>
                  <input
                    type="datetime-local"
                    id="endTime"
                    name="endTime"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    required
                  />
                </div>
              </div> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="grid grid-cols-2 gap-5">
                  {/* start time */}
                  <div>
                    <label className="text-sm block font-medium mb-2">
                      Thời gian bắt đầu <b className="text-red-600">(*)</b>
                    </label>
                    <DateTimePicker
                      className="w-full"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </div>

                  {/* end time */}
                  <div>
                    <label className="text-sm block font-medium mb-2">
                      Thời gian kết thúc <b className="text-red-600">(*)</b>
                    </label>
                    <DateTimePicker
                      className="w-full"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </div>
                </div>
              </LocalizationProvider>

              <div>
                <label
                  htmlFor="progressReviewFile"
                  className="text-sm block font-medium mb-2"
                >
                  Tệp đính kèm
                </label>
                <div>
                  <label className="flex flex-col border-2 border-dashed border-gray-400 justify-center p-5 rounded-lg text-center w-full cursor-pointer hover:bg-gray-100 items-center transition">
                    {uploadFile ? (
                      <div className="flex gap-3 items-center">
                        Đang upload File <CircularProgress size={30} />
                      </div>
                    ) : (
                      <>
                        <CloudUploadIcon color="disabled" />
                        <span className="text-gray-600">
                          Chọn file để tải lên
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUploadFile}
                    />
                  </label>
                </div>
              </div>

              {/* Uploaded File */}
              <div className="mt-5 space-y-3">
                {formik.values.progressReviewFiles?.map((item, index) => (
                  <div
                    className="flex bg-blue-100 border border-gray-300 justify-between p-1 rounded-md cursor-pointer hover:bg-blue-200 items-center lg:w-[70%] ml-5 transition-all"
                    onClick={(e) => handleShowViewFile(e, item.pathFile)}
                    key={item.progressReviewFileId}
                  >
                    <div className="flex gap-3 items-center">
                      <ArticleOutlinedIcon fontSize="medium" />
                      <p className="text-sm">{item.nameFile}</p>
                    </div>
                    <IconButton
                      onClick={(event) => handleOpenMenuOptionFile(event, item)}
                    >
                      <MoreVertOutlinedIcon fontSize="small" />
                    </IconButton>

                    {/* MENU OPTION FILE */}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={(e) => handleCloseMenuOptionFile(e)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                    >
                      <MenuItem
                        onClick={(e) =>
                          handleShowViewFile(e, selectedFile?.pathFile)
                        }
                        className="hover:text-blue-500 transition-all"
                      >
                        <RemoveRedEyeOutlinedIcon />
                        <span className="pl-2">Xem chi tiết</span>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) =>
                          handleDownloadFile(e, selectedFile?.pathFile)
                        }
                        className="hover:text-green-500 transition-all"
                      >
                        <FileDownloadOutlinedIcon />
                        <span className="pl-2">Tải xuống</span>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) =>
                          handleDeleteCurrentUploadedFile(e, selectedFile)
                        }
                        className="hover:text-red-500 transition-all"
                      >
                        <DeleteOutlineOutlinedIcon />
                        <span className="pl-2">Xóa</span>
                      </MenuItem>
                    </Menu>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <Button
                className="w-[50%] md:w-[30%]"
                variant="contained"
                sx={{ paddingY: 1 }}
                type="submit"
                // loading={isDelayedLoading}
              >
                Tạo giai đoạn
              </Button>
            </div>
          </form>
        </div>

        {/* LIST STAGE */}
        <div className="mt-10">
          <h1 className="border-[#0355d2] border-b-[2px] text-[#0355d2] font-bold mb-5 mt-6 pb-3 uppercase">
            Danh sách giai đoạn
          </h1>
          <div className="space-y-5">
            {[1, 1, 1].map((item, index) => (
              <StageDetail key={index} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default StageManager;
