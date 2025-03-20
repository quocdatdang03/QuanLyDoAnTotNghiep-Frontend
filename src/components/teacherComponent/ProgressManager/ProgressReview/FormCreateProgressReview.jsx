import {
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileToCloudinary } from "../../../../util/UploadFileToCloudinary";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import defaultAvatar from "../../../../assets/images/default-avatar.png";
import { createProgressReviewValidation } from "./validation/createProgressReviewValidation";

const FormCreateProjectReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { authReducer, projectReducer } = useSelector((store) => store);
  const projectStatusId = projectReducer.project?.projectStatus.projectStatusId;

  const [anchorEl, setAnchorEl] = React.useState(null);

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
        "ProgressReview-file"
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
      studentCode: authReducer.user?.code,
    },
    validationSchema: createProgressReviewValidation,
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
    <Container className="my-10 py-10" component={Paper}>
      <Button
        variant="outlined"
        color="info"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/teacher/progress/manage")}
      >
        Quay lại trang tiến độ
      </Button>
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30 }}
      >
        Đánh giá tiến độ
      </Typography>

      {/* PROGRESS REPORT OF STUDENT INFO */}
      <div>
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5 flex items-center">
          <span className="pr-2">Nội dung báo cáo tiến độ của sinh viên</span>
          <Chip label="Giai đoạn 1" color="primary" size="small" />
        </h1>
        <div className="flex gap-5">
          <img
            src={defaultAvatar}
            className="w-10 h-10 rounded-full object-cover object-center"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-gray-600">Đặng Quốc Đạt</p>
                <Chip
                  label="Chưa duyệt"
                  size="small"
                  color={false ? "success" : "error"}
                />
              </div>
            </div>
            <Chip
              sx={{ borderRadius: 1 }}
              label="Giai đoạn 1"
              size="small"
              color="primary"
            />
            <p>
              <b className="pr-2">Tiêu đề:</b>
              <span>Tiêu đề của báo cáo</span>
            </p>
            <p>
              <b className="pr-2">Nội dung:</b>
              <span className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                temporibus suscipit consectetur, quidem asperiores eligendi
                facilis accusantium ex non officia nulla totam laudantium itaque
                quis, aspernatur dolorem. Excepturi, dolorem deserunt!
              </span>
            </p>

            {/* Progress Report File */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <h4 className="font-medium text-gray-800 mb-2">
                📂 Danh sách file:
              </h4>
              {true ? (
                <ul className="space-y-2">
                  {[1, 1].map((file, index) => (
                    <div
                      className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                      // onClick={(e) => handleShowViewFile(e, file.pathFile)}
                      // key={file.projectFileId}
                      key={index}
                    >
                      <div className="flex items-center gap-3">
                        <ArticleOutlinedIcon fontSize="medium" />
                        <p className="text-sm">fielfilfoefl.docx</p>
                      </div>
                      <IconButton
                      // onClick={(event) =>
                      //   handleOpenMenuOptionFile(event, file)
                      // }
                      >
                        <MoreVertOutlinedIcon fontSize="small" />
                      </IconButton>

                      {/* MENU OPTION FILE */}
                      {/* <Menu
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
                            {projectStatusId === 1 && (
                              <MenuItem
                                onClick={(e) =>
                                  handleDeleteFile(e, selectedFile)
                                }
                                className="hover:text-red-500 transition-all"
                              >
                                <DeleteOutlineOutlinedIcon />
                                <span className="pl-2">Xóa</span>
                              </MenuItem>
                            )}
                          </Menu> */}
                    </div>
                  ))}
                </ul>
              ) : (
                <p className="italic text-gray-500 text-center">
                  Danh sách file trống
                </p>
              )}
            </div>

            <p className="text-gray-500 italic text-right">
              16/03/2025, 15:06:27
            </p>
          </div>
        </div>
      </div>

      {/* FORM CREATE PROGRESS REVIEW */}
      <>
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5 flex items-center">
          <span className="pr-2">Đánh giá tiến độ</span>
          <Chip label="Giai đoạn 1" color="primary" size="small" />
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="progressReviewName"
                className="block mb-2 text-sm font-medium"
              >
                Tiêu đề đánh giá <b className="text-red-600">(*)</b>
              </label>
              <TextField
                label="Nhập tiêu đề đánh giá"
                variant="outlined"
                fullWidth
                type="text"
                name="progressReviewName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.progressReviewName}
                error={
                  formik.errors.progressReviewName &&
                  Boolean(formik.errors.progressReviewName)
                }
                helperText={
                  formik.errors.progressReviewName &&
                  formik.errors.progressReviewName
                }
              />
            </div>
            <div>
              <label
                htmlFor="progressReviewContent"
                className="block mb-2 text-sm font-medium"
              >
                Nội dung đánh giá <b className="text-red-600">(*)</b>
              </label>
              <TextField
                label="Nhập nội dung đánh giá"
                variant="outlined"
                fullWidth
                rows={4}
                multiline
                type="text"
                name="progressReviewContent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.progressReviewContent}
                error={
                  formik.errors.progressReviewContent &&
                  Boolean(formik.errors.progressReviewContent)
                }
                helperText={
                  formik.errors.progressReviewContent &&
                  formik.errors.progressReviewContent
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Trạng thái đánh giá <b className="text-red-600">(*)</b>
              </label>
              <RadioGroup
                row
                name="progressReviewStatus"
                value={formik.values.progressReviewStatus}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="success" />}
                  label="Duyệt"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="error" />}
                  label="Không duyệt"
                />
              </RadioGroup>
              {formik.errors.progressReviewStatus && (
                <p className="text-red-500 text-sm">
                  {formik.errors.progressReviewStatus}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="progressReviewFile"
                className="block mb-2 text-sm font-medium"
              >
                Tệp đính kèm
              </label>
              <div>
                <label className=" flex flex-col items-center justify-center w-full cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-5 text-center hover:bg-gray-100 transition">
                  {uploadFile ? (
                    <div className="flex items-center gap-3">
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
            <div className="space-y-3 mt-5">
              {formik.values.progressReviewFiles?.map((item, index) => (
                <div
                  className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                  onClick={(e) => handleShowViewFile(e, item.pathFile)}
                  key={item.progressReviewFileId}
                >
                  <div className="flex items-center gap-3">
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
              className="w-[30%]"
              variant="contained"
              sx={{ paddingY: 1 }}
              type="submit"
              // loading={isDelayedLoading}
            >
              Gửi đánh giá
            </Button>
          </div>
        </form>
      </>
    </Container>
  );
};

export default FormCreateProjectReview;
