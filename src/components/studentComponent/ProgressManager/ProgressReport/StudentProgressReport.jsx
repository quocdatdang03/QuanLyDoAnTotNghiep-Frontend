import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Badge,
  Box,
  Button,
  Chip,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ForumIcon from "@mui/icons-material/Forum";

import defaultAvatar from "../../../../assets/images/default-avatar.png";
import React, { useEffect, useState } from "react";
import StudentProgressReview from "../ProgressReview/StudentProgressReview";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deleteProgressReportAction,
  deleteProgressReportFileByIdAction,
  getAllProgressReportsByProjectAction,
  getProgressReportByIdAction,
} from "../../../../redux/ProgressReport/Action";
import toast from "react-hot-toast";

// style of delete progress report modal:
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const StudentProgressReport = ({ projectId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openId, setOpenId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [stageId, setStageId] = useState("");
  const [progressReportStatus, setProgressReportStatus] = useState("");

  const [selectedProgressReport, setSelectedProgressReport] = useState(null);
  const [openDeleteProgressReportModal, setOpenDeleteProgressReportModal] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorElProgressReport, setAnchorElProgressReport] = useState(null);

  const showAnswerOfProgressReport = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const { progressReportReducer, authReducer } = useSelector((store) => store);

  // ++++++++++++++++++++++++++++++ START LOGIC CODE RELATED FILE:
  // handle Open Menu Option File:
  const handleOpenMenuOptionProgressReportFile = (event, currentFile) => {
    event.stopPropagation();
    setAnchorElProgressReport(event.currentTarget);
    setSelectedFile(currentFile);
  };

  // handle Close Menu Option File:
  const handleCloseMenuOptionProgressReportFile = (e) => {
    e.stopPropagation();
    setAnchorElProgressReport(null);
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

    handleCloseMenuOptionProgressReportFile(e);
  };

  // handle delete file :
  const handleDeleteFile = (e, currentFile) => {
    e.stopPropagation();

    const requestData = {
      progressReportFileId: currentFile.progressReportFileId,
      toast,
    };

    dispatch(deleteProgressReportFileByIdAction(requestData));

    handleCloseMenuOptionProgressReportFile(e);
  };

  // ++++++++++++++++++++++++++++++ END LOGIC CODE RELATED FILE:

  // handle navigate to update progress report form
  const handleNavigateToFormUpdateProgressReport = (progressReportId) => {
    const requestData = {
      progressReportId: progressReportId,
      navigate,
    };

    // get progress report by id and navigate to form update progress report
    dispatch(getProgressReportByIdAction(requestData));
  };

  // handle open delete progress report modal
  const handleOpenModalDeleteProgressReport = (progressReport) => {
    setSelectedProgressReport(progressReport);
    setOpenDeleteProgressReportModal(true);
  };

  // handle delete progress report
  const handleDeleteProgressReport = () => {
    const requestData = {
      progressReportId: selectedProgressReport.progressReportId,
      toast,
    };

    dispatch(deleteProgressReportAction(requestData));

    setOpenDeleteProgressReportModal(false);
  };

  // handle refresh progressReports List:
  const handleRefreshProgressReportsList = () => {
    // load progressReports list:
    dispatch(
      getAllProgressReportsByProjectAction({
        projectId: projectId,
      })
    );

    // clear filter
    setSortOrder("desc");
    setStageId("");
    setProgressReportStatus("");
  };

  // get all progressReports of project
  useEffect(() => {
    dispatch(
      getAllProgressReportsByProjectAction({
        projectId: projectId,
        sortOrder: sortOrder,
        stageId: stageId,
        progressReportStatus: progressReportStatus,
      })
    );
  }, [projectId, sortOrder, stageId, progressReportStatus]);

  return (
    <>
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

        {/* Button refresh */}
        <div className="flex flex-wrap items-center justify-between mt-5 gap-5">
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            color="info"
            className="inline-block"
            onClick={handleRefreshProgressReportsList}
          >
            Tải lại danh sách
          </Button>
          <div className="flex flex-wrap justify-end gap-3">
            {/* Dropdown lọc theo giai đoạn (stage) */}
            <FormControl size="small" className="w-60 bg-white rounded-md">
              <InputLabel>Tất cả giai đoạn</InputLabel>
              <Select
                value={stageId}
                onChange={(e) => setStageId(e.target.value)}
                label="Tất cả giai đoạn"
              >
                <MenuItem value="">Tất cả giai đoạn</MenuItem>
                {progressReportReducer.stages?.map((item) => {
                  return (
                    <MenuItem value={item.stageId} key={item.stageId}>
                      {item.stageName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* Dropdown lọc theo progressReport status*/}
            <FormControl size="small" className="w-60 bg-white rounded-md">
              <InputLabel>Trạng thái giai đoạn</InputLabel>
              <Select
                value={progressReportStatus}
                onChange={(e) => setProgressReportStatus(e.target.value)}
                label="Trạng thái giai đoạn"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="true">Đã duyệt</MenuItem>
                <MenuItem value="false">Chưa duyệt</MenuItem>
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
        </div>
        <div className="mt-5">
          <div className=" space-y-5">
            {progressReportReducer.progressReports?.length > 0 ? (
              progressReportReducer.progressReports?.map((item) => (
                <Accordion
                  key={item.progressReportId}
                  expanded={openId === item.progressReportId}
                  className="border border-gray-300 rounded-md"
                >
                  {/* PROGRESS REPORT OF STUDENT */}
                  <AccordionSummary id={`panel-${item.id}-header`}>
                    <div className="flex gap-5 w-full">
                      <img
                        src={authReducer.user?.image || defaultAvatar}
                        className="w-10 h-10 rounded-full object-cover object-center"
                      />
                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-gray-600">
                              {authReducer.user?.fullName}
                            </p>
                            <Chip
                              label={item.approved ? "Đã duyệt" : "Chưa duyệt"}
                              size="small"
                              color={item.approved ? "success" : "error"}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            {/* 
                              Chỉ show btn edit khi progressReport:
                                + Chưa được duyệt
                                + Và không thuộc completed stage
                            */}
                            {!item.approved &&
                              item.stage.stageStatus.stageStatusId != 3 && (
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    handleNavigateToFormUpdateProgressReport(
                                      item.progressReportId
                                    )
                                  }
                                >
                                  <EditIcon />
                                </IconButton>
                              )}

                            {/* Chỉ show btn delete khi progressReport: 
                                  + Chưa được duyệt 
                                  + Và Chưa có progressReviews 
                                  + Và Không thuộc completed stage 
                            */}
                            {!item.approved &&
                              item.progressReviews.length <= 0 &&
                              item.stage.stageStatus.stageStatusId != 3 && (
                                <IconButton
                                  color="error"
                                  onClick={() =>
                                    handleOpenModalDeleteProgressReport(item)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                          </div>
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
                              {item.progressReportFiles?.map((file, index) => (
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
                                      handleOpenMenuOptionProgressReportFile(
                                        event,
                                        file
                                      )
                                    }
                                  >
                                    <MoreVertOutlinedIcon fontSize="small" />
                                  </IconButton>

                                  {/* MENU OPTION FILE */}
                                  <Menu
                                    id={`menu-progress-report-file-${file.progressReportFileId}`}
                                    anchorEl={anchorElProgressReport}
                                    open={
                                      Boolean(anchorElProgressReport) &&
                                      selectedFile?.progressReportFileId ===
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
                                        handleShowViewFile(e, file.pathFile)
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
                                          file.pathFile,
                                          file.nameFile
                                        )
                                      }
                                      className="hover:text-green-500 transition-all"
                                    >
                                      <FileDownloadOutlinedIcon />
                                      <span className="pl-2">Tải xuống</span>
                                    </MenuItem>
                                    {!item.approved && (
                                      <MenuItem
                                        onClick={(e) =>
                                          handleDeleteFile(e, file)
                                        }
                                        className="hover:text-red-500 transition-all"
                                      >
                                        <DeleteOutlineOutlinedIcon />
                                        <span className="pl-2">Xóa</span>
                                      </MenuItem>
                                    )}
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
                            <StudentProgressReview
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

      {/* DELETE PROGRESSREPORT MODAL : */}
      <Modal
        open={openDeleteProgressReportModal}
        onClose={() => setOpenDeleteProgressReportModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteProgressReportModal} className="w-[90%] md:w-[50%]">
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Xác nhận xóa?
            </Typography>
            <div>
              <p>
                Bạn có chắc chắn muốn xóa báo cáo tiến độ:
                <b className="pl-3">
                  {selectedProgressReport?.progressReportTitle}
                </b>
              </p>
              <div className="mt-3 space-x-3 text-right">
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setOpenDeleteProgressReportModal(false)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteProgressReport}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default StudentProgressReport;
