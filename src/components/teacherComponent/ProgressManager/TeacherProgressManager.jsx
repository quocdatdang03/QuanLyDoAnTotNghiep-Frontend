import {
  Button,
  Chip,
  CircularProgress,
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
import {
  applyAllStagesToProjectAction,
  getAllProjectsByInstructorAction,
} from "../../../redux/InstructorProject/Action";
import CustomBreadCrumb from "../../BreadCrumb/CustomBreadCrumb";

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
  // {
  //   title: "Trạng thái",
  // },
  {
    title: "Tiến độ",
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
  const [pageSizeState, setPageSizeState] = useState(5);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState(
    "studentSemester.student.account.fullName"
  );
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { instructorProjectReducer, teacherReducer, semesterReducer } =
    useSelector((store) => store);

  const isProjectLoading = instructorProjectReducer.isProjectLoading;

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
        pageSize: pageSizeState,
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
        pageSize: pageSizeState,
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
  }, [keyword, classId, semesterId, pageSizeState]);

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

  // handle navigate to progress manager detail:
  const handleNavigateToProgressManagerDetail = (projectId) => {
    navigate(`/teacher/progress/detail/project/${projectId}`);

    // dispatch(getProjectByIdAction(requestData));
  };

  // handle apply all stages to project:
  const handleApplyAllStagesToProject = (projectIdParam, semesterIdParam) => {
    const requestData = {
      projectId: projectIdParam,
      semesterId: semesterIdParam,
    };

    dispatch(applyAllStagesToProjectAction(requestData, toast));
  };
  // handle loading :
  useEffect(() => {
    if (isProjectLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isProjectLoading]);

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
                  placeholder="Tìm kiếm theo tên/mã sinh viên hoặc tên đề tài"
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
              <i>Kết quả danh sách đề tài được tìm kiếm theo </i>
              {keyword.trim() && <b>{'từ khóa "' + keyword + '"'}</b>}
            </h2>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 p-2 bg-gray-50 rounded-md shadow-sm">
            <div className="text-gray-700 font-medium">
              Tổng số đề tài:{" "}
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

          {/* TABLE PROJECTS*/}
          {instructorProjectReducer.projectPagination?.content.length <= 0 &&
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
                    instructorProjectReducer.projectPagination?.content.map(
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
                            {/* <TableCell align="left">
                              <Chip
                                label={item.projectStatus.projectStatusName}
                                variant="filled"
                                color={`${item.projectStatus.projectStatusId === 1 ? "warning" : item.projectStatus.projectStatusId === 2 ? "primary" : item.projectStatus.projectStatusId === 3 ? "success" : "error"}`}
                              />
                            </TableCell> */}
                            <TableCell align="left">
                              {item.totalStages < item.totalCreatedStages ? (
                                <div>
                                  <p className="mb-2">
                                    Sinh viên mới chưa được thêm giai đoạn báo
                                    cáo
                                  </p>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="warning"
                                    onClick={() =>
                                      handleApplyAllStagesToProject(
                                        item.projectId,
                                        item.semester.semesterId
                                      )
                                    }
                                  >
                                    Thêm giai đoạn
                                  </Button>
                                </div>
                              ) : (
                                <div className="min-w-[200px]">
                                  <div className="flex items-center gap-2 mb-1">
                                    {item.inProgressStage ? (
                                      <>
                                        <span className="text-gray-700">
                                          Giai đoạn đang thực hiện:
                                        </span>
                                        <Chip
                                          label={item.inProgressStage}
                                          color="primary"
                                          size="small"
                                        />
                                      </>
                                    ) : (
                                      <span className="text-gray-500 italic text-sm">
                                        Không có giai đoạn nào đang thực hiện
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-gray-700">
                                    <span>Số giai đoạn đã hoàn thành:</span>
                                    <span className="font-semibold text-blue-700">
                                      {item.numberOfCompletedStages} /{" "}
                                      {item.totalStages}
                                    </span>
                                  </div>
                                </div>
                              )}
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
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* END TABLE */}

          {/* Pagination */}
          {instructorProjectReducer.projectPagination?.content.length > 0 &&
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
      </Container>
    </>
  );
};

export default TeacherProgressManager;
