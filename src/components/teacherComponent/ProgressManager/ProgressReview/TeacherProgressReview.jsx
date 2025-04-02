import {
  Backdrop,
  Box,
  Button,
  Chip,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import defaultAvatar from "../../../../assets/images/default-avatar.png";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProgressReviewByIdAction,
  deleteProgressReviewFileByIdAction,
} from "../../../../redux/InstructorProgress/Action";

// style of delete progress review modal:
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

const TeacherProgressReview = ({ progressReport, progressReview }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { instructorProgressReducer } = useSelector((store) => store);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDeleteProgressReviewModal, setOpenDeleteProgressReviewModal] =
    useState(false);

  // handle open delete progress review modal
  const handleOpenModalDeleteProgressReview = (progressReport) => {
    setOpenDeleteProgressReviewModal(true);
  };

  // handle delete progress review
  const handleDeleteProgressReview = () => {
    const requestData = {
      progressReviewId: progressReview.progressReviewId,
      toast,
    };

    console.log(requestData);
    dispatch(deleteProgressReviewByIdAction(requestData));

    setOpenDeleteProgressReviewModal(false);
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

    dispatch(deleteProgressReviewFileByIdAction(requestData));

    handleCloseMenuOptionFile(e);
  };
  // ++++++++++++++++++++++++++++++ END LOGIC CODE RELATED FILE:

  return (
    <>
      <div className="flex gap-5 border p-3 rounded-md shadow-md bg-blue-50">
        <img
          src={progressReview.teacher?.image || defaultAvatar}
          className="w-10 h-10 rounded-full object-cover object-center"
        />
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-gray-600">
                  <b>GVHD: </b>
                  {progressReview.teacher?.fullName}
                </p>
                <Chip
                  label={progressReview.approved ? "Đã duyệt" : "Chưa duyệt"}
                  size="small"
                  color={progressReview.approved ? "success" : "error"}
                />
              </div>
              <Chip
                sx={{ borderRadius: 1 }}
                label={`Đánh giá ${progressReport.stage?.stageName.toLowerCase()}`}
                size="small"
                color="success"
              />
            </div>

            {/* Chỉ show btn delete và btn edit khi progressReviewprogressReview: 
                    + Chưa được duyệt 
                    + Và Không thuộc completed stage 
            */}
            {!progressReview.approved &&
              progressReport.stage.stageStatus.stageStatusId !== 3 && (
                <div className="flex items-center gap-3">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(
                        `/teacher/progress/${progressReport?.progressReportId}/project/${instructorProgressReducer.project?.projectId}/review/${progressReview?.progressReviewId}/update`
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      handleOpenModalDeleteProgressReview(progressReview)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
          </div>
          <p>
            <b className="pr-2">Tiêu đề:</b>
            <span>{progressReview.progressReviewTitle}</span>
          </p>
          <p>
            <b className="pr-2">Nội dung:</b>
            <span className="text-justify">
              {progressReview.progressReviewContent}
            </span>
          </p>

          {/* Progress Review File */}
          <div className="bg-gray-50 p-3 rounded-lg border">
            <h4 className="font-medium text-gray-800 mb-2">
              📂 Danh sách file:
            </h4>
            {progressReview.progressReviewFiles?.length > 0 ? (
              <ul className="space-y-2">
                {progressReview.progressReviewFiles?.map((file, index) => (
                  <div
                    className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                    onClick={(e) => handleShowViewFile(e, file.pathFile)}
                    key={file.progressReviewFileId}
                  >
                    <div className="flex items-center gap-3">
                      <ArticleOutlinedIcon fontSize="medium" />
                      <p className="text-sm">{file.nameFile}</p>
                    </div>
                    <IconButton
                      onClick={(event) => handleOpenMenuOptionFile(event, file)}
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
                          file.progressReviewFileId
                      }
                      onClose={(e) => handleCloseMenuOptionFile(e)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                    >
                      <MenuItem
                        onClick={(e) => handleShowViewFile(e, file?.pathFile)}
                        className="hover:text-blue-500 transition-all"
                      >
                        <RemoveRedEyeOutlinedIcon />
                        <span className="pl-2">Xem chi tiết</span>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => handleDownloadFile(e, file?.pathFile)}
                        className="hover:text-green-500 transition-all"
                      >
                        <FileDownloadOutlinedIcon />
                        <span className="pl-2">Tải xuống</span>
                      </MenuItem>

                      {/* Chỉ show btn delete file khi progressReview: 
                          + Chưa được duyệt 
                          + Và Không thuộc completed stage 
                    */}
                      {!progressReview.approved &&
                        progressReport?.stage.stageStatus.stageStatusId !=
                          3 && (
                          <MenuItem
                            onClick={(e) => handleDeleteFile(e, file)}
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
            {new Date(progressReview?.createdDate).toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      {/* DELETE PROGRESSREVIEW MODAL : */}
      <Modal
        open={openDeleteProgressReviewModal}
        onClose={() => setOpenDeleteProgressReviewModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteProgressReviewModal} className="w-[90%] md:w-[50%]">
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Xác nhận xóa?
            </Typography>
            <div>
              <p>
                Bạn có chắc chắn muốn xóa báo cáo tiến độ:
                <b className="pl-3">{progressReview?.progressReviewTitle}</b>
              </p>
              <div className="mt-3 space-x-3 text-right">
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setOpenDeleteProgressReviewModal(false)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteProgressReview}
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

export default TeacherProgressReview;
