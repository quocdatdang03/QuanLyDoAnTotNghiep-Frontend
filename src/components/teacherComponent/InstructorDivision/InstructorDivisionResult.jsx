import {
  Backdrop,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Fade,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
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
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import noResultImage from "../../../assets/images/no-result-img.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  changeInstructorOfStudentAction,
  getAllClassesByFacultyOfTeacherLeaderAction,
  getAllInstructorsByFacultyOfTeacherLeaderAction,
  getAllStudentsHavingInstructorAction,
  removeInstructorFromStudentAction,
} from "../../../redux/TeacherLeader/Action";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";
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
    sortByField: "clazz.faculty.facultyName",
  },
  {
    title: "Học kỳ",
  },
  {
    title: "Giảng viên hướng dẫn",
    sortByField: "instructor.account.fullName",
  },
  {
    title: "Hành động",
  },
];

const tableSelectedStudentHeaderDatas = [
  {
    title: "Hình Ảnh",
  },
  {
    title: "Mã sinh viên",
  },
  {
    title: "Họ tên",
  },
  {
    title: "Lớp",
  },
  {
    title: "Khoa",
  },
  {
    title: "Học kỳ",
  },
  {
    title: "Giảng viên hướng dẫn",
  },
];

const tableInstructorHeaderDatas = [
  {
    title: "STT",
  },
  {
    title: "Hình ảnh",
  },
  {
    title: "Mã giảng viên",
  },
  {
    title: "Họ tên",
  },
  {
    title: "Học vị",
  },
  {
    title: "Khoa",
  },
  {
    title: "Hành động",
  },
];

// Style for MODAL Instructor:
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

const InstructorDivisionResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [classId, setClassId] = useState("");
  const [instructorCode, setInstructorCode] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openModalInstructor, setOpenModalInstructor] = useState(false);

  const colors = [
    "success",
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
  ];

  const { teacherLeaderReducer } = useSelector((store) => store);

  const isInstructorLoading = teacherLeaderReducer.isLoading;

  // get all info for pagination:
  const totalElements =
    teacherLeaderReducer.studentHavingInstructorPagination?.totalElements;
  const pageSize =
    teacherLeaderReducer.studentHavingInstructorPagination?.pageSize;
  const pageNumber =
    teacherLeaderReducer.studentHavingInstructorPagination?.pageNumber;

  // get all classes and instructors by faculty of teacher leader :
  useEffect(() => {
    dispatch(getAllClassesByFacultyOfTeacherLeaderAction());

    // get all instructors:
    dispatch(getAllInstructorsByFacultyOfTeacherLeaderAction());
  }, [dispatch]);

  // get all students having instructor
  useEffect(() => {
    const requestData = {};

    dispatch(getAllStudentsHavingInstructorAction(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      studentPagination: {
        pageNumber: value,
        sortDir,
        sortBy,
        classId,
        instructorCode,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllStudentsHavingInstructorAction(requestData));
  };

  const handleFilterStudent = (pageNum) => {
    const requestData = {
      keyword,
      studentPagination: {
        pageNumber: pageNum,
        sortDir,
        sortBy,
        classId,
        instructorCode,
      },
    };

    console.log(requestData);

    dispatch(getAllStudentsHavingInstructorAction(requestData));
  };

  // handle filter by keyword, class, instructor (teacher)
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(1);
  }, [keyword, classId, instructorCode]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(currentPageNum);
  }, [sortBy, sortDir, instructorCode]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setClassId("");
    setInstructorCode("");
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

  // handle close MODAL Instructor:
  const handleCloseModalInstructor = () => {
    setOpenModalInstructor(false);
  };

  // handle open MODAL Instructor:
  const handleOpenModalInstructor = (instructor) => {
    setSelectedStudent(instructor);

    // get all instructors:
    dispatch(getAllInstructorsByFacultyOfTeacherLeaderAction());

    setOpenModalInstructor(true);
  };

  // handle change instructor:
  const handleChangeInstructor = (studentCode, instructorCode) => {
    const requestData = {
      changeInstructorData: {
        studentCode,
        teacherCode: instructorCode,
      },
      toast,
    };

    dispatch(changeInstructorOfStudentAction(requestData));

    setOpenModalInstructor(false);
  };

  // handle remove instructor from student:
  const handleRemoveInstructorFromStudent = (studentCode, instructorCode) => {
    const requestData = {
      removeInstructorData: {
        studentCode,
        teacherCode: instructorCode,
      },
      toast,
      dispatch,
    };

    dispatch(removeInstructorFromStudentAction(requestData));

    setOpenModalInstructor(false);
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
            {
              label: "Phân chia GVHD",
              href: "/teacher/instructors",
            },
            {
              label: "Danh sách sinh viên đã phân chia GVHD",
              href: "/teacher/instructors/results",
            },
          ]}
        />

        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 30 }}
        >
          DANH SÁCH SINH VIÊN SAU KHI PHÂN CHIA GVHD
        </Typography>

        {/* DSSV đã được phân GVHD */}
        <div>
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

              {/* FILTER BY INSTRUCTOR */}
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Giảng viên hướng dẫn
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={instructorCode}
                  label="Giảng viên hướng dẫn"
                  onChange={(e) => setInstructorCode(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Giảng viên hướng dẫn</em>
                    {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                  </MenuItem>
                  {teacherLeaderReducer.instructors?.map((item) => {
                    return (
                      <MenuItem key={item.teacherCode} value={item.teacherCode}>
                        {item.fullName}
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
          {teacherLeaderReducer.studentHavingInstructorPagination?.content
            ?.length <= 0 ? (
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
                  {teacherLeaderReducer.studentHavingInstructorPagination?.content.map(
                    (item, index) => {
                      const instructorColor =
                        colors[item.instructor.accountId % colors.length];

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
                              <Chip
                                label={item.instructor.fullName}
                                variant="filled"
                                color={instructorColor}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() => handleOpenModalInstructor(item)}
                            >
                              Thay đổi GVHD
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
          {teacherLeaderReducer.studentHavingInstructorPagination?.content
            .length > 0 && (
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

      {/* MODAL CHOOSE INSTRUCTOR */}
      <Modal
        open={openModalInstructor}
        onClose={handleCloseModalInstructor}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalInstructor}>
          <Box
            sx={style}
            className="relative rounded-md shadow-md w-[95vw] md:w-[80vw] max-h-[90vh] overflow-y-auto"
          >
            {/* Button close */}
            <div className="absolute top-1 right-1">
              <IconButton color="error" onClick={handleCloseModalInstructor}>
                <CloseIcon color="error" />
              </IconButton>
            </div>
            <h1 className="text-center text-2xl font-medium uppercase mb-2">
              Thay đổi GVHD
            </h1>

            {/* SELECTED STUDENT INFO */}
            <Typography
              className="uppercase text-center"
              sx={{
                fontSize: 20,
                marginTop: 5,
                marginBottom: 2,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              variant="h1"
              color="primary"
            >
              THÔNG TIN SINH VIÊN ĐANG CHỌN
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead className="bg-blue-900">
                  <TableRow>
                    {/* TABLE HEADER */}
                    {tableSelectedStudentHeaderDatas.map((item, index) => {
                      return (
                        <TableCell
                          key={index}
                          align="left"
                          sx={{ color: "white" }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="select-none">{item.title}</span>
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    <TableRow>
                      <TableCell align="left">
                        <img
                          className="w-16 h-16 object-cover object-center rounded-"
                          src={selectedStudent?.image}
                          alt={selectedStudent?.fullName}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {selectedStudent?.studentCode}
                      </TableCell>
                      <TableCell align="left">
                        {selectedStudent?.fullName}
                      </TableCell>
                      <TableCell align="left">
                        {selectedStudent?.studentClass.className}
                      </TableCell>
                      <TableCell align="left">
                        {selectedStudent?.studentClass.faculty.facultyName}
                      </TableCell>
                      <TableCell align="left">
                        <div className="flex items-center gap-3">
                          <p
                            className="flex items-center"
                            key={selectedStudent?.semester.semesterId}
                          >
                            {selectedStudent?.semester.semesterName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className="flex flex-wrap items-center gap-3">
                          <Chip
                            label={selectedStudent?.instructor.fullName}
                            variant="filled"
                            color="success"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </TableContainer>

            {/* TABLE INSTRUCTOR */}
            <Typography
              className="uppercase text-center"
              sx={{
                fontSize: 20,
                marginTop: 5,
                marginBottom: 2,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              variant="h1"
              color="primary"
            >
              DANH SÁCH GVHD
            </Typography>
            <TableContainer
              className="w-full overflow-x-auto"
              component={Paper}
            >
              <Table>
                <TableHead className="bg-gray-800">
                  <TableRow>
                    {/* TABLE HEADER */}
                    {tableInstructorHeaderDatas.map((item, index) => {
                      return (
                        <TableCell
                          key={index}
                          align="left"
                          sx={{ color: "white" }}
                        >
                          {item.title}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherLeaderReducer.instructors?.map((item, index) => {
                    return (
                      <TableRow key={item.teacherCode}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">
                          <img
                            className="w-16 h-16 object-cover object-center rounded-"
                            src={item.image}
                            alt={item.fullName}
                          />
                        </TableCell>
                        <TableCell align="left">{item.teacherCode}</TableCell>
                        <TableCell align="left">{item.fullName}</TableCell>
                        <TableCell align="left">
                          {item.degree.degreeName}
                        </TableCell>

                        <TableCell align="left">
                          {item.faculty.facultyName}
                        </TableCell>

                        <TableCell align="left">
                          {selectedStudent?.instructor.teacherCode ===
                          item.teacherCode ? (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleRemoveInstructorFromStudent(
                                  selectedStudent?.studentCode,
                                  item.teacherCode
                                )
                              }
                            >
                              Hủy
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleChangeInstructor(
                                  selectedStudent?.studentCode,
                                  item.teacherCode
                                )
                              }
                            >
                              Chọn
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default InstructorDivisionResult;
