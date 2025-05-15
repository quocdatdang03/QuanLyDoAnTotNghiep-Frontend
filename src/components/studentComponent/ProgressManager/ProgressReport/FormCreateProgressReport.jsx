import {
  Button,
  Chip,
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileToCloudinary } from "../../../../util/UploadFileToCloudinary";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { createProgressReportValidation } from "./validation/createProgressReportValidation";
import { createProgressReportAction } from "../../../../redux/ProgressReport/Action";

const FormCreateProgressReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { authReducer, projectReducer, progressReportReducer } = useSelector(
    (store) => store
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  // handle upload file to cloudinary:
  const handleUploadFile = async (e) => {
    setUploadFile(true);

    const fileData = e.target.files[0];

    try {
      const fileUrlFromCloudinary = await uploadFileToCloudinary(
        fileData,
        "ProgressReport-file"
      );

      const progressReportFileData = {
        nameFile: fileData.name,
        pathFile: fileUrlFromCloudinary,
      };

      console.log(progressReportFileData);

      formik.setFieldValue("progressReportFiles", [
        ...formik.values.progressReportFiles,
        progressReportFileData,
      ]);

      setUploadFile(false);
    } catch (error) {
      toast.error("Xảy ra lỗi khi upload file");
      setUploadFile(false);
    }
  };

  // handle delete current uploaded file:
  const handleDeleteCurrentUploadedFile = (e, currentFile) => {
    const progressReportFilesAfterDelete =
      formik.values.progressReportFiles.filter(
        (item) => item.pathFile !== currentFile.pathFile
      );

    formik.setFieldValue("progressReportFiles", progressReportFilesAfterDelete);

    handleCloseMenuOptionFile(e);
  };

  // handle register progressReport
  const formik = useFormik({
    initialValues: {
      progressReportTitle: "",
      progressReportContent: "",
      progressReportFiles: [],
      stageId: progressReportReducer.stage?.stageId,
      projectId: projectReducer.project?.projectId,
    },
    validationSchema: createProgressReportValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        progressReportData: {
          ...values,
        },
        toast,
        navigate,
      };

      console.log(requestData);

      dispatch(createProgressReportAction(requestData));

      resetForm();
    },
  });

  // ++++++++++++++++++++++++++++++ START LOGIC CODE RELATED FILE:
  // handle Open Menu Option File:
  const handleOpenMenuOptionFile = (event, currentFile) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedFile(currentFile);
  };

  // handle Close Menu Option File:
  const handleCloseMenuOptionFile = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  // handle show view file:
  const handleShowViewFile = (e, pathFile) => {
    e.stopPropagation();

    const isOfficeFile = /\.(doc?|docx?|xlsx?|pptx?|pdf?)$/i.test(pathFile);

    if (isOfficeFile) {
      window.open(
        `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(pathFile)}`,
        "_blank"
      );
    } else {
      // Ảnh hoặc các file khác
      window.open(pathFile, "_blank");
    }

    handleCloseMenuOptionFile(e);
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
  };

  // ++++++++++++++++++++++++++++++ END LOGIC CODE RELATED FILE:

  return (
    <Container className="my-10 py-10" component={Paper}>
      <Button
        variant="outlined"
        color="info"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/student/progress/manage")}
      >
        Quay lại trang tiến độ
      </Button>
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30 }}
      >
        Tạo Báo cáo tiến độ
      </Typography>
      <>
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5 flex items-center">
          <span className="pr-2">Báo cáo tiến độ</span>
          <Chip
            label={progressReportReducer.stage?.stageName}
            color="primary"
            size="small"
          />
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="progressReportTitle"
              className="block mb-2 text-sm font-medium"
            >
              Tiêu đề báo cáo <b className="text-red-600">(*)</b>
            </label>
            <TextField
              label="Nhập tiêu đề báo cáo"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="text"
              name="progressReportTitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.progressReportTitle}
              error={
                formik.errors.progressReportTitle &&
                Boolean(formik.errors.progressReportTitle)
              }
              helperText={
                formik.errors.progressReportTitle &&
                formik.errors.progressReportTitle
              }
            />
            <div>
              <label
                htmlFor="progressReportContent"
                className="block mb-2 text-sm font-medium"
              >
                Nội dung báo cáo <b className="text-red-600">(*)</b>
              </label>
              <TextField
                label="Nhập nội dung báo cáo"
                variant="outlined"
                fullWidth
                rows={4}
                multiline
                sx={{ marginBottom: 2 }}
                type="text"
                name="progressReportContent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.progressReportContent}
                error={
                  formik.errors.progressReportContent &&
                  Boolean(formik.errors.progressReportContent)
                }
                helperText={
                  formik.errors.progressReportContent &&
                  formik.errors.progressReportContent
                }
              />
            </div>
            <div>
              <label
                htmlFor="progressReportFile"
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
              {formik.values.progressReportFiles?.map((item, index) => (
                <div
                  className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                  onClick={(e) => handleShowViewFile(e, item.pathFile)}
                  key={item.progressReportFileId}
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
                        handleDownloadFile(
                          e,
                          selectedFile?.pathFile,
                          item.nameFile
                        )
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
              Gửi báo cáo
            </Button>
          </div>
        </form>
      </>
    </Container>
  );
};

export default FormCreateProgressReport;
