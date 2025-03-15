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
import {
  chooseStudentAction,
  getAllClassesByFacultyOfTeacherLeaderAction,
  getAllStudentsWithoutInstructor,
} from "../../../redux/TeacherLeader/Action";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import noResultImage from "../../../assets/images/no-result-img.png";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

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
    sortByField: "clazz.faculty.facultyName",
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
  {
    title: "Hành động",
  },
];

// FAKE DATA :
const fakeStudents = [
  {
    studentCode: "SV001",
    image: "https://via.placeholder.com/150",
    fullName: "Nguyễn Văn A",
    studentClass: {
      className: "CNTT - K14",
      faculty: {
        facultyName: "Công nghệ thông tin",
      },
    },
    semesters: [
      { semesterId: 1, semesterName: "Học kỳ 1" },
      { semesterId: 2, semesterName: "Học kỳ 2" },
    ],
    instructor: {
      fullName: "TS. Trần Minh B",
    },
    project: {
      projectName: "Hệ thống quản lý sinh viên",
    },
  },
  {
    studentCode: "SV002",
    image: "https://via.placeholder.com/150",
    fullName: "Trần Thị B",
    studentClass: {
      className: "CNTT - K14",
      faculty: {
        facultyName: "Công nghệ thông tin",
      },
    },
    semesters: [{ semesterId: 1, semesterName: "Học kỳ 1" }],
    instructor: {
      fullName: "TS. Phạm Văn C",
    },
    project: null,
  },
  {
    studentCode: "SV003",
    image: "https://via.placeholder.com/150",
    fullName: "Lê Văn C",
    studentClass: {
      className: "KTPM - K14",
      faculty: {
        facultyName: "Kỹ thuật phần mềm",
      },
    },
    semesters: [
      { semesterId: 1, semesterName: "Học kỳ 1" },
      { semesterId: 2, semesterName: "Học kỳ 2" },
      { semesterId: 3, semesterName: "Học kỳ 3" },
    ],
    instructor: {
      fullName: "TS. Nguyễn Văn D",
    },
    project: {
      projectName: "Ứng dụng chat realtime",
    },
  },
  {
    studentCode: "SV004",
    image: "https://via.placeholder.com/150",
    fullName: "Hoàng Thị D",
    studentClass: {
      className: "HTTT - K14",
      faculty: {
        facultyName: "Hệ thống thông tin",
      },
    },
    semesters: [{ semesterId: 1, semesterName: "Học kỳ 1" }],
    instructor: {
      fullName: "TS. Lê Thị E",
    },
    project: null,
  },
];

const StudentManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [classId, setClassId] = useState("");

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { teacherLeaderReducer, semesterReducer } = useSelector(
    (store) => store
  );

  const isInstructorLoading = teacherLeaderReducer.isLoading;

  const colors = [
    "success",
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
  ];

  // get all info for pagination:
  const totalElements = teacherLeaderReducer.studentPagination?.totalElements;
  const pageSize = teacherLeaderReducer.studentPagination?.pageSize;
  const pageNumber = teacherLeaderReducer.studentPagination?.pageNumber;

  // get all classes by faculty of teacher leader :
  useEffect(() => {
    dispatch(getAllClassesByFacultyOfTeacherLeaderAction());
  }, [dispatch]);

  // get all students have no instructor
  useEffect(() => {
    const requestData = {};

    dispatch(getAllStudentsWithoutInstructor(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      studentPagination: {
        classId,
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllStudentsWithoutInstructor(requestData));
  };

  const handleFilterStudent = (pageNum) => {
    const requestData = {
      keyword,
      studentPagination: {
        classId,
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllStudentsWithoutInstructor(requestData));
  };

  // handle filter by keyword, semester, class, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(1);
  }, [keyword, classId]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setClassId("");
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

  // handle add student to temporary list:
  const handleAddStudentToTemporaryList = (studentCode) => {
    const requestData = {
      studentCode: studentCode,
      toast,
    };
    dispatch(chooseStudentAction(requestData));
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
    <Container className="my-10">
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
                <MenuItem value="">
                  <em>Học kỳ</em> {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                </MenuItem>
                {semesterReducer.semesterPagination?.content?.map((item) => {
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
                {teacherLeaderReducer.classes?.map((item) => {
                  return (
                    <MenuItem key={item.classId} value={item.classId}>
                      {item.className}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* FILTER BY CLASS */}
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Đề tài tốt nghiệp
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={classId}
                label="Đề tài tốt nghiệp"
                onChange={(e) => setClassId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Đề tài tốt nghiệp</em>{" "}
                  {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                </MenuItem>
                {teacherLeaderReducer.classes?.map((item) => {
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

        {/* TABLE */}
        {/* {teacherLeaderReducer.studentPagination?.content.length <= 0 ? (
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-52 h-52"
              src={noResultImage}
              alt="No result image"
            />
            <i className="text-center text-xl uppercase">Danh sách trống</i>
          </div>
        ) : ( */}
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
                            : item.sortByField && handleSortBy(item.sortByField)
                        }
                      >
                        <span className="select-none">{item.title}</span>
                        {sortBy === item.sortByField && sortDir === "asc" && (
                          <ArrowUpwardIcon fontSize="medium" />
                        )}
                        {sortBy === item.sortByField && sortDir === "desc" && (
                          <ArrowDownwardIcon fontSize="medium" />
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeStudents.map((item, index) => {
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
                        {item.semesters?.map((semesterItem, i) => {
                          return (
                            <p
                              className="flex items-center"
                              key={semesterItem.semesterId}
                            >
                              {semesterItem.semesterName}

                              {i !== item.semesters.length - 1 && (
                                <span className="ml-3">|</span>
                              )}
                            </p>
                          );
                        })}
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
                        <p>Đã đăng ký đề tài</p>
                      ) : (
                        <p>Chưa đăng ký đề tài</p>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* )} */}

        {/* END TABLE */}

        {/* Pagination */}
        {teacherLeaderReducer.studentPagination?.content.length > 0 && (
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
