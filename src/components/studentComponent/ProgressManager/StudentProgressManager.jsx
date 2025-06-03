import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Typography,
} from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabChatMessage from "./Tab/TabChatMessage";
import { useNavigate } from "react-router-dom";
import StudentProgressReport from "./ProgressReport/StudentProgressReport";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstructorOfProjectByStudentCodeAction,
  getProjectByStudentCodeAction,
} from "../../../redux/Project/Action";
import {
  getAllStagesByProjectAction,
  getStageByIdAction,
} from "../../../redux/ProgressReport/Action";
import CustomBreadCrumb from "../../BreadCrumb/CustomBreadCrumb";

const StudentProgressManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { authReducer, projectReducer, progressReportReducer } = useSelector(
    (store) => store
  );

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  // handle navigate to form create progress report:
  const handleNavigateToFormCreateProgressReport = (stageId) => {
    const requestData = {
      stageId: stageId,
      navigate,
    };

    // get stage by id and navigate to form create progress report
    dispatch(getStageByIdAction(requestData));
  };

  // get instructor of project and get project
  useEffect(() => {
    const requestData = {
      studentCode: authReducer.user?.code,
    };

    dispatch(getInstructorOfProjectByStudentCodeAction(requestData));
    dispatch(getProjectByStudentCodeAction(requestData));
  }, []);

  //  handle refresh stage list
  const handleRefreshStageList = () => {
    // load stages List:
    dispatch(
      getAllStagesByProjectAction({
        projectId: projectReducer.project?.projectId,
      })
    );
  };

  // get all stages of project
  useEffect(() => {
    dispatch(
      getAllStagesByProjectAction({
        projectId: projectReducer.project?.projectId,
      })
    );
  }, [projectReducer.project]);

  return (
    <Container className="my-10 py-10" component={Paper}>
      {/* Breadcrumbs */}
      <CustomBreadCrumb
        links={[{ label: "Quản lý tiến độ", href: "/student/progress/manage" }]}
      />

      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30 }}
      >
        Quản lý tiến độ
      </Typography>

      {projectReducer.project ? (
        <>
          {/* PROJECT INFO */}
          <div className="bg-gray-100 p-5 rounded-md mt-10">
            <div className="mt-5">
              <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mb-5">
                Thông tin đề tài
              </h1>
              <div className="space-y-2">
                <p>
                  <b>Tên đề tài:</b>
                  <span className="pl-3 text-justify">
                    {projectReducer.project?.projectName}
                  </span>
                </p>
                <p>
                  <b>Mô tả:</b>
                  <span className="pl-3 text-justify">
                    {projectReducer.project?.projectContent}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <b>Trạng thái</b>
                  <Chip
                    label={
                      projectReducer.project?.projectStatus.projectStatusName
                    }
                    size="small"
                    color={
                      projectReducer.project?.projectStatus.projectStatusId ===
                      1
                        ? "warning"
                        : projectReducer.project?.projectStatus
                              .projectStatusId === 2
                          ? "success"
                          : projectReducer.project?.projectStatus
                              .projectStatusId === 3 && "error"
                    }
                  />
                </p>
              </div>
            </div>

            {/* INSTRUCTOR INFO */}
            <div className="mt-10">
              <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mb-5">
                Thông tin GVHD
              </h1>
              <div className="space-y-2">
                <p>
                  <b>Mã GVHD:</b>
                  <span className="pl-3 text-justify">
                    {projectReducer.instructor?.teacherCode}
                  </span>
                </p>
                <p>
                  <b>Họ tên GVHD:</b>
                  <span className="pl-3 text-justify">
                    {projectReducer.instructor?.fullName}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          {/* Project phải được duyệt thì mới cho báo cáo tiến độ */}
          {projectReducer.project?.projectStatus.projectStatusId === 2 ||
          projectReducer.project?.projectStatus.projectStatusId === 3 ? (
            <div className="mt-7">
              <h1 className="text-[#0355d2] font-bold uppercase pb-3 mb-2 text-xl">
                Tiến độ đồ án
              </h1>
              <div className=" mb-5 px-5">
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  color="info"
                  className="inline-block"
                  onClick={handleRefreshStageList}
                >
                  Tải lại danh sách
                </Button>
              </div>
              <div className="space-y-5 px-5">
                {progressReportReducer.stages?.length > 0 ? (
                  progressReportReducer.stages?.map((item, index) => {
                    return (
                      <div
                        className="flex flex-col md:flex-row items-center gap-3 bg-blue-100 p-5 rounded-lg"
                        key={index}
                      >
                        <Button
                          variant="contained"
                          className="md:w-[50%] lg:w-[30%]"
                          sx={{ borderRadius: "100px" }}
                          size="large"
                          disabled={
                            item.stageStatus.stageStatusId === 1 ||
                            item.stageStatus.stageStatusId === 3
                          }
                          onClick={() =>
                            handleNavigateToFormCreateProgressReport(
                              item.stageId
                            )
                          }
                        >
                          Báo cáo Giai đoạn {item.stageOrder}
                        </Button>
                        <div className="w-full">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col md:flex-row md:items-center">
                              <p className="pr-2">
                                <b>{item.stageName}</b>:
                              </p>
                              <p>
                                Từ{" "}
                                <span className="font-bold italic text-gray-600">
                                  {new Date(item.startDate).toLocaleDateString(
                                    "vi-VN",
                                    {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                    }
                                  )}
                                </span>
                                <span className="px-2">đến</span>
                                <span className="font-bold italic text-gray-600">
                                  {new Date(item.endDate).toLocaleDateString(
                                    "vi-VN",
                                    {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                    }
                                  )}
                                </span>
                              </p>
                            </div>
                            <Chip
                              label={item.stageStatus.stageStatusName}
                              color={
                                item.stageStatus.stageStatusId === 1
                                  ? "error"
                                  : item.stageStatus.stageStatusId === 2
                                    ? "info"
                                    : "success"
                              }
                              size="small"
                            />
                          </div>
                          <div className="mt-3 space-y-3 bg-gray-100 p-3 rounded-md">
                            {item.stageStatus.stageStatusId === 2 ||
                            item.stageStatus.stageStatusId === 3 ? (
                              <>
                                <p>
                                  <b>Tiêu đề: </b>{" "}
                                  <span>{item.stageTitle}</span>
                                </p>
                                <div
                                  className="prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{
                                    __html: item.stageContent,
                                  }}
                                />
                                <div className="bg-gray-50 p-3 rounded-lg border">
                                  <h4 className="font-medium text-gray-800 mb-2">
                                    📂 Danh sách file:
                                  </h4>
                                  {item.stageFiles.length > 0 ? (
                                    <ul className="space-y-2">
                                      {item.stageFiles?.map((file, index) => (
                                        <div
                                          className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                                          onClick={(e) =>
                                            handleShowViewFile(e, file.pathFile)
                                          }
                                          key={file.stageFileId}
                                        >
                                          <div className="flex items-center gap-3">
                                            <ArticleOutlinedIcon fontSize="medium" />
                                            <p className="text-sm">
                                              {file.nameFile}
                                            </p>
                                          </div>
                                          <IconButton
                                            onClick={(event) =>
                                              handleOpenMenuOptionFile(
                                                event,
                                                file
                                              )
                                            }
                                          >
                                            <MoreVertOutlinedIcon fontSize="small" />
                                          </IconButton>

                                          {/* MENU OPTION FILE */}
                                          <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={
                                              Boolean(anchorEl) &&
                                              selectedFile?.stageFileId ===
                                                file.stageFileId
                                            }
                                            onClose={(e) =>
                                              handleCloseMenuOptionFile(e)
                                            }
                                            anchorOrigin={{
                                              vertical: "bottom",
                                              horizontal: "center",
                                            }}
                                          >
                                            <MenuItem
                                              onClick={(e) =>
                                                handleShowViewFile(
                                                  e,
                                                  file?.pathFile
                                                )
                                              }
                                              className="hover:text-blue-500 transition-all"
                                            >
                                              <RemoveRedEyeOutlinedIcon />
                                              <span className="pl-2">
                                                Xem chi tiết
                                              </span>
                                            </MenuItem>
                                            <MenuItem
                                              onClick={(e) =>
                                                handleDownloadFile(
                                                  e,
                                                  file?.pathFile,
                                                  file?.nameFile
                                                )
                                              }
                                              className="hover:text-green-500 transition-all"
                                            >
                                              <FileDownloadOutlinedIcon />
                                              <span className="pl-2">
                                                Tải xuống
                                              </span>
                                            </MenuItem>
                                          </Menu>
                                        </div>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="italic text-gray-500 text-center">
                                      Danh sách file trống
                                    </p>
                                  )}
                                </div>
                              </>
                            ) : (
                              <p className="italic text-gray-500 text-center my-5">
                                Hoàn thành giai đoạn trước để mở khóa nội dung
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-gray-100 px-5 py-10 rounded-md mt-5 text-center italic text-lg">
                    Danh sách trống, Vui lòng chờ GVHD tạo giai đoạn
                  </div>
                )}
              </div>

              {progressReportReducer.stages?.length > 0 && (
                <div>
                  {/* TAB LIST */}
                  <div className="mt-10">
                    <TabContext value={tabValue}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleTabChange}>
                          <Tab label="Báo cáo của sinh viên" value="1" />
                          <Tab label="Hỏi đáp với giảng viên" value="2" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <StudentProgressReport
                          projectId={projectReducer.project?.projectId}
                        />
                      </TabPanel>

                      {/* Tab Chat */}
                      <TabPanel value="2">
                        <TabChatMessage />
                      </TabPanel>
                    </TabContext>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center bg-gray-100 italic px-5 py-10 rounded-md mt-10">
              Vui lòng chờ GVHD duyệt đề tài để có thể báo cáo tiến độ
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-100 px-5 py-10 rounded-md mt-10">
          Bạn chưa đăng ký đề tài, vui lòng đăng ký để tài ở trang{" "}
          <b
            className="cursor-pointer hover:underline hover:text-blue-500 transition-all"
            onClick={() => navigate("/student/project/register")}
          >
            Đăng ký đề tài
          </b>
        </div>
      )}
    </Container>
  );
};

export default StudentProgressManager;
