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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ForumIcon from "@mui/icons-material/Forum";

import defaultAvatar from "../../../../assets/images/default-avatar.png";
import React, { useState } from "react";
import StudentProgressReview from "../ProgressReview/StudentProgressReview";

const items = [
  { id: 1, title: "Accordion 1", content: "Nội dung của Accordion 1" },
  { id: 2, title: "Accordion 2", content: "Nội dung của Accordion 2" },
  { id: 3, title: "Accordion 3", content: "Nội dung của Accordion 3" },
];

const StudentProgressReport = () => {
  const [openId, setOpenId] = useState(null);

  const showAnswerOfProgressReport = (id) => {
    setOpenId(openId === id ? null : id);
  };

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
      {/* Dropdown chọn sắp xếp */}
      <div className="flex justify-end mt-3">
        <FormControl size="small" className="w-60 bg-white rounded-md">
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select
            // value={sortOrder}
            // onChange={(e) => setSortOrder(e.target.value)}
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
          {items.map((item) => (
            <Accordion
              key={item.id}
              expanded={openId === item.id}
              className="border border-gray-300 rounded-md"
            >
              {/* PROGRESS REPORT OF STUDENT */}
              <AccordionSummary id={`panel-${item.id}-header`}>
                <div className="flex gap-5">
                  <img
                    src={defaultAvatar}
                    className="w-10 h-10 rounded-full object-cover object-center"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-gray-600">
                          Đặng Quốc Đạt
                        </p>
                        <Chip
                          label="Chưa duyệt"
                          size="small"
                          color={false ? "success" : "error"}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                    <Chip
                      sx={{ borderRadius: 1 }}
                      label="Giai đoạn 1"
                      size="small"
                      color="primary"
                    />
                    <p>
                      <b className="pr-2">Tiêu đề:</b>
                      <span>Tiêu đề của báo cáo</span>
                    </p>
                    <p>
                      <b className="pr-2">Nội dung:</b>
                      <span className="text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa temporibus suscipit consectetur, quidem asperiores
                        eligendi facilis accusantium ex non officia nulla totam
                        laudantium itaque quis, aspernatur dolorem. Excepturi,
                        dolorem deserunt!
                      </span>
                    </p>

                    {/* Progress Report File */}
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

                    <p className="text-gray-500 italic text-right">
                      16/03/2025, 15:06:27
                    </p>

                    <div className="text-right">
                      <Button
                        variant="outlined"
                        onClick={() => showAnswerOfProgressReport(item.id)}
                      >
                        <span className="pr-2">Xem phản hồi</span>
                        <Badge badgeContent={5} color="error">
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
                  {[1, 1].map((item, index) => {
                    return <StudentProgressReview key={index} />;
                  })}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default StudentProgressReport;
