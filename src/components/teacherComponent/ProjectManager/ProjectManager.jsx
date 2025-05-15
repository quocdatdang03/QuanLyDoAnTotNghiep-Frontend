import {
  Backdrop,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Fade,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import noResultImage from "../../../assets/images/no-result-img.png";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { getAllClassesByFacultyOfTeacherAction } from "../../../redux/Teacher/Action";
import {
  getAllSemestersWithoutPaginationAction,
  getCurrentSemesterAction,
} from "../../../redux/Semester/Action";
import {
  approveProjectAction,
  declineProjectAction,
  getAllProjectsByInstructorAction,
  getProjectByStudentCodeAction,
} from "../../../redux/InstructorProject/Action";

// Style for MODAL Project Details:
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 6,
  paddingX: 4,
  paddingBottom: 4,
};

// Table header data:
const tableHeaderDatas = [
  {
    title: "STT",
  },
  {
    title: "Tên đề tài",
    sortByField: "projectName",
  },
  {
    title: "Mã sinh viên",
    sortByField: "studentSemester.student.account.code",
  },
  {
    title: "Họ tên",
    sortByField: "studentSemester.student.account.fullName",
  },
  {
    title: "Lớp",
    sortByField: "studentSemester.student.clazz.className",
  },
  {
    title: "Học kỳ",
  },
  {
    title: "Giảng viên hướng dẫn",
  },

  // {
  //   title: "Ngày đăng ký",
  // },
  {
    title: "Trạng thái",
  },
  {
    title: "Hành động",
  },
];

const ProjectManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [classId, setClassId] = useState("");
  const [openModalProjectDetails, setOpenModalProjectDetails] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState(
    "studentSemester.student.account.fullName"
  );
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { instructorProjectReducer, teacherReducer, semesterReducer } =
    useSelector((store) => store);

  const isInstructorLoading = teacherReducer.isLoading;
  const projectStatusId =
    instructorProjectReducer.project?.projectStatus.projectStatusId;

  // get all info for pagination:
  const totalElements =
    instructorProjectReducer.projectPagination?.totalElements;
  const pageSize = instructorProjectReducer.projectPagination?.pageSize;
  const pageNumber = instructorProjectReducer.projectPagination?.pageNumber;

  // get all classes by faculty of teacher and get all semesters:
  useEffect(() => {
    dispatch(getAllClassesByFacultyOfTeacherAction());
    dispatch(getAllSemestersWithoutPaginationAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentSemesterAction());
  }, []);

  // Khi lấy được học kỳ hiện tại từ store thì cập nhật semesterId
  useEffect(() => {
    if (semesterReducer.currentSemester?.semesterId) {
      setSemesterId(semesterReducer.currentSemester.semesterId);
    }
  }, [semesterReducer.currentSemester]);

  // get all projects by instructor
  useEffect(() => {
    const requestData = {};

    dispatch(getAllProjectsByInstructorAction(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      projectPagination: {
        semesterId,
        classId,
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllProjectsByInstructorAction(requestData));
  };

  const handleFilterProject = (pageNum) => {
    const requestData = {
      keyword,
      projectPagination: {
        semesterId,
        classId,
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllProjectsByInstructorAction(requestData));
  };

  // handle filter by keyword, semester, class, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterProject(1);
  }, [keyword, classId, semesterId]);

  // handle sort by and sort dir
  useEffect(() => {
    handleFilterProject(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setClassId("");
    setSemesterId(semesterReducer.currentSemester?.semesterId);
    setCurrentPageNum(1);
    setSortDir("asc");
    setSortBy("studentSemester.student.account.fullName");
  };

  // handle sort dir:
  const handleSortDir = () => {
    if (sortDir === "asc") setSortDir("desc");
    else setSortDir("asc");
  };

  // handle set sort by:
  const handleSortBy = (fieldName) => {
    console.log("SET:" + fieldName);
    setSortBy(fieldName);
  };

  const handleOpenMenuOptionFile = (event, currentFile) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedFile(currentFile);
  };
  const handleCloseMenuOptionFile = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  // handle close MODAL Project Details:
  const handleCloseModalProjectDetails = () => {
    setOpenModalProjectDetails(false);
  };

  // handle open MODAL Project Details:
  const handleOpenModalProjectDetails = (studentCode, semesterIdOfProject) => {
    const requestData = {
      studentCode,
      semesterIdOfProject,
    };
    dispatch(getProjectByStudentCodeAction(requestData));

    setOpenModalProjectDetails(true);
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

  // handle decline project:
  const handleDeclineProject = (projectId) => {
    const requestData = {
      projectId,
      toast,
    };

    dispatch(declineProjectAction(requestData));

    handleCloseModalProjectDetails();
  };

  // handle approve project:
  const handleApproveProject = (projectId) => {
    const requestData = {
      projectId,
      toast,
    };

    dispatch(approveProjectAction(requestData));

    handleCloseModalProjectDetails();
  };

  // handle loading :
  useEffect(() => {
    if (isInstructorLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isInstructorLoading]);

  return (
    <>
      <Container className="my-10">
        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 35 }}
        >
          DANH SÁCH ĐỀ TÀI CỦA SINH VIÊN
        </Typography>

        {/* DSSV chưa được phân GVHD */}
        <div>
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
            Danh sách đề tài tốt nghiệp
          </h1>
          {/* SEARCH & FILTER */}
          <div className="flex items-center gap-3">
            {/* INPUT SEARCH */}
            <div className="flex my-5">
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  // inputRef={inputSearchRef}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Tìm kiếm theo tên hoặc mã sinh viên"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <IconButton
                  color="primary"
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => handleFilterProject(1)}
                >
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton sx={{ p: "10px" }} onClick={handleClearSearch}>
                  <RefreshIcon />
                </IconButton>
              </Paper>
              {/* END INPUT SEARCH */}

              {/* FILTER SELECT */}
            </div>
            <div className="flex gap-5 w-full">
              {/* FILTER BY SEMESTER */}
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Học kỳ</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={semesterId}
                  label="Học kỳ"
                  onChange={(e) => setSemesterId(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Học kỳ</em>{" "}
                    {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                  </MenuItem>
                  {semesterReducer.semesters?.map((item) => {
                    return (
                      <MenuItem key={item.semesterId} value={item.semesterId}>
                        {item.semesterName}
                        {item.isCurrent && (
                          <b className="italic pl-1">(Học kỳ hiện tại)</b>
                        )}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* FILTER BY CLASS */}
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Lớp</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={classId}
                  label="Lớp"
                  onChange={(e) => setClassId(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Lớp</em> {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                  </MenuItem>
                  {teacherReducer.classes?.map((item) => {
                    return (
                      <MenuItem key={item.classId} value={item.classId}>
                        {item.className}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          {/* END SEARCH & FILTER */}

          {keyword.trim() && (
            <h2 className="text-center mb-5 mt-2">
              <i>Kết quả danh sách sinh viên được tìm kiếm theo </i>
              {keyword.trim() && <b>{'từ khóa "' + keyword + '"'}</b>}
            </h2>
          )}

          {/* TABLE PROJECTS*/}
          {instructorProjectReducer.projectPagination?.content.length <= 0 ? (
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-52 h-52"
                src={noResultImage}
                alt="No result image"
              />
              <i className="text-center text-xl uppercase">Danh sách trống</i>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {/* TABLE HEADER */}
                    {tableHeaderDatas.map((item, index) => {
                      return (
                        <TableCell key={index} align="left">
                          <div
                            className={`flex items-center gap-3 ${item.sortByField && "cursor-pointer hover:underline"}`}
                            onClick={() =>
                              sortBy === item.sortByField
                                ? handleSortDir()
                                : item.sortByField &&
                                  handleSortBy(item.sortByField)
                            }
                          >
                            <span className="select-none">{item.title}</span>
                            {sortBy === item.sortByField &&
                              sortDir === "asc" && (
                                <ArrowUpwardIcon fontSize="medium" />
                              )}
                            {sortBy === item.sortByField &&
                              sortDir === "desc" && (
                                <ArrowDownwardIcon fontSize="medium" />
                              )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {instructorProjectReducer.projectPagination?.content.map(
                    (item, index) => {
                      return (
                        <TableRow key={item.projectId}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left" title={item.projectName}>
                            {item.projectName.length > 50
                              ? item.projectName.substring(0, 50) + "..."
                              : item.projectName}
                          </TableCell>
                          <TableCell align="left">
                            {item.student.studentCode}
                          </TableCell>
                          <TableCell align="left">
                            {item.student.fullName}
                          </TableCell>
                          <TableCell align="left">
                            {item.student.studentClass.className}
                          </TableCell>
                          <TableCell align="left">
                            {item.semester.semesterName}
                          </TableCell>

                          <TableCell align="left">
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex flex-wrap items-center gap-3">
                                <Chip
                                  label={item.student.instructor.fullName}
                                  variant="filled"
                                  color="info"
                                />
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell align="left">
                          {item.createdAt &&
                            new Date(item.createdAt).toLocaleString("en-GB")}
                        </TableCell> */}
                          <TableCell align="left">
                            <Chip
                              label={item.projectStatus.projectStatusName}
                              variant="filled"
                              color={`${item.projectStatus.projectStatusId === 1 ? "warning" : item.projectStatus.projectStatusId === 2 ? "primary" : item.projectStatus.projectStatusId === 3 ? "success" : "error"}`}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleOpenModalProjectDetails(
                                  item.student.studentCode,
                                  item.semester.semesterId
                                )
                              }
                            >
                              Phê duyệt
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* END TABLE */}

          {/* Pagination */}
          {instructorProjectReducer.projectPagination?.content.length > 0 && (
            <div className="flex items-center justify-center mt-10">
              <Pagination
                count={Math.ceil(totalElements / pageSize)}
                page={pageNumber}
                color="primary"
                onChange={handleChangePage}
              />
            </div>
          )}
        </div>
      </Container>

      {/* MODAL PROJECT DETAILS  */}
      <Modal
        open={openModalProjectDetails}
        onClose={handleCloseModalProjectDetails}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalProjectDetails}>
          <Box
            sx={style}
            className="relative rounded-md shadow-md w-[90vw] md:w-[60vw] max-h-[90vh] overflow-y-auto"
          >
            {/* Button close */}
            <div className="absolute top-1 right-1">
              <IconButton
                color="error"
                onClick={handleCloseModalProjectDetails}
              >
                <CloseIcon color="error" />
              </IconButton>
            </div>

            {/* PROJECT DETAILS */}
            <div>
              <Typography
                className="uppercase text-center"
                sx={{
                  fontSize: 25,
                  marginTop: 2,
                  marginBottom: 2,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                variant="h1"
                color="primary"
              >
                Phê duyệt đề tài
              </Typography>
              <h1 className="text-[#0355d2] font-bold uppercase pb-2 border-b-[2px] border-[#0355d2] mt-6 mb-5">
                Thông tin chi tiết của đề tài
              </h1>
              <Card className="w-full max-w-3xl mx-auto shadow-md border border-gray-200 rounded-lg bg-white p-5">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                  <Badge
                    className={`text-sm px-3 py-1 ${projectStatusId === 1 ? "bg-orange-100 text-orange-700" : projectStatusId === 2 ? "bg-blue-100 text-blue-700" : projectStatusId === 3 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-full`}
                  >
                    {
                      instructorProjectReducer.project?.projectStatus
                        .projectStatusName
                    }
                  </Badge>
                </div>
                <h1 className="text-md font-semibold text-gray-800 text-justify px-5 pt-2">
                  {instructorProjectReducer.project?.projectName}
                </h1>
                {/* Content */}
                <CardContent className="mt-4 space-y-4">
                  {/* Nội dung đề tài */}
                  <div className="">
                    <b className="mb-2 block">Mô tả đề tài:</b>
                    <p className="text-gray-700 text-justify w-full overflow-x-auto">
                      {instructorProjectReducer.project?.projectContent}
                    </p>
                  </div>

                  {/* Danh sách file */}
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <h4 className="font-medium text-gray-800 mb-2">
                      📂 Danh sách file:
                    </h4>
                    {instructorProjectReducer.project?.projectFiles.length >
                    0 ? (
                      <ul className="space-y-2">
                        {instructorProjectReducer.project?.projectFiles.map(
                          (file) => (
                            <div
                              className="bg-blue-100 ml-5 p-1 flex items-center justify-between rounded-md border border-gray-300 lg:w-[70%] hover:bg-blue-200 transition-all cursor-pointer"
                              onClick={(e) =>
                                handleShowViewFile(e, file.pathFile)
                              }
                              key={file.projectFileId}
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
                                open={Boolean(anchorEl)}
                                onClose={(e) => handleCloseMenuOptionFile(e)}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                              >
                                <MenuItem
                                  onClick={(e) =>
                                    handleShowViewFile(
                                      e,
                                      selectedFile?.pathFile
                                    )
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
                                      selectedFile?.pathFile,
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
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="italic text-gray-500 text-center">
                        Danh sách file trống
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {/* Thông tin sinh viên thực hiện đề tài */}
                    <div>
                      <b>Sinh viên thực hiện: </b>
                      <span className="pl-1">
                        {instructorProjectReducer.project?.student.fullName}
                        <span className="px-2">-</span>
                        {instructorProjectReducer.project?.student.studentCode}
                      </span>
                    </div>

                    {/* Thông tin GVHD đề tài */}
                    <div>
                      <b>Giảng viên hướng dẫn: </b>
                      <span className="pl-1">
                        {
                          instructorProjectReducer.project?.student.instructor
                            .fullName
                        }
                        <span className="px-2">-</span>
                        {
                          instructorProjectReducer.project?.student.instructor
                            .teacherCode
                        }
                      </span>
                    </div>
                  </div>

                  {/* Thông tin học kỳ */}
                  <p className="text-gray-500 text-sm border-t pt-3">
                    <strong className="pr-2">📅 Học kỳ:</strong>
                    {instructorProjectReducer.project?.semester.semesterName} (
                    {
                      instructorProjectReducer.project?.semester.schoolYear
                        .schoolYearName
                    }
                    )
                  </p>

                  <div className="text-center space-x-2">
                    <Button
                      variant="contained"
                      color="error"
                      disabled={
                        instructorProjectReducer.project?.projectStatus
                          .projectStatusId === 4
                      }
                      onClick={() =>
                        handleDeclineProject(
                          instructorProjectReducer.project?.projectId
                        )
                      }
                    >
                      Từ chối
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      disabled={
                        instructorProjectReducer.project?.projectStatus
                          .projectStatusId === 2
                      }
                      onClick={() =>
                        handleApproveProject(
                          instructorProjectReducer.project?.projectId
                        )
                      }
                    >
                      Phê duyệt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ProjectManager;
