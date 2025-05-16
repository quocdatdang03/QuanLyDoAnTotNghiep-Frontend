import {
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
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
import {
  getAllClassesByFacultyOfTeacherAction,
  getAllStudentsByInstructorAction,
} from "../../../redux/Teacher/Action";
import {
  getAllSemestersWithoutPaginationAction,
  getCurrentSemesterAction,
} from "../../../redux/Semester/Action";
import CustomBreadCrumb from "../../BreadCrumb/CustomBreadCrumb";

// Table header data:
const tableHeaderDatas = [
  {
    title: "STT",
  },
  {
    title: "Hình Ảnh",
  },
  {
    title: "Mã sinh viên",
    sortByField: "account.code",
  },
  {
    title: "Họ tên",
    sortByField: "account.fullName",
  },
  {
    title: "Lớp",
    sortByField: "clazz.className",
  },
  {
    title: "Khoa",
    // sortByField: "clazz.faculty.facultyName",
  },
  {
    title: "Học kỳ",
  },
  {
    title: "Giảng viên hướng dẫn",
  },
  {
    title: "Đề tài tốt nghiệp",
  },
  // {
  //   title: "Hành động",
  // },
];

const StudentManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [classId, setClassId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [havingProject, setHavingProject] = useState("");

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { teacherReducer, semesterReducer } = useSelector((store) => store);

  const isInstructorLoading = teacherReducer.isLoading;

  const colors = [
    "success",
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
  ];

  // get all info for pagination:
  const totalElements =
    teacherReducer.studentsOfInstructorPagination?.totalElements;
  const pageSize = teacherReducer.studentsOfInstructorPagination?.pageSize;
  const pageNumber = teacherReducer.studentsOfInstructorPagination?.pageNumber;

  // get all classes by faculty of teacher :
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

  // get all students have no instructor
  useEffect(() => {
    const requestData = {};

    dispatch(getAllStudentsByInstructorAction(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      studentPagination: {
        semesterId,
        classId,
        havingProject,
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllStudentsByInstructorAction(requestData));
  };

  const handleFilterStudent = (pageNum) => {
    const requestData = {
      keyword,
      studentPagination: {
        semesterId,
        classId,
        havingProject,
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllStudentsByInstructorAction(requestData));
  };

  // handle filter by keyword, semester, class, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(1);
  }, [keyword, classId, semesterId, havingProject]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setClassId("");
    setSemesterId(semesterReducer.currentSemester?.semesterId);
    setHavingProject("");
    setCurrentPageNum(1);
    setSortDir("asc");
    setSortBy("account.fullName");
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
    <Container className="my-10 py-10" component={Paper}>
      {/* Breadcrumbs */}
      <CustomBreadCrumb
        links={[
          {
            label: "Danh sách sinh vên được phân công",
            href: "/teacher/students",
          },
        ]}
      />

      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 35 }}
      >
        DANH SÁCH SINH VIÊN ĐƯỢC PHÂN CÔNG
      </Typography>

      {/* DSSV chưa được phân GVHD */}
      <div>
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
          Danh sách sinh viên
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
                onClick={() => handleFilterStudent(1)}
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

            {/* FILTER BY PROJECT */}
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Đề tài tốt nghiệp
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={havingProject}
                label="Đề tài tốt nghiệp"
                onChange={(e) => setHavingProject(e.target.value)}
              >
                <MenuItem value="">
                  <em>Đề tài tốt nghiệp</em>{" "}
                  {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                </MenuItem>
                <MenuItem value={true}>Đã đăng ký đề tài</MenuItem>
                <MenuItem value={false}>Chưa đăng ký đề tài</MenuItem>
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

        {/* TABLE */}
        {teacherReducer.studentsOfInstructorPagination?.content.length <= 0 ? (
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
                          {sortBy === item.sortByField && sortDir === "asc" && (
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
                {teacherReducer.studentsOfInstructorPagination?.content.map(
                  (item, index) => {
                    return (
                      <TableRow key={item.studentCode}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">
                          <img
                            className="w-16 h-16 object-cover object-center rounded-"
                            src={item.image}
                            alt={item.fullName}
                          />
                        </TableCell>
                        <TableCell align="left">{item.studentCode}</TableCell>
                        <TableCell align="left">{item.fullName}</TableCell>
                        <TableCell align="left">
                          {item.studentClass.className}
                        </TableCell>
                        <TableCell align="left">
                          {item.studentClass.faculty.facultyName}
                        </TableCell>
                        <TableCell align="left">
                          <div className="flex items-center gap-3">
                            <p
                              className="flex items-center"
                              key={item.semester.semesterId}
                            >
                              {item.semester.semesterName}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <Chip
                                label={item.instructor.fullName}
                                variant="filled"
                                color="info"
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          {item.project ? (
                            <div>
                              <p className="text-green-500 font-semibold italic">
                                Đã đăng ký đề tài
                              </p>
                              <p className="mt-1 italic text-gray-500">
                                {item.project.createdAt &&
                                  new Date(
                                    item.project.createdAt
                                  ).toLocaleString("en-GB")}
                              </p>
                            </div>
                          ) : (
                            <p className="text-red-500 font-semibold italic">
                              Chưa đăng ký đề tài
                            </p>
                          )}
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
        {teacherReducer.studentsOfInstructorPagination?.content.length > 0 && (
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
  );
};

export default StudentManager;
