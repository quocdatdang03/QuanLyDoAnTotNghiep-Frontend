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

import { getAllClassesByFacultyOfTeacherAction } from "../../../redux/Teacher/Action";
import {
  getAllSemestersWithoutPaginationAction,
  getCurrentSemesterAction,
} from "../../../redux/Semester/Action";
import { getAllProjectsByInstructorAction } from "../../../redux/InstructorProject/Action";
import { getProjectByIdAction } from "../../../redux/InstructorProgress/Action";
import CustomBreadCrumb from "../../BreadCrumb/CustomBreadCrumb";

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

const TeacherProgressManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [classId, setClassId] = useState("");

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState(
    "studentSemester.student.account.fullName"
  );
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { instructorProjectReducer, teacherReducer, semesterReducer } =
    useSelector((store) => store);

  const isInstructorLoading = teacherReducer.isLoading;

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

  // handle navigate to progress manager detail:
  const handleNavigateToProgressManagerDetail = (projectId) => {
    navigate(`/teacher/progress/detail/project/${projectId}`);

    // dispatch(getProjectByIdAction(requestData));
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
      <Container className="my-10 py-10" component={Paper}>
        {/* Breadcrumbs */}
        <CustomBreadCrumb
          links={[
            { label: "Quản lý tiến độ", href: "/teacher/progress/manage" },
          ]}
        />
        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 35 }}
        >
          QUẢN LÝ TIẾN ĐỘ
        </Typography>

        {/* DSSV chưa được phân GVHD */}
        <div>
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
            Danh sách đề tài tốt nghiệp cần quản lý
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
              <Table sx={{ minWidth: 700 }}>
                <TableHead className="bg-blue-900">
                  <TableRow>
                    {/* TABLE HEADER */}
                    {tableHeaderDatas.map((item, index) => {
                      return (
                        <TableCell
                          key={index}
                          align="left"
                          sx={{ color: "white" }}
                        >
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
                                handleNavigateToProgressManagerDetail(
                                  item.projectId
                                )
                              }
                            >
                              Quản lý tiến độ
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
    </>
  );
};

export default TeacherProgressManager;
