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
  Skeleton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import noResultImage from "../../../assets/images/no-result-img.png";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { isStudentPresentInList } from "../../../config/logic";
import {
  addStudentToCurrentSemesterAction,
  chooseStudentAction,
  getAllStudentsNotEnrolledInCurrentSemesterAction,
  removeStudentFromTemporaryList,
} from "../../../redux/Student/Action";
import { getAllFacultiesAction } from "../../../redux/Faculty/Action";
import {
  getAllClassesAction,
  getAllClassesByFacultyAction,
} from "../../../redux/Class/Action";
import { getCurrentSemesterAction } from "../../../redux/Semester/Action";
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

const FormCreateStudentSemester = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [classId, setClassId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [
    openModalConfirmAddStudentToCurrentSemester,
    setOpenModalConfirmAddStudentToCurrentSemester,
  ] = useState(false);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { studentReducer, classReducer, facultyReducer, semesterReducer } =
    useSelector((store) => store);

  const isStudentLoading = studentReducer.isLoading;

  // get all info for pagination:
  const totalElements =
    studentReducer.studentNotEnrolledInCurrentSemesterPagination?.totalElements;
  const pageSize =
    studentReducer.studentNotEnrolledInCurrentSemesterPagination?.pageSize;
  const pageNumber =
    studentReducer.studentNotEnrolledInCurrentSemesterPagination?.pageNumber;

  // get all faculties, classes, and currentSemester
  useEffect(() => {
    dispatch(getAllFacultiesAction());
    dispatch(getAllClassesAction());
    dispatch(getCurrentSemesterAction());
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

  // get all students not enrolled in current semester:
  useEffect(() => {
    const requestData = {};

    dispatch(getAllStudentsNotEnrolledInCurrentSemesterAction(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      studentPagination: {
        facultyId,
        classId,
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllStudentsNotEnrolledInCurrentSemesterAction(requestData));
  };

  const handleFilterStudent = (pageNum) => {
    const requestData = {
      keyword,
      studentPagination: {
        classId,
        facultyId,
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllStudentsNotEnrolledInCurrentSemesterAction(requestData));
  };

  // handle filter by keyword, semester, class, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(1);
  }, [keyword, classId, facultyId]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setFacultyId("");
    setClassId("");
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

  // handle add student to temporary list:
  const handleAddStudentToTemporaryList = (studentCode) => {
    const requestData = {
      studentCode: studentCode,
      toast,
    };
    console.log(requestData);
    dispatch(chooseStudentAction(requestData));
  };

  // handle remove student from temporary list:
  const handleRemoveStudentFromTemporaryList = (studentCode) => {
    const requestData = {
      studentCode,
      toast,
    };

    dispatch(removeStudentFromTemporaryList(requestData));
  };

  // handle open MODAL Confirm add student to current semester:
  const handleOpenModalConfirmAddStudentToCurrentSemester = () => {
    if (studentReducer.choosenStudents.length <= 0) {
      toast.error("Vui lòng chọn sinh viên");
    } else {
      setOpenModalConfirmAddStudentToCurrentSemester(true);
    }
  };

  // handle close MODAL Confirm add student to current semester:
  const handleCloseModalConfirmAddStudentToCurrentSemester = () => {
    setOpenModalConfirmAddStudentToCurrentSemester(false);
  };

  // handle add student to current semester:
  const handleAddStudentToCurrentSemester = () => {
    if (studentReducer.choosenStudents.length <= 0) {
      toast.error("Vui lòng chọn sinh viên");
    } else {
      const requestData = {
        data: {
          studentCodeList: studentReducer.choosenStudents?.map(
            (item) => item.studentCode
          ),
          currentSemesterId: semesterReducer.currentSemester?.semesterId,
        },
        navigate,
        toast,
      };

      dispatch(addStudentToCurrentSemesterAction(requestData));
    }
  };

  // handle loading :
  useEffect(() => {
    if (isStudentLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isStudentLoading]);

  return (
    <>
      <Container className="my-10">
        {/* Breadcrumbs */}
        <AdminBreadCrumbs
          links={[
            {
              label: "Quản lý sinh viên đăng ký đồ án tốt nghiệp",
              href: "/admin/manage-registerStudent",
            },
            {
              label: "Thêm sinh viên",
              href: "/admin/manage-registerStudent/create",
            },
          ]}
        />
        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 35 }}
        >
          THÊM SINH VIÊN VÀO HỌC KỲ HIỆN TẠI
        </Typography>

        {/* DSSV chưa được phân GVHD */}
        <div>
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
            Danh sách sinh viên chưa đăng ký ĐATN trong học kỳ hiện tại
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
              <i>Kết quả danh sách sinh viên được tìm kiếm theo </i>
              {keyword.trim() && <b>{'từ khóa "' + keyword + '"'}</b>}
            </h2>
          )}

          {/* TABLE */}
          {studentReducer.studentNotEnrolledInCurrentSemesterPagination?.content
            .length <= 0 ? (
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
                  {studentReducer.studentNotEnrolledInCurrentSemesterPagination?.content.map(
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
                            {isStudentPresentInList(
                              item,
                              studentReducer.choosenStudents
                            ) ? (
                              <Button
                                variant="contained"
                                color="success"
                                disabled
                              >
                                Đã chọn
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() =>
                                  handleAddStudentToTemporaryList(
                                    item.studentCode
                                  )
                                }
                              >
                                Chọn
                              </Button>
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
          {studentReducer.studentNotEnrolledInCurrentSemesterPagination?.content
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

        <div>
          {/* DSSV đang chọn */}
          <Typography
            className="uppercase text-center"
            sx={{ fontSize: 20, marginTop: 7, marginBottom: 2 }}
            variant="h1"
            color="primary"
          >
            Danh sách sinh viên đang chọn
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">STT</StyledTableCell>
                  <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                  <StyledTableCell align="center">MSSV</StyledTableCell>
                  <StyledTableCell align="center">Họ tên</StyledTableCell>
                  <StyledTableCell align="center">Lớp</StyledTableCell>
                  <StyledTableCell align="center">Khoa</StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentReducer?.choosenStudents.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {index + 1}
                    </StyledTableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        {" "}
                        <img
                          className="w-16 h-16 object-cover object-center rounded-"
                          src={item.image}
                          alt={item.fullName}
                        />
                      </div>
                    </TableCell>
                    <StyledTableCell align="center">
                      {item.studentCode}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.fullName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.studentClass.className}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.studentClass.faculty.facultyName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                          handleRemoveStudentFromTemporaryList(item.studentCode)
                        }
                      >
                        Xóa
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            {studentReducer?.choosenStudents.length <= 0 && (
              <div className="text-center text-xl p-10 italic text-gray-500">
                Chưa có sinh viên nào được chọn
              </div>
            )}
          </TableContainer>

          {/* CURRENT SEMESTER INFO */}
          <div className="flex items-center justify-start gap-2 mt-10 bg-gray-200 p-5 rounded-sm">
            <p className="uppercase font-medium">Học kỳ hiện tại:</p>
            <Chip
              className="font-bold tracking-wider text-2xl"
              label={semesterReducer.currentSemester?.semesterName}
              color="warning"
              size="medium"
            />
            <p>-</p>
            <p className="uppercase font-medium">Năm học: </p>
            <Chip
              className="font-bold tracking-wider text-2xl"
              label={semesterReducer.currentSemester?.schoolYear.schoolYearName}
              color="warning"
              size="medium"
            />
          </div>

          {/* BUTTON Xác nhận phân công GVHD */}
          <div className="text-center my-10">
            <Button
              variant="contained"
              onClick={handleOpenModalConfirmAddStudentToCurrentSemester}
            >
              Xác nhận thêm sinh viên
            </Button>
          </div>
        </div>
      </Container>

      {/* MODAL CONFIRM ADD STUDENT TO CURRENT SEMESTER : */}
      <Modal
        open={openModalConfirmAddStudentToCurrentSemester}
        onClose={handleCloseModalConfirmAddStudentToCurrentSemester}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalConfirmAddStudentToCurrentSemester}>
          <Box
            sx={style}
            className="relative rounded-md shadow-md w-[90vw] md:w-[70vw] max-h-[90vh] overflow-y-auto"
          >
            {/* Button close */}
            <div className="absolute top-1 right-1">
              <IconButton
                color="error"
                onClick={handleCloseModalConfirmAddStudentToCurrentSemester}
              >
                <CloseIcon color="error" />
              </IconButton>
            </div>
            <div className="flex items-center  justify-center gap-3 text-2xl font-medium uppercase mb-2">
              <p>Xác nhận thêm sinh viên vào học kỳ</p>
              <Chip
                className="font-bold tracking-wider text-2xl"
                label={semesterReducer.currentSemester?.semesterName}
                color="warning"
                size="medium"
              />
            </div>
            <p className="italic mt-8 text-gray-600">
              Vui lòng kiểm tra thông tin danh sách của sinh viên trước khi ấn
              <b className="pl-1">[xác nhận]</b>!
            </p>

            <Typography
              className="uppercase text-center"
              sx={{
                fontSize: 20,
                marginTop: 2,
                marginBottom: 2,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              variant="h1"
              color="primary"
            >
              Danh sách sinh viên đang chọn
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="bg-[#054f7a] text-white">
                    <StyledTableCell align="center">STT</StyledTableCell>
                    <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                    <StyledTableCell align="center">MSSV</StyledTableCell>
                    <StyledTableCell align="center">Họ tên</StyledTableCell>
                    <StyledTableCell align="center">Lớp</StyledTableCell>
                    <StyledTableCell align="center">Khoa</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentReducer?.choosenStudents.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          <img
                            className="w-16 h-16 object-cover object-center rounded-"
                            src={item.image}
                            alt={item.fullName}
                          />
                        </div>
                      </TableCell>
                      <StyledTableCell align="center">
                        {item.studentCode}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.fullName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.studentClass.className}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.studentClass.faculty.facultyName}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              {studentReducer?.choosenStudents.length <= 0 && (
                <div className="text-center text-xl p-10 italic text-gray-500">
                  Chưa có sinh viên nào được chọn
                </div>
              )}
            </TableContainer>
            <div className="flex items-center justify-center gap-3 my-10">
              <Button
                color="error"
                variant="contained"
                onClick={handleCloseModalConfirmAddStudentToCurrentSemester}
              >
                Hủy
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleAddStudentToCurrentSemester}
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

export default FormCreateStudentSemester;
