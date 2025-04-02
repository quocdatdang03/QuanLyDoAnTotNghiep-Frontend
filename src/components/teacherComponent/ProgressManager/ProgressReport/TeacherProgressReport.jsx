import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ForumIcon from "@mui/icons-material/Forum";

import defaultAvatar from "../../../../assets/images/default-avatar.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherProgressReview from "../ProgressReview/TeacherProgressReview";
import { useDispatch, useSelector } from "react-redux";
import { getAllProgressReportsByProjectAction } from "../../../../redux/InstructorProgress/Action";

const TeacherProgressReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { instructorProgressReducer } = useSelector((store) => store);
  const [openId, setOpenId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [stageId, setStageId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const showAnswerOfProgressReport = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // get all progressReports of project
  useEffect(() => {
    dispatch(
      getAllProgressReportsByProjectAction({
        projectId: instructorProgressReducer.project?.projectId,
        sortOrder: sortOrder,
        stageId: stageId,
      })
    );
  }, [instructorProgressReducer.project, sortOrder, stageId]);

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
    window.open(`https://docs.google.com/gview?url=${pathFile}`, "_blank");
    handleCloseMenuOptionFile(e);
  };

  // handle download file:
  const handleDownloadFile = (e, pathFile) => {
    e.stopPropagation();
    window.location.href = pathFile;
    handleCloseMenuOptionFile(e);
  };

  // ++++++++++++++++++++++++++++++ END LOGIC CODE RELATED FILE:

  return (
    <Box
      className="bg-gray-200 p-3 border border-[#1976d2] rounded-sm mx-10"
      component={Paper}
    >
      <Typography
        color="primary"
        className="uppercase text-center italic"
        component="h2"
        sx={{ fontSize: 20 }}
      >
        Báo cáo tiến độ của sinh viên
      </Typography>
      <div className="flex justify-end mt-3 gap-3">
        {/* Dropdown lọc theo giai đoạn (stage) */}
        <FormControl size="small" className="w-60 bg-white rounded-md">
          <InputLabel>Tất cả giai đoạn</InputLabel>
          <Select
            value={stageId}
            onChange={(e) => setStageId(e.target.value)}
            label="Tất cả giai đoạn"
          >
            <MenuItem value="">Tất cả giai đoạn</MenuItem>
            {instructorProgressReducer.stages?.map((item) => {
              return (
                <MenuItem value={item.stageId} key={item.stageId}>
                  {item.stageName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Dropdown sắp xếp theo createdDate */}
        <FormControl size="small" className="w-60 bg-white rounded-md">
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sắp xếp theo"
          >
            <MenuItem value="desc">
              <ArrowDownwardIcon fontSize="small" className="mr-2" />
              Mới nhất
            </MenuItem>
            <MenuItem value="asc">
              <ArrowUpwardIcon fontSize="small" className="mr-2" />
              Cũ nhất
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="mt-5">
        <div className=" space-y-5">
          {instructorProgressReducer.progressReports?.length > 0 ? (
            instructorProgressReducer.progressReports?.map((item) => (
              <Accordion
                key={item.progressReportId}
                expanded={openId === item.progressReportId}
                className="border border-gray-300 rounded-md"
              >
                {/* PROGRESS REPORT OF STUDENT */}
                <AccordionSummary id={`panel-${item.id}-header`}>
                  <div className="flex gap-5 w-full">
                    <img
                      src={
                        instructorProgressReducer.project?.student.image ||
                        defaultAvatar
                      }
                      className="w-10 h-10 rounded-full object-cover object-center"
                    />
                    <div className="space-y-2 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-gray-600">
                            {
                              instructorProgressReducer.project?.student
                                .fullName
                            }
                          </p>
                          <Chip
                            label={item.approved ? "Đã duyệt" : "Chưa duyệt"}
                            size="small"
                            color={item.approved ? "success" : "error"}
                          />
                        </div>

                        {
                          // Không cho create Progress Review với các progressReport ở stage có status = 3 'Đã hoàn thành'
                          item.stage.stageStatus.stageStatusId !== 3 && (
                            <div className="flex items-center gap-3">
                              <Button
                                color="success"
                                variant="contained"
                                startIcon={<MessageIcon />}
                                onClick={() =>
                                  navigate(
                                    `/teacher/progress/${item.progressReportId}/project/${instructorProgressReducer.project?.projectId}/review/create`
                                  )
                                }
                              >
                                Gửi đánh giá
                              </Button>
                            </div>
                          )
                        }
                      </div>
                      <Chip
                        sx={{ borderRadius: 1 }}
                        label={item.stage.stageName}
                        size="small"
                        color="primary"
                      />
                      <p>
                        <b className="pr-2">Tiêu đề:</b>
                        <span>{item.progressReportTitle}</span>
                      </p>
                      <p>
                        <b className="pr-2">Nội dung:</b>
                        <span className="text-justify">
                          {item.progressReportContent}
                        </span>
                      </p>

                      {/* Progress Report File */}
                      <div className="bg-gray-50 p-3 rounded-lg border">
                        <h4 className="font-medium text-gray-800 mb-2">
                          📂 Danh sách file:
                        </h4>
                        {item.progressReportFiles.length > 0 ? (
                          <ul className="space-y-2">
                            {item.progressReportFiles.map((file, index) => (
                              <div
                                className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                                onClick={(e) =>
                                  handleShowViewFile(e, file.pathFile)
                                }
                                key={file.progressReportFileId}
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
                                    selectedFile?.progressReportFileId ===
                                      file.progressReportFileId
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
                                      handleDownloadFile(e, file?.pathFile)
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

                      <p className="text-gray-500 italic text-right">
                        {new Date(item.createdDate).toLocaleString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <div className="text-right">
                        <Button
                          variant="outlined"
                          onClick={() =>
                            showAnswerOfProgressReport(item.progressReportId)
                          }
                        >
                          <span className="pr-2">Xem phản hồi</span>
                          <Badge
                            badgeContent={item.progressReviews.length}
                            color="error"
                          >
                            <ForumIcon color="primary" />
                          </Badge>
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionSummary>
                {/* PROGRESS REVIEW OF INSTRUCTOR*/}
                <AccordionDetails>
                  <div className="ml-12 border-t border-gray-500 py-5 space-y-5">
                    {item.progressReviews.length > 0 ? (
                      item.progressReviews?.map((progressReview, index) => {
                        return (
                          <TeacherProgressReview
                            key={index}
                            progressReview={progressReview}
                            progressReport={item}
                          />
                        );
                      })
                    ) : (
                      <p className="text-gray-500 italic text-center">
                        Danh sách phản hồi trống
                      </p>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <p className="text-gray-500 italic text-center py-5 text-lg">
              Chưa có báo cáo tiến độ nào
            </p>
          )}
        </div>
      </div>
    </Box>
  );
};

export default TeacherProgressReport;
