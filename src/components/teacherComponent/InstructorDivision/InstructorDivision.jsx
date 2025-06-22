import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
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
import defaultImage from "../../../assets/images/default-avatar.png";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import noResultImage from "../../../assets/images/no-result-img.png";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  assignInstructorAction,
  chooseInstructorAction,
  chooseStudentAction,
  getAllClassesByFacultyOfTeacherLeaderAction,
  getAllInstructorsByFacultyOfTeacherLeaderAction,
  getAllStudentsWithoutInstructor,
  removeChoosenInstructorAction,
  removeStudentFromTemporaryList,
} from "../../../redux/TeacherLeader/Action";
import toast from "react-hot-toast";
import { isStudentPresentInList } from "../../../config/logic";
import CustomBreadCrumb from "../../BreadCrumb/CustomBreadCrumb";

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
    title: "Học kỳ",
  },
  {
    title: "Đề xuất GVHD của sinh viên",
  },
  {
    title: "Hành động",
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
    title: "Số sinh viên đã phân công",
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

const InstructorDivision = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [classId, setClassId] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [openModalInstructor, setOpenModalInstructor] = useState(false);
  const [
    openModalConfirmAssignInstructor,
    setOpenModalConfirmAssignInstructor,
  ] = useState(false);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [pageSizeState, setPageSizeState] = useState(5);

  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { teacherLeaderReducer } = useSelector((store) => store);

  const isStudentWithoutInstructorLoading =
    teacherLeaderReducer.loading.students;

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
        pageSize: pageSizeState,
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
        pageSize: pageSizeState,
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
  }, [keyword, classId, pageSizeState]);

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
    setPageSizeState(5);
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

  // handle change pageSize:
  const handleChangePageSize = (e) => {
    setPageSizeState(e.target.value);
  };

  // handle add student to temporary list:
  const handleAddStudentToTemporaryList = (studentCode) => {
    const requestData = {
      studentCode: studentCode,
      toast,
    };
    dispatch(chooseStudentAction(requestData));
  };

  // handle remove student from temporary list:
  const handleRemoveStudentFromTemporaryList = (studentCode) => {
    dispatch(removeStudentFromTemporaryList(studentCode));

    toast.success("Xóa sinh viên ra khỏi danh sách thành công");
  };

  // handle close MODAL Instructor:
  const handleCloseModalInstructor = () => {
    setOpenModalInstructor(false);
  };

  // handle open MODAL Instructor:
  const handleOpenModalInstructor = () => {
    // get all instructors:
    dispatch(getAllInstructorsByFacultyOfTeacherLeaderAction());

    setOpenModalInstructor(true);
  };

  // handle choose instructors:
  const handleChooseInstructor = (teacherCode) => {
    const requestData = {
      teacherCode,
      toast,
    };

    dispatch(chooseInstructorAction(requestData));

    setOpenModalInstructor(false);
  };

  // handle remove choosen instructors:
  const handleRemoveChoosenInstructor = (teacherCode) => {
    const requestData = {
      teacherCode,
      toast,
    };

    dispatch(removeChoosenInstructorAction(requestData));
  };

  // handle open modal confirm assign instructor:
  const handleOpenModalConfirmAssignInstructor = () => {
    if (
      teacherLeaderReducer.choosenStudents.length <= 0 ||
      !teacherLeaderReducer.choosenInstructor
    ) {
      toast.error("Vui lòng chọn sinh viên hoặc GVHD");
    } else {
      setOpenModalConfirmAssignInstructor(true);
    }
  };

  // handle close MODAL Confirm assign instructor:
  const handleCloseConfirmAssignInstructor = () => {
    setOpenModalConfirmAssignInstructor(false);
  };

  // handle Assign Instructor:
  const handleAssignInstructor = () => {
    if (
      teacherLeaderReducer.choosenStudents.length <= 0 ||
      !teacherLeaderReducer.choosenInstructor
    ) {
      toast.error("Vui lòng chọn sinh viên hoặc GVHD");
    } else {
      const requestData = {
        assignInstructorData: {
          instructorCode: teacherLeaderReducer.choosenInstructor?.teacherCode,
          studentCodes: teacherLeaderReducer.choosenStudents?.map(
            (item) => item.studentCode
          ),
        },
        navigate,
      };

      console.log(requestData);
      dispatch(assignInstructorAction(requestData));
    }
  };

  // handle loading :
  useEffect(() => {
    if (isStudentWithoutInstructorLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isStudentWithoutInstructorLoading]);

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
          ]}
        />
        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 35 }}
        >
          Phân chia giảng viên hướng dẫn
        </Typography>

        {/* DSSV chưa được phân GVHD */}
        <div>
          <h1 className="text-xl font-bold mt-5">Danh sách sinh viên</h1>

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
            </div>
          </div>
          {/* END SEARCH & FILTER */}

          {keyword.trim() && (
            <h2 className="text-center mb-5 mt-2">
              <i>Kết quả danh sách sinh viên được tìm kiếm theo </i>
              {keyword.trim() && <b>{'từ khóa "' + keyword + '"'}</b>}
            </h2>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 p-2 bg-gray-50 rounded-md shadow-sm">
            <div className="text-gray-700 font-medium">
              Tổng số sinh viên:{" "}
              <span className="font-semibold">{totalElements}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span>Hiển thị:</span>
              <FormControl size="small">
                <Select value={pageSizeState} onChange={handleChangePageSize}>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
              <span>item / trang</span>
            </div>
          </div>

          {/* TABLE */}
          {teacherLeaderReducer.studentPagination?.content.length <= 0 &&
          !isDelayedLoading ? (
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
                    teacherLeaderReducer.studentPagination?.content.map(
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
                            <TableCell align="left">
                              {item.studentCode}
                            </TableCell>
                            <TableCell align="left">{item.fullName}</TableCell>
                            <TableCell align="left">
                              {item.studentClass.className}
                            </TableCell>
                            <TableCell align="left">
                              {item.studentClass.faculty.facultyName}
                            </TableCell>
                            <TableCell align="left">
                              <p
                                className="flex items-center"
                                key={item.semester.semesterId}
                              >
                                {item.semester.semesterName}
                              </p>
                            </TableCell>
                            <TableCell align="left">
                              <div className="flex flex-wrap items-center gap-3">
                                {item.recommendedTeachers.length > 0 ? (
                                  item.recommendedTeachers?.map(
                                    (recommendedInstructorItem) => {
                                      const recommendedInstructorColor =
                                        colors[
                                          recommendedInstructorItem.teacherId %
                                            colors.length
                                        ];

                                      return (
                                        <Chip
                                          key={
                                            recommendedInstructorItem.teacherId
                                          }
                                          label={
                                            recommendedInstructorItem.teacherName
                                          }
                                          variant="filled"
                                          color={recommendedInstructorColor}
                                        />
                                      );
                                    }
                                  )
                                ) : (
                                  <i className="text-gray-400 text-center">
                                    Không có đề xuất
                                  </i>
                                )}
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              {isStudentPresentInList(
                                item,
                                teacherLeaderReducer?.choosenStudents
                              ) ? (
                                <Button disabled variant="contained">
                                  Đang chọn
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
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* END TABLE */}

          {/* Pagination */}
          {teacherLeaderReducer.studentPagination?.content.length > 0 &&
            !isDelayedLoading && (
              <div className="flex items-center justify-center mt-10">
                <Pagination
                  count={Math.ceil(totalElements / pageSize)}
                  page={pageNumber}
                  color="primary"
                  onChange={handleChangePage}
                  showFirstButton
                  showLastButton
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
                  <StyledTableCell align="center">
                    Đề xuất GVHD của sinh viên
                  </StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherLeaderReducer?.choosenStudents.map((item, index) => (
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
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {item.recommendedTeachers.length > 0 ? (
                          item.recommendedTeachers?.map(
                            (recommendedInstructorItem) => {
                              const recommendedInstructorColor =
                                colors[
                                  recommendedInstructorItem.teacherId %
                                    colors.length
                                ];
                              return (
                                <Chip
                                  key={recommendedInstructorItem.teacherId}
                                  label={recommendedInstructorItem.teacherName}
                                  variant="filled"
                                  color={recommendedInstructorColor}
                                />
                              );
                            }
                          )
                        ) : (
                          <i className="text-gray-400">Không có đề xuất</i>
                        )}
                      </div>
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
            {teacherLeaderReducer?.choosenStudents.length <= 0 && (
              <div className="text-center text-xl p-10 italic text-gray-500">
                Chưa có sinh viên nào được chọn
              </div>
            )}
          </TableContainer>
          <div className="flex items-center justify-center my-7">
            <Button
              variant="contained"
              color="warning"
              onClick={handleOpenModalInstructor}
            >
              Chọn GVHD
            </Button>
          </div>

          {/* GVHD đang chọn */}
          <div>
            <h1 className="text-center text-xl font-bold mb-3">
              Giáo viên hướng dẫn
            </h1>
            {teacherLeaderReducer.choosenInstructor ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="md:col-start-2">
                  {isDelayedLoading ? (
                    <Skeleton variant="rectangular" height={250} />
                  ) : (
                    <CardMedia
                      sx={{ height: 250 }}
                      image={
                        teacherLeaderReducer.choosenInstructor?.image ||
                        defaultImage
                      }
                      title={teacherLeaderReducer.choosenInstructor?.fullName}
                    />
                  )}

                  <CardContent>
                    {isDelayedLoading ? (
                      <Skeleton />
                    ) : (
                      <h3 className="text-center text-xl font-medium text-[#1ca3aa] mb-3">
                        {teacherLeaderReducer.choosenInstructor?.fullName}
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
                            <b>MGV:</b>
                          </p>
                          <span>
                            {
                              teacherLeaderReducer.choosenInstructor
                                ?.teacherCode
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="flex items-center gap-1 text-gray-600">
                            <LocalPhoneIcon />
                            <b>SĐT:</b>
                          </p>
                          <span>
                            {/* {new Date(
                              teacherLeaderReducer.choosenInstructor?.dateOfBirth
                            ).toLocaleDateString("en-GB")} */}
                            {
                              teacherLeaderReducer.choosenInstructor
                                ?.phoneNumber
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="flex items-center gap-1 text-gray-600">
                            <ClassIcon />
                            <b>Học vị:</b>
                          </p>
                          <span>
                            {
                              teacherLeaderReducer.choosenInstructor?.degree
                                .degreeName
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="flex items-center gap-1 text-gray-600">
                            <SchoolIcon />
                            <b>Khoa:</b>
                          </p>
                          <span>
                            {
                              teacherLeaderReducer.choosenInstructor?.faculty
                                .facultyName
                            }
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardActions className="flex justify-center">
                    <Button
                      sx={{ marginBottom: 2, minWidth: "40%" }}
                      variant="contained"
                      color="error"
                      loading={isDelayedLoading}
                      onClick={() =>
                        handleRemoveChoosenInstructor(
                          teacherLeaderReducer.choosenInstructor.teacherCode
                        )
                      }
                    >
                      Hủy
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ) : (
              <p className="text-center italic text-lg text-gray-500">
                Bạn chưa chọn GVHD cần phân công
              </p>
            )}
          </div>

          {/* BUTTON Xác nhận phân công GVHD */}
          <div className="text-center my-10">
            <Button
              variant="contained"
              onClick={handleOpenModalConfirmAssignInstructor}
            >
              Xác nhận phân công GVHD
            </Button>
          </div>
        </div>
      </Container>

      {/* MODAL CHOOSE INSTRUCTOR : */}
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
            className="relative rounded-md shadow-md w-[95vw] md:w-[80vw]"
          >
            {/* Button close */}
            <div className="absolute top-1 right-1">
              <IconButton color="error" onClick={handleCloseModalInstructor}>
                <CloseIcon color="error" />
              </IconButton>
            </div>
            <h1 className="text-center text-2xl font-medium uppercase mb-2">
              Lựa chọn GVHD
            </h1>

            {/* TABLE INSTRUCTOR */}
            <TableContainer
              className="w-full overflow-x-auto"
              component={Paper}
            >
              <Table aria-label="customized table">
                <TableHead className="bg-blue-900">
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

                        <TableCell align="center">
                          {item.numberOfAssignedStudent}
                        </TableCell>

                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleChooseInstructor(item.teacherCode)
                            }
                          >
                            Chọn
                          </Button>
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

      {/* MODAL CONFIRM ASSIGN INSTRUCTOR : */}
      <Modal
        open={openModalConfirmAssignInstructor}
        onClose={handleCloseConfirmAssignInstructor}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalConfirmAssignInstructor}>
          <Box
            sx={style}
            className="relative rounded-md shadow-md w-[90vw] md:w-[70vw] max-h-[90vh] overflow-y-auto"
          >
            {/* Button close */}
            <div className="absolute top-1 right-1">
              <IconButton
                color="error"
                onClick={handleCloseConfirmAssignInstructor}
              >
                <CloseIcon color="error" />
              </IconButton>
            </div>
            <p className="text-center text-2xl font-medium uppercase mb-2">
              Xác nhận phân công GVHD
            </p>
            <p className="italic mt-8 text-gray-600">
              Vui lòng kiểm tra thông tin danh sách của sinh viên và thông tin
              giảng viên trước khi ấn <b>[xác nhận]</b>!
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
                  <TableRow>
                    <StyledTableCell align="center">STT</StyledTableCell>
                    <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                    <StyledTableCell align="center">MSSV</StyledTableCell>
                    <StyledTableCell align="center">Họ tên</StyledTableCell>
                    <StyledTableCell align="center">Lớp</StyledTableCell>
                    <StyledTableCell align="center">
                      Đề xuất GVHD của sinh viên
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherLeaderReducer?.choosenStudents.map((item, index) => (
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
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          {item.recommendedTeachers.length > 0 ? (
                            item.recommendedTeachers?.map(
                              (recommendedInstructorItem) => {
                                return (
                                  <Chip
                                    key={recommendedInstructorItem.teacherId}
                                    label={
                                      recommendedInstructorItem.teacherName
                                    }
                                    variant="filled"
                                    color="info"
                                  />
                                );
                              }
                            )
                          ) : (
                            <i className="text-gray-400">Không có đề xuất</i>
                          )}
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              {teacherLeaderReducer?.choosenStudents.length <= 0 && (
                <div className="text-center text-xl p-10 italic text-gray-500">
                  Chưa có sinh viên nào được chọn
                </div>
              )}
            </TableContainer>
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
              Giảng viên hướng dẫn
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="bg-[#054f7a] text-white">
                    <TableCell sx={{ color: "white" }} align="center">
                      Hình ảnh
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      MGV
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Họ tên
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Học vị
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Khoa
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        {" "}
                        <img
                          className="w-16 h-16 object-cover object-center rounded-"
                          src={teacherLeaderReducer.choosenInstructor?.image}
                          alt={teacherLeaderReducer.choosenInstructor?.fullName}
                        />
                      </div>
                    </TableCell>
                    <StyledTableCell align="center">
                      {teacherLeaderReducer.choosenInstructor?.teacherCode}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {teacherLeaderReducer.choosenInstructor?.fullName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {
                        teacherLeaderReducer.choosenInstructor?.degree
                          .degreeName
                      }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {
                        teacherLeaderReducer.choosenInstructor?.faculty
                          .facultyName
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              {teacherLeaderReducer?.choosenStudents.length <= 0 && (
                <div className="text-center text-xl p-10 italic text-gray-500">
                  Chưa có sinh viên nào được chọn
                </div>
              )}
            </TableContainer>
            <div className="flex items-center justify-center gap-3 my-10">
              <Button
                color="error"
                variant="contained"
                onClick={handleCloseConfirmAssignInstructor}
              >
                Hủy
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleAssignInstructor}
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

export default InstructorDivision;
