import {
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";

const StageDetail = () => {
  return (
    <div className="bg-green-100 p-5 rounded-md shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="flex flex-col justify-center md:flex-row md:items-center">
            <p className="pr-2">
              <Chip
                className="font-bold"
                sx={{ borderRadius: 1 }}
                label="Giai đoạn 1"
                color="primary"
                size="small"
              />
            </p>
            <p>
              Từ{" "}
              <span className="text-gray-600 font-bold italic">03-01-2024</span>
              <span className="px-2">đến</span>
              <span className="text-gray-600 font-bold italic">03-01-2024</span>
            </p>
          </div>
          <Chip label="Đang thực hiện" color="warning" size="small" />
        </div>
        <div className="flex gap-3 items-center">
          <FormControl size="small" className="bg-white rounded-md w-60">
            <InputLabel>Trạng thái giai đoạn</InputLabel>
            <Select
              // value={sortOrder}
              // onChange={(e) => setSortOrder(e.target.value)}
              label="Trạng thái giai đoạn"
            >
              <MenuItem value="11">Chưa mở</MenuItem>
              <MenuItem value="22">Đang thực hiện</MenuItem>
              <MenuItem value="33">Đã hoàn thành</MenuItem>
            </Select>
          </FormControl>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded-md mt-3 space-y-3">
        <p>
          <b>Tiêu đề: </b> <span>Tiến hành thực hiện giai đoạn 1</span>
        </p>
        <p>
          <b>Nội dung: </b>{" "}
          <span className="text-justify">
            Tiến hành thực hiện giai đoạn 1 Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ad, aspernatur libero quisquam, error
            cumque veniam non veritatis ducimus expedita cum voluptatibus rerum
            esse dolorem vitae laboriosam nemo ut earum vel.
          </span>
        </p>
        <div className="bg-gray-50 border p-3 rounded-lg">
          <h4 className="text-gray-800 font-medium mb-2">📂 Danh sách file:</h4>
          {true ? (
            <ul className="space-y-2">
              {[1, 1].map((file, index) => (
                <div
                  className="flex bg-blue-100 border border-gray-300 justify-between p-1 rounded-md cursor-pointer hover:bg-blue-200 items-center lg:w-[70%] ml-5 transition-all"
                  // onClick={(e) => handleShowViewFile(e, file.pathFile)}
                  // key={file.projectFileId}
                  key={index}
                >
                  <div className="flex gap-3 items-center">
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
            <p className="text-center text-gray-500 italic">
              Danh sách file trống
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StageDetail;
