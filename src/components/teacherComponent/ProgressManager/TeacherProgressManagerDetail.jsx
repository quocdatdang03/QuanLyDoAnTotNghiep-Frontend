import React, { useEffect, useState } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useNavigate, useParams } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TeacherProgressReport from "./ProgressReport/TeacherProgressReport";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStagesOfProjectAction,
  getProjectByIdAction,
} from "../../../redux/InstructorProgress/Action";
import TeacherTabChatMessage from "./Tab/TeacherTabChatMessage";

const TeacherProgressManagerDetail = () => {
  const { projectId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { instructorProgressReducer } = useSelector((store) => store);

  const [tabValue, setTabValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // get info of project
  useEffect(() => {
    const requestData = {
      projectId: projectId,
    };

    dispatch(getProjectByIdAction(requestData));
  }, [projectId]);

  // handle refresh stages list:
  const handleRefreshStageList = () => {
    // load stages List:
    dispatch(
      getAllStagesOfProjectAction({
        projectId: instructorProgressReducer.project?.projectId,
      })
    );
  };

  // get all stages of project
  useEffect(() => {
    const requestData = {
      projectId: instructorProgressReducer.project?.projectId,
    };

    dispatch(getAllStagesOfProjectAction(requestData));
  }, [instructorProgressReducer.project]);

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
      <div className="mb-10">
        <Button
          variant="outlined"
          color="info"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/teacher/progress/manage")}
        >
          Quay lại trang quản lý tiến độ
        </Button>
      </div>
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30 }}
      >
        Quản lý tiến độ sinh viên
      </Typography>

      <div className="bg-gray-100 p-5 rounded-md mt-10">
        {/* PROJECT INFO */}
        <div className="mt-5">
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mb-5">
            Thông tin đề tài
          </h1>
          <div className="space-y-2">
            <p>
              <b>Tên đề tài:</b>
              <span className="pl-3 text-justify">
                {instructorProgressReducer.project?.projectName}
              </span>
            </p>
            <p>
              <b>Mô tả:</b>
              <span className="pl-3 text-justify">
                {instructorProgressReducer.project?.projectContent}
              </span>
            </p>
          </div>
        </div>

        {/* STUDENT INFO */}
        <div className="mt-10">
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mb-5">
            Thông tin sinh viên thực hiện
          </h1>
          <div className="space-y-2">
            <p>
              <b>Mã sinh viên:</b>
              <span className="pl-3 text-justify">
                {instructorProgressReducer.project?.student.studentCode}
              </span>
            </p>
            <p>
              <b>Họ tên sinh viên:</b>
              <span className="pl-3 text-justify">
                {instructorProgressReducer.project?.student.fullName}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
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
          {instructorProgressReducer.stages?.length > 0 ? (
            instructorProgressReducer.stages?.map((item, index) => {
              return (
                <div
                  className="flex flex-col md:flex-row items-center gap-3 bg-blue-100 p-5 rounded-lg"
                  key={index}
                >
                  <div className="w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-center">
                        <p className="pr-2">
                          <Chip
                            className="font-bold"
                            sx={{ borderRadius: 1 }}
                            label={item.stageName}
                            color="primary"
                            size="small"
                          />
                        </p>
                        <p>
                          Từ{" "}
                          <span className="font-bold italic text-gray-600">
                            {new Date(item.startDate).toLocaleString("vi-VN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="px-2">đến</span>
                          <span className="font-bold italic text-gray-600">
                            {new Date(item.endDate).toLocaleString("vi-VN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
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
                    <div className="mt-3 space-y-3 bg-gray-100 p-3 rounded-md w-full">
                      <p>
                        <b>Tiêu đề: </b> <span>{item.stageTitle}</span>
                      </p>
                      <p>
                        <b>Nội dung: </b>{" "}
                        <span className="text-justify ">
                          {item.stageContent}
                        </span>
                      </p>
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
                                  <p className="text-sm">{file.nameFile}</p>
                                </div>
                                <IconButton
                                  onClick={(event) =>
                                    handleOpenMenuOptionFile(event, file)
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
                                  onClose={(e) => handleCloseMenuOptionFile(e)}
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
                            ))}
                          </ul>
                        ) : (
                          <p className="italic text-gray-500 text-center">
                            Danh sách file trống
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-gray-100 px-5 py-10 rounded-md mt-5 text-center italic text-lg">
              Danh sách tiến độ trống,
              <Button onClick={() => navigate("/teacher/stages")}>
                Tạo giai đoạn
              </Button>
            </div>
          )}
        </div>

        {instructorProgressReducer.stages?.length > 0 && (
          <div>
            {/* TAB LIST */}
            <div className="mt-10">
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleTabChange}>
                    <Tab label="Báo cáo của sinh viên" value="1" />
                    <Tab label="Thắc mắc của sinh viên" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <TeacherProgressReport />
                </TabPanel>

                {/* Tab Chat */}
                <TabPanel value="2">
                  <TeacherTabChatMessage />
                </TabPanel>
              </TabContext>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default TeacherProgressManagerDetail;
