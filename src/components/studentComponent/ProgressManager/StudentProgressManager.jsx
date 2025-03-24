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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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

const StudentProgressManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authReducer, projectReducer } = useSelector((store) => store);

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // get instructor of project and get project
  useEffect(() => {
    const requestData = {
      studentCode: authReducer.user?.code,
    };

    dispatch(getInstructorOfProjectByStudentCodeAction(requestData));
    dispatch(getProjectByStudentCodeAction(requestData));
  }, []);

  return (
    <Container className="my-10 py-10" component={Paper}>
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30 }}
      >
        Quản lý tiến độ
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
                {projectReducer.project?.projectName}
              </span>
            </p>
            <p>
              <b>Mô tả:</b>
              <span className="pl-3 text-justify">
                {projectReducer.project?.projectContent}
              </span>
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
      <div className="mt-7">
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 mb-2 text-xl">
          Tiến độ đồ án
        </h1>
        <div className="space-y-5 px-5">
          {[1, 1, 1].map((item, index) => {
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
                  onClick={() => navigate("/student/progress/create")}
                >
                  Báo cáo Giai đoạn 1
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <p className="pr-2">
                        <b>Giai đoạn 1</b>:
                      </p>
                      <p>
                        Từ{" "}
                        <span className="font-bold italic text-gray-600">
                          03-01-2024
                        </span>
                        <span className="px-2">đến</span>
                        <span className="font-bold italic text-gray-600">
                          03-01-2024
                        </span>
                      </p>
                    </div>
                    <Chip label="Đang thực hiện" color="warning" size="small" />
                  </div>
                  <div className="mt-3 space-y-3 bg-gray-100 p-3 rounded-md">
                    <p>
                      <b>Tiêu đề: </b>{" "}
                      <span>Tiến hành thực hiện giai đoạn 1</span>
                    </p>
                    <p>
                      <b>Nội dung: </b>{" "}
                      <span className="text-justify ">
                        Tiến hành thực hiện giai đoạn 1 Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Ad, aspernatur libero
                        quisquam, error cumque veniam non veritatis ducimus
                        expedita cum voluptatibus rerum esse dolorem vitae
                        laboriosam nemo ut earum vel.
                      </span>
                    </p>
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {/* TAB LIST */}
          <div className="mt-10">
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange}>
                  <Tab label="Báo cáo của sinh viên" value="1" />
                  <Tab label="Hỏi đáp với giáo viên" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <StudentProgressReport />
              </TabPanel>

              {/* Tab Chat */}
              <TabPanel value="2">
                <TabChatMessage />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StudentProgressManager;
