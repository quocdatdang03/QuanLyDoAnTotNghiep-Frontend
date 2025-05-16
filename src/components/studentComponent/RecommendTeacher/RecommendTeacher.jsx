import {
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Pagination,
  Paper,
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import noResultImage from "../../../assets/images/no-result-img.png";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addRecommendedTeacherAction,
  getAllRecommendedTeacherAction,
  getAllTeachersByFacultyAction,
  removeRecommendedTeacherAction,
} from "../../../redux/RecommendedTeacher/Action";
import { isTeacherPresentInList } from "../../../config/logic";
import { getInstructorOfProjectByStudentCodeAction } from "../../../redux/Project/Action";
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
const tableInstructorHeaderDatas = [
  {
    title: "STT",
  },
  {
    title: "Hình Ảnh",
  },
  {
    title: "Mã giảng viên",
    sortByField: "account.code",
  },
  {
    title: "Họ tên",
    sortByField: "account.fullName",
  },
  {
    title: "Khoa",
    sortByField: "faculty.facultyName",
  },
  {
    title: "Học vị",
    sortByField: "degree.degreeName",
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

const RecommendTeacher = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { recommendedTeacherReducer, authReducer, projectReducer } =
    useSelector((store) => store);

  const isInstructorLoading = recommendedTeacherReducer.isLoading;

  // get all info for pagination:
  const totalElements =
    recommendedTeacherReducer.teacherPagination?.totalElements;
  const pageSize = recommendedTeacherReducer.teacherPagination?.pageSize;
  const pageNumber = recommendedTeacherReducer.teacherPagination?.pageNumber;

  // get all teachers by faculty
  useEffect(() => {
    const requestData = {};

    dispatch(getAllTeachersByFacultyAction(requestData));
  }, [dispatch]);

  // get all recommended teachers:
  useEffect(() => {
    const requestData = {
      studentCode: authReducer.user?.code,
    };

    dispatch(getAllRecommendedTeacherAction(requestData));

    // check whether studnent had instructor (if have -> don't allow to add recommended teacher
    dispatch(getInstructorOfProjectByStudentCodeAction(requestData));
  }, [authReducer.user?.code]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      paginationData: {
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllTeachersByFacultyAction(requestData));
  };

  const handleFilterTeacher = (pageNum) => {
    const requestData = {
      keyword,
      paginationData: {
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllTeachersByFacultyAction(requestData));
  };

  // handle filter by keyword
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterTeacher(1);
  }, [keyword]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterTeacher(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
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

  // handle add recommended teacher:
  const handleAddRecommendedTeacher = (teacherId) => {
    const requestData = {
      recommendedTeacherData: {
        studentId: authReducer.user?.userDetails.studentId,
        teacherId,
      },
      toast,
    };

    dispatch(addRecommendedTeacherAction(requestData));
  };

  // handle remove recommended teacher:
  const handleRemoveRecommendedTeacher = (teacherId) => {
    const requestData = {
      recommendedTeacherData: {
        studentId: authReducer.user?.userDetails.studentId,
        teacherId,
      },
      toast,
    };
    console.log(requestData);

    dispatch(removeRecommendedTeacherAction(requestData));
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
          links={[{ label: "Đề xuất GVHD", href: "/student/recommendTeacher" }]}
        />

        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 35 }}
        >
          Đề xuất giảng viên hướng dẫn
        </Typography>

        {/* Danh sách GVHD theo khoa của sinh viên*/}
        {/* Check nếu sinh viên đã được phân chia GVHD rồi thì không hiển thị danh sách GVHD nãy nữa */}
        {!projectReducer.instructor && (
          <div>
            <h1 className="text-xl font-bold mt-5">
              Danh sách giảng viên hướng dẫn
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
                    placeholder="Tìm kiếm theo tên hoặc mã giảng viên"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <IconButton
                    color="primary"
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={() => handleFilterTeacher(1)}
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
            </div>
            {/* END SEARCH & FILTER */}

            {keyword.trim() && (
              <h2 className="text-center mb-5 mt-2">
                <i>Kết quả danh sách GVHD được tìm kiếm theo </i>
                {keyword.trim() && <b>{'từ khóa "' + keyword + '"'}</b>}
              </h2>
            )}

            {/* TABLE */}
            {recommendedTeacherReducer.teacherPagination?.content.length <=
            0 ? (
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
                      {tableInstructorHeaderDatas.map((item, index) => {
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
                    {recommendedTeacherReducer.teacherPagination?.content.map(
                      (item, index) => {
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
                            <TableCell align="left">
                              {item.teacherCode}
                            </TableCell>
                            <TableCell align="left">{item.fullName}</TableCell>

                            <TableCell align="left">
                              {item.faculty.facultyName}
                            </TableCell>

                            <TableCell align="left">
                              {item.degree.degreeName}
                            </TableCell>
                            <TableCell align="left">
                              {isTeacherPresentInList(
                                item,
                                recommendedTeacherReducer?.recommendedTeachers
                              ) ? (
                                <Button disabled variant="contained">
                                  Đã đề xuất
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() =>
                                    handleAddRecommendedTeacher(item.teacherId)
                                  }
                                >
                                  Đề xuất
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
            {recommendedTeacherReducer.teacherPagination?.content.length >
              0 && (
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
        )}

        <div>
          {/* Danh sách GVHD đã đề xuất đang chọn */}
          <Typography
            className="uppercase text-center"
            sx={{ fontSize: 20, marginTop: 7, marginBottom: 2 }}
            variant="h1"
            color="primary"
          >
            Danh sách GVHD bạn đã đề xuất
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">STT</StyledTableCell>
                  <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                  <StyledTableCell align="center">
                    Mã giảng viên
                  </StyledTableCell>
                  <StyledTableCell align="center">Họ tên</StyledTableCell>
                  <StyledTableCell align="center">Khoa</StyledTableCell>
                  <StyledTableCell align="center">Học vị</StyledTableCell>
                  {!projectReducer.instructor && (
                    <StyledTableCell align="center">Hành động</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {recommendedTeacherReducer.recommendedTeachers?.map(
                  (item, index) => (
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
                        {item.teacherCode}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.fullName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.faculty.facultyName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.degree.degreeName}
                      </StyledTableCell>
                      {!projectReducer.instructor && (
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() =>
                              handleRemoveRecommendedTeacher(item.teacherId)
                            }
                          >
                            Xóa
                          </Button>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
            {recommendedTeacherReducer?.recommendedTeachers.length <= 0 && (
              <div className="text-center text-xl p-10 italic text-gray-500">
                Bạn chưa đề xuất giảng viên nào
              </div>
            )}
          </TableContainer>
        </div>
      </Container>
    </>
  );
};

export default RecommendTeacher;
