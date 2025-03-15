import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import toast from "react-hot-toast";
import defaultImage from "../../../assets/images/default-avatar.png";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { projectRegisterValidation } from "./validation/ProjectRegisterValidation";
import { uploadFileToCloudinary } from "../../../util/UploadFileToCloudinary";
import { store } from "../../../redux/store";
import {
  createProjectAction,
  deleteProjectFileByIdAction,
  getInstructorOfProjectByStudentCodeAction,
  getProjectByStudentCodeAction,
  updateProjectAction,
} from "../../../redux/Project/Action";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FormEditProject = () => {
  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { authReducer, projectReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleUploadFile = async (e) => {
    setUploadFile(true);

    const fileData = e.target.files[0];

    try {
      const fileUrlFromCloudinary = await uploadFileToCloudinary(
        fileData,
        "Project-file"
      );

      const projectFileData = {
        nameFile: fileData.name,
        pathFile: fileUrlFromCloudinary,
      };

      console.log(projectFileData);

      formik.setFieldValue("projectFiles", [
        ...formik.values.projectFiles,
        projectFileData,
      ]);

      setUploadFile(false);
    } catch (error) {
      toast.error("Xảy ra lỗi khi upload file");
      setUploadFile(false);
    }
  };

  // handle delete current uploaded file:
  const handleDeleteCurrentUploadedFile = (e, currentFile) => {
    const projectFilesAfterDelete = formik.values.projectFiles.filter(
      (item) => item.pathFile !== currentFile.pathFile
    );

    formik.setFieldValue("projectFiles", projectFilesAfterDelete);

    handleCloseMenuOptionFile(e);
  };

  // handle register project
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectId: projectReducer.project?.projectId || "",
      projectName: projectReducer.project?.projectName || "",
      projectContent: projectReducer.project?.projectContent || "",
      projectFiles: projectReducer.project?.projectFiles || [],
      studentCode: authReducer.user?.code,
    },
    validationSchema: projectRegisterValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        projectData: {
          ...values,
        },
        toast,
        navigate,
      };

      dispatch(updateProjectAction(requestData));
    },
  });

  // get instructor of project and get project
  useEffect(() => {
    const requestData = {
      studentCode: authReducer.user?.code,
    };

    dispatch(getInstructorOfProjectByStudentCodeAction(requestData));
    dispatch(getProjectByStudentCodeAction(requestData));
  }, []);

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
      projectFileId: currentFile.projectFileId,
      toast,
    };

    dispatch(deleteProjectFileByIdAction(requestData));

    handleCloseMenuOptionFile(e);
  };

  return (
    <div>
      <Container className="my-10 py-10" component={Paper}>
        <div className="mb-10">
          <Button
            variant="outlined"
            startIcon={<ChevronLeftOutlined />}
            onClick={() => navigate("/student/project/register")}
          >
            Quay lại trang đăng ký
          </Button>
        </div>
        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 30 }}
        >
          Chỉnh sửa đề tài tốt nghiệp
        </Typography>

        {/* GVHD INFO */}
        <div className="bg-[#ecf0f1] p-5">
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mb-5">
            Giảng viên hướng dẫn của bạn
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Card className="md:col-start-2">
              {/* {isDelayedLoading ? (
                              <Skeleton variant="rectangular" height={250} />
                            ) : ( */}
              <CardMedia
                sx={{ height: 250 }}
                image={projectReducer.instructor?.image || defaultImage}
                title={projectReducer.instructor?.fullName}
              />
              {/* )} */}

              <CardContent>
                {/* {isDelayedLoading ? (
                <Skeleton />
              ) : ( */}
                <h3 className="text-center text-xl font-medium text-[#1ca3aa] mb-3">
                  {projectReducer.instructor?.fullName}
                </h3>
                {/* )} */}

                {/* {isDelayedLoading ? (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                  <Skeleton width="50%" />
                </Box>
              ) : ( */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 text-gray-600">
                      <SubtitlesIcon />
                      <b>MGV:</b>
                    </p>
                    <span className="pl-2">
                      {projectReducer.instructor?.teacherCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 text-gray-600">
                      <CalendarMonthIcon />
                      <b>Ngày sinh:</b>
                    </p>
                    <span>
                      {new Date(
                        projectReducer.instructor?.dateOfBirth
                      ).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 text-gray-600">
                      <ClassIcon />
                      <b>Học vị:</b>
                    </p>
                    <span>{projectReducer.instructor?.degree.degreeName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-1 text-gray-600">
                      <SchoolIcon />
                      <b>Khoa:</b>
                    </p>
                    <span>
                      {projectReducer.instructor?.faculty.facultyName}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FORM EDIT PROJECT */}
        <>
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
            Chỉnh sửa đề tài tốt nghiệp
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <input
                type="hidden"
                name="projectId"
                value={formik.values.projectId}
              />
              <div>
                <label
                  htmlFor="projectName"
                  className="block mb-2 text-sm font-medium"
                >
                  Tên đề tài <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập tên đề tài"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="projectName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.projectName}
                  error={
                    formik.errors.projectName &&
                    Boolean(formik.errors.projectName)
                  }
                  helperText={
                    formik.errors.projectName && formik.errors.projectName
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="projectContent"
                  className="block mb-2 text-sm font-medium"
                >
                  Nội dung đề tài <b className="text-red-600">(*)</b>
                </label>
                <TextField
                  label="Nhập nội dung đề tài"
                  variant="outlined"
                  fullWidth
                  rows={4}
                  multiline
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="projectContent"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.projectContent}
                  error={
                    formik.errors.projectContent &&
                    Boolean(formik.errors.projectContent)
                  }
                  helperText={
                    formik.errors.projectContent && formik.errors.projectContent
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="projectFile"
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
            </div>

            {/* Uploaded File */}
            <div className="space-y-3 mt-5">
              {formik.values.projectFiles?.map((item) => (
                <div
                  className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                  onClick={(e) => handleShowViewFile(e, item.pathFile)}
                  key={item.projectFileId}
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
            <div className="text-center">
              <Button
                className="w-[30%]"
                variant="contained"
                sx={{ paddingY: 1 }}
                type="submit"
                // loading={isDelayedLoading}
              >
                Cập nhật
              </Button>
            </div>
          </form>
        </>
      </Container>
    </div>
  );
};

export default FormEditProject;
