import {
  Backdrop,
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
  Select,
  Typography,
} from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteStageAction,
  deleteStageFileByIdAction,
  getAllStageStatusesAction,
  getStageByIdAction,
  updateStageStatusAction,
} from "../../../redux/InstructorStage/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// style of modal
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

const StageDetail = ({ stage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteStageModal, setOpenDeleteStageModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);

  const { instructorStageReducer } = useSelector((store) => store);

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
      stageFileId: currentFile.stageFileId,
      toast,
    };

    dispatch(deleteStageFileByIdAction(requestData));

    handleCloseMenuOptionFile(e);
  };
  // ++++++++++++++++++++++++++++++ END LOGIC CODE RELATED FILE:

  // get all stage status
  useEffect(() => {
    dispatch(getAllStageStatusesAction());
  }, []);

  // handle update stage status:
  const handleUpdateStageStatus = (currentStageStatusId) => {
    const requestData = {
      updateStageStatusData: {
        stageId: stage.stageId,
        stageStatusId: currentStageStatusId,
      },
      toast,
    };

    dispatch(updateStageStatusAction(requestData));
  };

  // handle navigate to edit stage page:
  const handleNavigateToEditStagePage = () => {
    const requestData = {
      stageId: stage.stageId,
    };
    dispatch(getStageByIdAction(requestData));

    navigate("/teacher/stages/edit");
  };

  // handle delete stage:
  const handleDeleteStage = () => {
    const requestData = {
      stageId: stage.stageId,
      toast,
    };
    dispatch(deleteStageAction(requestData));
    setOpenDeleteStageModal(false);
  };

  return (
    <>
      <div className="bg-green-100 p-5 rounded-md shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="flex flex-col justify-center md:flex-row md:items-center">
              <p>{stage.stageOrder}</p>
              <p className="pr-2">
                <Chip
                  className="font-bold"
                  sx={{ borderRadius: 1 }}
                  label={stage.stageName}
                  color="primary"
                  size="small"
                />
              </p>
              <p>
                Từ{" "}
                <span className="text-gray-600 font-bold italic">
                  {new Date(stage.startDate).toLocaleString()}
                </span>
                <span className="px-2">đến</span>
                <span className="text-gray-600 font-bold italic">
                  {new Date(stage.endDate).toLocaleString()}
                </span>
              </p>
            </div>
            <Chip
              label={stage?.stageStatus?.stageStatusName}
              color={
                stage?.stageStatus?.stageStatusId === 1
                  ? "warning"
                  : stage?.stageStatus?.stageStatusId === 2
                    ? "info"
                    : "success"
              }
              size="small"
            />
          </div>
          <div className="flex gap-3 items-center">
            <FormControl size="small" className="bg-white rounded-md w-60">
              <InputLabel>Trạng thái giai đoạn</InputLabel>
              <Select
                value={stage.stageStatus?.stageStatusId}
                onChange={(e) => handleUpdateStageStatus(e.target.value)}
                label="Trạng thái giai đoạn"
              >
                {instructorStageReducer.stageStatuses?.map((item) => (
                  <MenuItem key={item.stageStatusId} value={item.stageStatusId}>
                    {item.stageStatusName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton color="primary" onClick={handleNavigateToEditStagePage}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => setOpenDeleteStageModal(true)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md mt-3 space-y-3">
          <p>
            <b>Tiêu đề: </b> <span>{stage.stageTitle}</span>
          </p>
          <p>
            <b>Nội dung: </b>{" "}
            <span className="text-justify">{stage.stageContent}</span>
          </p>
          <div className="bg-gray-50 border p-3 rounded-lg">
            <h4 className="text-gray-800 font-medium mb-2">
              📂 Danh sách file:
            </h4>
            {stage.stageFiles.length > 0 ? (
              <ul className="space-y-2">
                {stage.stageFiles.map((file, index) => (
                  <div
                    className="flex bg-blue-100 border border-gray-300 justify-between p-1 rounded-md cursor-pointer hover:bg-blue-200 items-center lg:w-[70%] ml-5 transition-all"
                    onClick={(e) => handleShowViewFile(e, file.pathFile)}
                    key={file.stageFileId}
                  >
                    <div className="flex gap-3 items-center">
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
                        onClick={(e) => handleDeleteFile(e, selectedFile)}
                        className="hover:text-red-500 transition-all"
                      >
                        <DeleteOutlineOutlinedIcon />
                        <span className="pl-2">Xóa</span>
                      </MenuItem>
                    </Menu>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 italic">
                Danh sách file trống
              </p>
            )}
          </div>
        </div>
      </div>

      {/* DELETE STAGE MODAL : */}
      <Modal
        open={openDeleteStageModal}
        onClose={() => setOpenDeleteStageModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteStageModal} className="w-[90%] md:w-[50%]">
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Xác nhận xóa?
            </Typography>
            <div>
              <p>
                Bạn có chắc chắn muốn xóa giai đoạn:{" "}
                <Chip label={stage?.stageName} color="primary" />
              </p>
              <div className="mt-3 space-x-3 text-right">
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setOpenDeleteStageModal(false)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDeleteStage}
                  color="error"
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

export default StageDetail;
