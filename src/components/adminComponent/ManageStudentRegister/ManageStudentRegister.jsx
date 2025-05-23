import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
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
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllSemestersWithoutPaginationAction,
  getCurrentSemesterAction,
} from "../../../redux/Semester/Action";
import { getAllFacultiesAction } from "../../../redux/Faculty/Action";
import {
  getAllClassesAction,
  getAllClassesByFacultyAction,
} from "../../../redux/Class/Action";
import {
  deleteStudentInCurrentSemesterAction,
  filterAllStudentsAction,
} from "../../../redux/Student/Action";
import noResultImage from "../../../assets/images/no-result-img.png";
import toast from "react-hot-toast";
import AdminBreadCrumbs from "../AdminBreadCrumbs/AdminBreadCrumbs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Style for MODAL CONFIRM DELETE STUDENT SEMESTER:
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
    title: "Hành động",
  },
];

const ManageStudentRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [classId, setClassId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [
    openModalConfirmDeleteStudentSemester,
    setOpenModalConfirmDeleteStudentSemester,
  ] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { semesterReducer, facultyReducer, classReducer, studentReducer } =
    useSelector((store) => store);

  const isRegisteredStudentLoading = studentReducer.isRegisteredStudentLoading;
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  // get all info for pagination:
  const totalElements = studentReducer.studentPagination?.totalElements;
  const pageSize = studentReducer.studentPagination?.pageSize;
  const pageNumber = studentReducer.studentPagination?.pageNumber;

  // get all Semesters, Faculty, Class
  useEffect(() => {
    dispatch(getAllSemestersWithoutPaginationAction());
    dispatch(getAllFacultiesAction());
    dispatch(getAllClassesAction());
  }, [dispatch]);

  const handleFilterByFaculty = (facultyId) => {
    setFacultyId(facultyId);
    setClassId(""); // reset classId when changing facultyId

    if (facultyId !== "") {
      // get all Classes by facultyId (when changing dropdownlist faculty)
      const requestData = {
        facultyId: facultyId,
      };

      dispatch(getAllClassesByFacultyAction(requestData));
    } else {
      dispatch(getAllClassesAction());
    }
  };

  // get all students
  useEffect(() => {
    const requestData = {};

    dispatch(filterAllStudentsAction(requestData));
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

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      studentPagination: {
        semesterId,
        classId,
        facultyId,
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(filterAllStudentsAction(requestData));
  };

  const handleFilterStudent = (pageNum) => {
    const requestData = {
      keyword,
      studentPagination: {
        semesterId,
        classId,
        facultyId,
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(filterAllStudentsAction(requestData));
  };

  // handle filter by keyword, semester, class, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(1);
  }, [keyword, semesterId, facultyId, classId]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setSemesterId(semesterReducer.currentSemester?.semesterId);
    setClassId("");
    setFacultyId("");
    setCurrentPageNum(1);
    setSortDir("asc");
    setSortBy("account.fullName");
    dispatch(getAllClassesAction()); // when clear filter -> get all classes
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

  // handle open modal confirm delete studentSemester:
  const handleOpenModalConfirmDeleteStudentSemester = (student) => {
    setSelectedStudent(student);
    setOpenModalConfirmDeleteStudentSemester(true);
  };

  // handle close modal confirm delete studentSemester:
  const handleCloseModalConfirmDeleteStudentSemester = () => {
    setOpenModalConfirmDeleteStudentSemester(false);
    setSelectedStudent(null);
  };

  // handle delete studentSemester:
  const handleDeleteStudentSemester = (studentId, semesterId) => {
    const requestData = {
      studentId: studentId,
      semesterId: semesterId,
      toast,
    };

    dispatch(deleteStudentInCurrentSemesterAction(requestData));

    handleCloseModalConfirmDeleteStudentSemester();
  };

  useEffect(() => {
    if (isRegisteredStudentLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isRegisteredStudentLoading]);

  return (
    <>
      <Container className="my-10">
        {/* Breadcrumbs */}
        <AdminBreadCrumbs
          links={[
            {
              label: "Quản lý sinh viên đăng ký đồ án tốt nghiệp",
              href: "/admin/manage-student-register",
            },
          ]}
        />

        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 30, fontWeight: "bold" }}
        >
          Danh sách sinh viên đăng ký đồ án tốt nghiệp
        </Typography>
        <div>
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
            Danh sách sinh viên
          </h1>

          <div className="flex items-center justify-end">
            <Button
              variant="contained"
              color="success"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate("create")}
            >
              Thêm sinh viên
            </Button>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex items-center gap-3">
            {/* INPUT SEARCH */}
            <div className="flex my-10">
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

              {/* FILTER BY FACULTY */}
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={facultyId}
                  label="Khoa"
                  onChange={(e) => handleFilterByFaculty(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Khoa</em> {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                  </MenuItem>
                  {facultyReducer.faculties?.map((item) => {
                    return (
                      <MenuItem key={item.facultyId} value={item.facultyId}>
                        {item.facultyName}
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
                  {classReducer.classes?.map((item) => {
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
              Kết quả danh sách sinh viên được tìm kiếm theo{" "}
              {keyword.trim() && <b>{'từ khóa "' + keyword + '"'}</b>}
            </h2>
          )}

          {/* TABLE */}
          {studentReducer.studentPagination?.content.length <= 0 &&
          !isDelayedLoading ? (
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-52 h-52"
                src={noResultImage}
                alt="No result image"
              />
              <h1 className="text-center text-xl uppercase">Danh sách trống</h1>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {/* TABLE HEADER */}
                    {tableHeaderDatas.map((item, index) => {
                      return (
                        <StyledTableCell key={index} align="left">
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
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isDelayedLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={tableHeaderDatas.length}
                        align="center"
                      >
                        <div className="w-full flex items-center justify-center min-h-36">
                          <CircularProgress />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    studentReducer.studentPagination?.content.map(
                      (item, index) => {
                        return (
                          <StyledTableRow key={item.studentCode}>
                            <StyledTableCell align="left">
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {item.studentCode}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {item.fullName}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {item.studentClass.className}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {item.studentClass.faculty.facultyName}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <p
                                className="flex items-center"
                                key={item.semester.semesterId}
                              >
                                {item.semester.semesterName}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                title="Xóa sinh viên khỏi học kỳ hiện tại"
                                onClick={() =>
                                  handleOpenModalConfirmDeleteStudentSemester(
                                    item
                                  )
                                }
                              >
                                Xóa
                              </Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* END TABLE */}

          {/* Pagination */}
          {studentReducer.studentPagination?.content.length > 0 &&
            !isDelayedLoading && (
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

      {/* MODAL CONFIRM DELETE STUDENT SEMESTER */}
      <Modal
        open={openModalConfirmDeleteStudentSemester}
        onClose={handleCloseModalConfirmDeleteStudentSemester}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalConfirmDeleteStudentSemester}>
          <Box
            sx={style}
            className="relative rounded-md shadow-md w-[90vw] md:w-[70vw] max-h-[90vh] overflow-y-auto"
          >
            {/* Button close */}
            <div className="absolute top-1 right-1">
              <IconButton
                color="error"
                onClick={handleCloseModalConfirmDeleteStudentSemester}
              >
                <CloseIcon color="error" />
              </IconButton>
            </div>

            <p>
              Bạn có chắc chắn muốn<b className="px-1 text-red-500">xóa</b>
              sinh viên
              <b className="px-1">{selectedStudent?.fullName}</b>
              ra khỏi học kỳ đồ án tốt nghiệp
              <b className="px-1">{selectedStudent?.semester?.semesterName}</b>
            </p>

            <div className="flex items-center justify-center gap-3 mt-10">
              <Button
                color="error"
                variant="contained"
                onClick={handleCloseModalConfirmDeleteStudentSemester}
              >
                Hủy
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() =>
                  handleDeleteStudentSemester(
                    selectedStudent.studentId,
                    selectedStudent.semester.semesterId
                  )
                }
              >
                Xác nhận
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ManageStudentRegister;
