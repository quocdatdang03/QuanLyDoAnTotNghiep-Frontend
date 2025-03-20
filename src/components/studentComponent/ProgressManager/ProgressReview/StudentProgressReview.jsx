import React from "react";
import { Chip, IconButton } from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import defaultAvatar from "../../../../assets/images/default-avatar.png";

const StudentProgressReview = () => {
  return (
    <div className="flex gap-5 border p-3 rounded-md shadow-md bg-blue-50">
      <img
        src={defaultAvatar}
        className="w-10 h-10 rounded-full object-cover object-center"
      />
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-600">
            <b>GVHD: </b>Đặng Quốc Đạt
          </p>
          <Chip
            label="Từ chối"
            size="small"
            color={false ? "success" : "error"}
          />
        </div>
        <Chip
          sx={{ borderRadius: 1 }}
          label="Đánh giá giai đoạn 1"
          size="small"
          color="success"
        />
        <p>
          <b className="pr-2">Tiêu đề:</b>
          <span>Tiêu đề của báo cáo</span>
        </p>
        <p>
          <b className="pr-2">Nội dung:</b>
          <span className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            temporibus suscipit consectetur, quidem asperiores eligendi facilis
            accusantium ex non officia nulla totam laudantium itaque quis,
            aspernatur dolorem. Excepturi, dolorem deserunt!
          </span>
        </p>

        {/* Progress Review File */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <h4 className="font-medium text-gray-800 mb-2">📂 Danh sách file:</h4>
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

        <p className="text-gray-500 italic text-right">16/03/2025, 15:06:27</p>
      </div>
    </div>
  );
};

export default StudentProgressReview;
