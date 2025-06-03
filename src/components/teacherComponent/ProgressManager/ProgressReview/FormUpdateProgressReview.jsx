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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileToCloudinary } from "../../../../util/UploadFileToCloudinary";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import defaultAvatar from "../../../../assets/images/default-avatar.png";
import { createProgressReviewValidation } from "./validation/createProgressReviewValidation";
import {
  getProgressReportByIdAction,
  getProgressReviewByIdAction,
  getProjectByIdAction,
  updateProgressReviewAction,
} from "../../../../redux/InstructorProgress/Action";
import CustomBreadCrumb from "../../../BreadCrumb/CustomBreadCrumb";
import ReactQuill from "react-quill";

const FormUpdateProgressReview = () => {
  const { progressReportId, projectId, progressReviewId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadFile, setUploadFile] = useState(false);

  // for progressReportFile
  const [anchorElProgressReportFile, setAnchorElProgressReportFile] =
    useState(null);
  const [selectedProgressReportFile, setSelectedProgressReportFile] =
    useState(null);

  // for progressReviewFile
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { instructorProgressReducer } = useSelector((store) => store);

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

  // handle update progressReview
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      progressReviewId:
        instructorProgressReducer.progressReview?.progressReviewId,
      progressReviewTitle:
        instructorProgressReducer.progressReview?.progressReviewTitle || "",
      progressReviewContent:
        instructorProgressReducer.progressReview?.progressReviewContent || "",
      progressReviewFiles:
        instructorProgressReducer.progressReview?.progressReviewFiles || [],
      isApproved: instructorProgressReducer.progressReview?.approved || false,
    },
    validationSchema: createProgressReviewValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        progressReviewData: {
          ...values,
        },
        projectId: instructorProgressReducer.project?.projectId,
        toast,
        navigate,
      };

      console.log(requestData);

      dispatch(updateProgressReviewAction(requestData));

      resetForm();
    },
  });

  // get project info for getting student of that project
  useEffect(() => {
    const requestData = {
      projectId: projectId,
    };

    dispatch(getProjectByIdAction(requestData));
  }, [projectId]);

  // get progressReport info:
  useEffect(() => {
    const requestData = {
      progressReportId,
    };

    dispatch(getProgressReportByIdAction(requestData));
  }, [progressReportId]);

  // get progressReview info:
  useEffect(() => {
    const requestData = {
      progressReviewId,
    };

    dispatch(getProgressReviewByIdAction(requestData));
  }, [progressReviewId]);

  // ++++++++++++++++++++++++++++++ START LOGIC CODE RELATED FILE:

  // FOR PROGRESS REPORT FILE:
  const handleOpenMenuOptionProgressReportFile = (event, currentFile) => {
    event.stopPropagation();
    setAnchorElProgressReportFile(event.currentTarget);
    setSelectedProgressReportFile(currentFile);
  };
  const handleCloseMenuOptionProgressReportFile = (e) => {
    e.stopPropagation();
    setAnchorElProgressReportFile(null);
    setSelectedProgressReportFile(null);
  };

  // FOR PROGRESS REVIEW FILE:
  const handleOpenMenuOptionFile = (event, currentFile) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedFile(currentFile);
  };
  const handleCloseMenuOptionFile = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
    setSelectedFile(null);
  };

  // handle show view file:
  const handleShowViewFile = (e, pathFile) => {
    e.stopPropagation();

    const isOfficeFile = /\.(doc?|docx?|xlsx?|pptx?)$/i.test(pathFile); // office file
    const isPdfFile = /\.pdf$/i.test(pathFile); // pdf file

    if (isOfficeFile) {
      window.open(
        `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(pathFile)}`,
        "_blank"
      );
    } else if (isPdfFile) {
      // PDF thì mở trực tiếp
      window.open(pathFile, "_blank");
    } else {
      // Ảnh hoặc các file khác
      window.open(pathFile, "_blank");
    }

    handleCloseMenuOptionFile(e);
    handleCloseMenuOptionProgressReportFile(e);
  };

  // handle download file:
  const handleDownloadFile = (e, pathFile, nameFile) => {
    e.stopPropagation();

    // ép file về dạng download được (với Cloudinary ảnh)
    const modifiedUrl = pathFile.includes("/upload/")
      ? pathFile.replace("/upload/", "/upload/fl_attachment/")
      : pathFile;

    const link = document.createElement("a");
    link.href = modifiedUrl;
    link.download = nameFile; // Tên file khi tải xuống
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleCloseMenuOptionFile(e);
    handleCloseMenuOptionProgressReportFile(e);
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

  // ++++++++++++++++++++++++++++++ END LOGIC CODE RELATED FILE:
  return (
    <Container className="my-10 py-10" component={Paper}>
      {/* Breadcrumbs */}
      <CustomBreadCrumb
        links={[
          { label: "Quản lý tiến độ", href: "/teacher/progress/manage" },
          {
            label: "Chi tiết tiến độ của sinh viên",
            href: `/teacher/progress/detail/project/${projectId}`,
          },
          {
            label: "Chỉnh sửa đánh giá tiến độ",
            href: `/teacher/progress/${progressReportId}/project/${projectId}/review/${progressReviewId}/update`,
          },
        ]}
      />
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
          <Chip
            label={instructorProgressReducer.progressReport?.stage.stageName}
            color="primary"
            size="small"
          />
        </h1>
        <div className="flex gap-5">
          <img
            src={
              instructorProgressReducer.project?.student.image || defaultAvatar
            }
            className="w-10 h-10 rounded-full object-cover object-center"
          />
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-gray-600">
                  {instructorProgressReducer.project?.student.fullName}
                </p>
                <Chip
                  label={
                    instructorProgressReducer.progressReport?.approved
                      ? "Đã duyệt"
                      : "Chưa duyệt"
                  }
                  size="small"
                  color={
                    instructorProgressReducer.progressReport?.approved
                      ? "success"
                      : "error"
                  }
                />
              </div>
            </div>
            <Chip
              sx={{ borderRadius: 1 }}
              label={instructorProgressReducer.progressReport?.stage.stageName}
              size="small"
              color="primary"
            />
            <p>
              <b className="pr-2">Tiêu đề:</b>
              <span>
                {instructorProgressReducer.progressReport?.progressReportTitle}
              </span>
            </p>
            <p>
              <b className="pr-2">Nội dung:</b>
              <div
                className="prose prose-sm max-w-none ml-3"
                dangerouslySetInnerHTML={{
                  __html:
                    instructorProgressReducer.progressReport
                      ?.progressReportContent,
                }}
              />
            </p>

            {/* Progress Report File */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <h4 className="font-medium text-gray-800 mb-2">
                📂 Danh sách file:
              </h4>
              {instructorProgressReducer.progressReport?.progressReportFiles
                .length > 0 ? (
                <ul className="space-y-2">
                  {instructorProgressReducer.progressReport?.progressReportFiles?.map(
                    (file, index) => (
                      <div
                        className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                        onClick={(e) => handleShowViewFile(e, file.pathFile)}
                        key={file.progressReportFileId}
                      >
                        <div className="flex items-center gap-3">
                          <ArticleOutlinedIcon fontSize="medium" />
                          <p className="text-sm">{file.nameFile}</p>
                        </div>
                        <IconButton
                          onClick={(event) =>
                            handleOpenMenuOptionProgressReportFile(event, file)
                          }
                        >
                          <MoreVertOutlinedIcon fontSize="small" />
                        </IconButton>

                        {/* MENU OPTION FILE */}
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorElProgressReportFile}
                          open={
                            Boolean(anchorElProgressReportFile) &&
                            selectedProgressReportFile?.progressReportFileId ===
                              file.progressReportFileId
                          }
                          onClose={(e) =>
                            handleCloseMenuOptionProgressReportFile(e)
                          }
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                        >
                          <MenuItem
                            onClick={(e) =>
                              handleShowViewFile(e, file?.pathFile)
                            }
                            className="hover:text-blue-500 transition-all"
                          >
                            <RemoveRedEyeOutlinedIcon />
                            <span className="pl-2">Xem chi tiết</span>
                          </MenuItem>
                          <MenuItem
                            onClick={(e) =>
                              handleDownloadFile(
                                e,
                                file?.pathFile,
                                file.nameFile
                              )
                            }
                            className="hover:text-green-500 transition-all"
                          >
                            <FileDownloadOutlinedIcon />
                            <span className="pl-2">Tải xuống</span>
                          </MenuItem>
                        </Menu>
                      </div>
                    )
                  )}
                </ul>
              ) : (
                <p className="italic text-gray-500 text-center">
                  Danh sách file trống
                </p>
              )}
            </div>

            <p className="text-gray-500 italic text-right">
              {new Date(
                instructorProgressReducer.progressReport?.createdDate
              ).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* FORM CREATE PROGRESS REVIEW */}
      <>
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5 flex items-center">
          <span className="pr-2">Đánh giá tiến độ</span>
          <Chip
            label={instructorProgressReducer.progressReport?.stage.stageName}
            color="primary"
            size="small"
          />
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="progressReviewTitle"
                className="block mb-2 text-sm font-medium"
              >
                Tiêu đề đánh giá <b className="text-red-600">(*)</b>
              </label>
              <TextField
                label="Nhập tiêu đề đánh giá"
                variant="outlined"
                fullWidth
                type="text"
                name="progressReviewTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.progressReviewTitle}
                error={
                  formik.errors.progressReviewTitle &&
                  Boolean(formik.errors.progressReviewTitle)
                }
                helperText={
                  formik.errors.progressReviewTitle &&
                  formik.errors.progressReviewTitle
                }
              />
            </div>
            {/* <div>
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
            </div> */}
            <div className="mb-3 pb-1">
              <label
                htmlFor="progressReviewContent"
                className="block mb-2 text-sm font-medium"
              >
                Nội dung đánh giá <b className="text-red-600">(*)</b>
              </label>
              <ReactQuill
                theme="snow"
                value={formik.values.progressReviewContent}
                onChange={(value) =>
                  formik.setFieldValue("progressReviewContent", value)
                }
                style={{
                  marginBottom: "3rem",
                  height: "220px",
                }}
              />
              {formik.touched.progressReviewContent &&
                formik.errors.progressReviewContent && (
                  <p className="text-[#d32f2f] text-[0.75rem] mt-10 mx-[14px]">
                    {formik.errors.progressReviewContent}
                  </p>
                )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Trạng thái đánh giá <b className="text-red-600">(*)</b>
              </label>
              <RadioGroup
                row
                name="isApproved"
                value={formik.values.isApproved}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio color="success" />}
                  label="Duyệt"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="error" />}
                  label="Không duyệt"
                />
              </RadioGroup>
              {formik.errors.isApproved && (
                <p className="text-red-500 text-sm">
                  {formik.errors.isApproved}
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
                    open={
                      Boolean(anchorEl) &&
                      selectedFile?.progressReviewFileId ===
                        item.progressReviewFileId
                    }
                    onClose={(e) => handleCloseMenuOptionFile(e)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem
                      onClick={(e) => handleShowViewFile(e, item?.pathFile)}
                      className="hover:text-blue-500 transition-all"
                    >
                      <RemoveRedEyeOutlinedIcon />
                      <span className="pl-2">Xem chi tiết</span>
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => handleDownloadFile(e, item?.pathFile)}
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

export default FormUpdateProgressReview;
