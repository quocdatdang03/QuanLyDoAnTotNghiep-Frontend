import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Fade,
  IconButton,
  InputBase,
  Modal,
  Pagination,
  Paper,
  Skeleton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useRef, useState } from "react";
import defaultImage from "../../../assets/images/dev-image.png";
import { useDispatch, useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getAllStudentsByFacultyAndKeyword } from "../../../redux/Student/Action";
import {
  addStudentToTeamAction,
  removeStudentFromTeamAction,
} from "../../../redux/Team/Action";
import { useFormik } from "formik";
import { teamRegisterFormValidation } from "./validation/teamRegisterFormValidation";
import { isPresentInTemporaryTeamMember } from "../../../config/logic";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  teamName: "",
};

const TeamRegister = () => {
  const { studentReducer } = useSelector((store) => store);
  const { teamReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isStudentLoading = studentReducer.isLoading;
  const [keyword, setKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenALert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTimeout, setAlertTimeout] = useState(null);

  var totalElements = studentReducer.studentPagination?.totalElements;
  var pageSize = studentReducer.studentPagination?.pageSize;
  var currentPageNumber = studentReducer.studentPagination?.pageNumber;

  const inputSearchRef = useRef();

  useEffect(() => {
    const requestData = {
      keyword: keyword,
      studentPagination: {
        // Các giá trị mặc định sẽ được backend áp dụng nếu không truyền
      },
    };

    dispatch(getAllStudentsByFacultyAndKeyword(requestData));
  }, [dispatch]);

  const handleChangePage = (e, value) => {
    const requestData = {
      keyword: keyword,
      studentPagination: {
        pageNumber: value,
      },
    };

    dispatch(getAllStudentsByFacultyAndKeyword(requestData));
  };

  const handleSearchStudent = () => {
    const requestData = {
      keyword: keyword,
    };

    dispatch(getAllStudentsByFacultyAndKeyword(requestData));
  };

  const handleClearSearch = () => {
    setKeyword("");
    inputSearchRef.current.value = "";
    const requestData = {
      keyword: "",
    };

    dispatch(getAllStudentsByFacultyAndKeyword(requestData));
  };

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

  const handleAddToTeam = (student) => {
    if (teamReducer?.temporaryTeamMember.length >= 4) {
      showAlert(
        "error",
        "Số lượng thành viên tối đa là 5 người (tính cả nhóm trưởng)"
      );
      return;
    }
    const requestData = {
      studentCode: student.studentCode,
    };
    dispatch(addStudentToTeamAction(requestData));
    showAlert("success", "Thêm thành viên vào nhóm thành công.");
  };

  const handleRemoveStudentFromTeam = (student) => {
    dispatch(removeStudentFromTeamAction(student.studentCode));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handling Create Team :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: teamRegisterFormValidation,
    onSubmit: (values) => {
      const requestData = {
        teamName: values.teamName,
        memberQuantity: teamReducer?.temporaryTeamMember.length,
        studentIds: teamReducer?.temporaryTeamMember.map(
          (item) => item.studentId
        ),
      };
      console.log(requestData);
    },
  });

  const showAlert = (type, message) => {
    if (alertTimeout) clearTimeout(alertTimeout);

    setAlertType(type);
    setAlertMessage(message);
    setOpenALert(true);
    const timeout = setTimeout(() => {
      setOpenALert(false);
    }, 3000); // Tự động ẩn sau 3 giây
    setAlertTimeout(timeout);
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
      <Container className="border border-red-400">
        <div className="py-7">
          {/* TITLE */}
          <Typography
            className="uppercase text-center"
            sx={{ fontSize: 30 }}
            variant="h1"
            color="primary"
          >
            Đăng ký nhóm đồ án
          </Typography>

          {/* INPUT SEARCH */}
          <div className="flex justify-end my-10">
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                inputRef={inputSearchRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm theo tên hoặc mã sinh viên"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <IconButton
                color="primary"
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearchStudent}
              >
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                sx={{ p: "10px" }}
                aria-label="directions"
                onClick={handleClearSearch}
              >
                <RefreshIcon />
              </IconButton>
            </Paper>
          </div>

          {studentReducer.studentPagination?.content.length <= 0 ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <p className="text-xl font-medium">
                Không tồn tại sinh viên nào với từ khóa "{keyword}"
              </p>
            </div>
          ) : (
            <>
              {/* STUDENT LIST */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {studentReducer.studentPagination?.content.map(
                  (item, index) => (
                    <Card key={index}>
                      {isDelayedLoading ? (
                        <Skeleton variant="rectangular" height={250} />
                      ) : (
                        <CardMedia
                          sx={{ height: 250 }}
                          image={defaultImage}
                          title={item.fullName}
                        />
                      )}

                      <CardContent>
                        {isDelayedLoading ? (
                          <Skeleton />
                        ) : (
                          <h3 className="text-center text-xl font-medium text-[#1ca3aa] mb-3">
                            {item.fullName}
                          </h3>
                        )}

                        {isDelayedLoading ? (
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="80%" />
                            <Skeleton width="60%" />
                            <Skeleton width="50%" />
                          </Box>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="flex items-center gap-1 text-gray-600">
                                <SubtitlesIcon />
                                <b>MSSV:</b>
                              </p>
                              <span>{item.studentCode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="flex items-center gap-1 text-gray-600">
                                <CalendarMonthIcon />
                                <b>Ngày sinh:</b>
                              </p>
                              <span>
                                {new Date(item.dateOfBirth).toLocaleDateString(
                                  "en-GB"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="flex items-center gap-1 text-gray-600">
                                <ClassIcon />
                                <b>Lớp:</b>
                              </p>
                              <span>{item.studentClass.className}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="flex items-center gap-1 text-gray-600">
                                <SchoolIcon />
                                <b>Khoa:</b>
                              </p>
                              <span>
                                {item.studentClass.faculty.facultyName}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardActions className="flex justify-center">
                        {isPresentInTemporaryTeamMember(
                          item,
                          teamReducer?.temporaryTeamMember
                        ) ? (
                          <Button
                            sx={{ marginBottom: 2 }}
                            variant="contained"
                            loading={isDelayedLoading}
                            disabled
                          >
                            Đã thêm
                          </Button>
                        ) : (
                          <Button
                            sx={{ marginBottom: 2 }}
                            variant="contained"
                            color="success"
                            loading={isDelayedLoading}
                            onClick={() => handleAddToTeam(item)}
                          >
                            Thêm vào nhóm
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  )
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center mt-10">
                <Pagination
                  count={Math.ceil(totalElements / pageSize)}
                  page={currentPageNumber || 1}
                  color="primary"
                  onChange={handleChangePage}
                />
              </div>
            </>
          )}

          <div>
            <Typography
              className="uppercase text-center"
              sx={{ fontSize: 25, marginTop: 7, marginBottom: 2 }}
              variant="h1"
              color="primary"
            >
              Danh sách thành viên nhóm
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">STT</StyledTableCell>
                    <StyledTableCell align="center">MSSV</StyledTableCell>
                    <StyledTableCell align="center">Họ Tên</StyledTableCell>
                    <StyledTableCell align="center">Lớp</StyledTableCell>
                    <StyledTableCell align="center">Hành động</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamReducer?.temporaryTeamMember.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
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
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemoveStudentFromTeam(item)}
                        >
                          Xóa
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              {teamReducer?.temporaryTeamMember.length <= 0 && (
                <div className="text-center text-2xl p-10">
                  Bạn chưa có thành viên nào trong nhóm
                </div>
              )}
            </TableContainer>
            <div className="flex items-center justify-center my-7">
              <Button
                variant="contained"
                color="warning"
                onClick={() => setOpenModal(true)}
              >
                Tạo nhóm
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* MODAL CREATE TEAM */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style} className="rounded-md shadow-md">
            <h1 className="text-center text-2xl font-medium uppercase">
              Tạo nhóm
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="teamName"
                  className="block mb-2 text-sm font-medium"
                >
                  Tên nhóm
                </label>
                <TextField
                  label="Nhập tên nhóm"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="teamName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.teamName}
                  error={
                    formik.errors.teamName && Boolean(formik.errors.teamName)
                  }
                  helperText={formik.errors.teamName && formik.errors.teamName}
                />
                <div className="flex items-center justify-center gap-2 mt-5">
                  <Button variant="contained" color="success" type="submit">
                    Tạo nhóm
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseModal}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>

      {/* ALERT */}
      {/* ALERT ADD STUDENT SUCCESS */}
      {openAlert && (
        <div className="fixed top-4 right-4 z-50 shadow-lg animate-fade-in-out">
          <Alert
            onClose={() => setOpenALert(false)}
            severity={alertType}
            className="shadow-lg"
          >
            {alertMessage}
          </Alert>
        </div>
      )}
    </>
  );
};

export default TeamRegister;
