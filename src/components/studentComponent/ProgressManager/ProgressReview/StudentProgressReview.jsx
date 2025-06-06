import React, { useState } from "react";
import { Chip, IconButton, Menu, MenuItem } from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import defaultAvatar from "../../../../assets/images/default-avatar.png";
import toast from "react-hot-toast";

const StudentProgressReview = ({ progressReview, progressReport }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <div className="flex gap-5 border p-3 rounded-md shadow-md bg-blue-50">
      <img
        src={progressReview.teacher.image || defaultAvatar}
        className="w-10 h-10 rounded-full object-cover object-center"
      />
      <div className="space-y-2 w-full">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-600">
            <b>GVHD: </b>
            {progressReview.teacher.fullName}
          </p>
          <Chip
            label={progressReview.approved ? "Đã duyệt" : "Chưa duyệt"}
            size="small"
            color={progressReview.approved ? "success" : "error"}
          />
        </div>
        <Chip
          sx={{ borderRadius: 1 }}
          label={"Đánh giá " + progressReport.stage.stageName.toLowerCase()}
          size="small"
          color="success"
        />
        <p>
          <b className="pr-2">Tiêu đề:</b>
          <span>{progressReview.progressReviewTitle}</span>
        </p>
        <p>
          <b className="pr-2">Nội dung:</b>
          <div
            className="prose prose-sm max-w-none ml-3"
            dangerouslySetInnerHTML={{
              __html: progressReview.progressReviewContent,
            }}
          />
        </p>

        {/* Progress Review File */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <h4 className="font-medium text-gray-800 mb-2">📂 Danh sách file:</h4>
          {progressReview.progressReviewFiles.length > 0 ? (
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
                      onClick={(e) =>
                        handleDownloadFile(e, file?.pathFile, file.nameFile)
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

        <div
          className={`flex items-center ${progressReview.updatedDate ? "justify-between" : "justify-end"} flex-wrap gap-3`}
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          {progressReview.updatedDate && (
            <div className="flex items-center gap-1">
              <span className="text-gray-600">Cập nhật vào lúc:</span>
              <p className="text-gray-500 italic text-right">
                {new Date(progressReview.updatedDate).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Đã tạo vào lúc:</span>
            <p className="text-gray-500 italic text-right">
              {new Date(progressReview.createdDate).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressReview;
