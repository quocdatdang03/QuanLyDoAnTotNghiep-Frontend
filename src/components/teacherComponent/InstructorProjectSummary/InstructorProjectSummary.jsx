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
import {
  getAllInstructorsByFacultyOfTeacherLeaderAction,
  getAllProjectsAction,
  getAllProjectsForExportAction,
} from "../../../redux/TeacherLeader/Action";

import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
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
    title: "Sinh viên thực hiện",
    sortByField: "studentSemester.student.account.fullName",
  },
  {
    title: "Mã sinh viên",
    sortByField: "studentSemester.student.account.code",
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

  {
    title: "Trạng thái",
  },
];

const InstructorProjectSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [classId, setClassId] = useState("");
  const [instructorCode, setInstructorCode] = useState("");
  const [projectStatusId, setProjectStatusId] = useState("");

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState(
    "studentSemester.student.account.fullName"
  );
  const [pageSizeState, setPageSizeState] = useState(5);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { teacherLeaderReducer, teacherReducer, semesterReducer, authReducer } =
    useSelector((store) => store);

  const isProjectsLoading = teacherLeaderReducer.loading.projects;

  // get all info for pagination:
  const totalElements =
    teacherLeaderReducer.projectSummaryPagination?.totalElements;
  const pageSize = teacherLeaderReducer.projectSummaryPagination?.pageSize;
  const pageNumber = teacherLeaderReducer.projectSummaryPagination?.pageNumber;

  // get all classes by faculty of teacher and get all semesters and get all instructors:
  useEffect(() => {
    dispatch(getAllClassesByFacultyOfTeacherAction());
    dispatch(getAllSemestersWithoutPaginationAction());

    // get all instructors:
    dispatch(getAllInstructorsByFacultyOfTeacherLeaderAction());
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

    dispatch(getAllProjectsAction(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      projectPagination: {
        semesterId,
        classId,
        instructorCode,
        projectStatusId,
        pageNumber: value,
        pageSize: pageSizeState,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllProjectsAction(requestData));
  };

  const handleFilterProject = (pageNum) => {
    const requestData = {
      keyword,
      projectPagination: {
        semesterId,
        classId,
        instructorCode,
        projectStatusId,
        pageNumber: pageNum,
        pageSize: pageSizeState,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllProjectsAction(requestData));

    // for get all projects for export:
    const requestDataForExports = {
      keyword,
      projectPagination: {
        semesterId,
        classId,
        instructorCode,
        projectStatusId,
        pageNumber: 1,
        pageSize: 10000,
        sortDir,
        sortBy,
      },
    };

    dispatch(getAllProjectsForExportAction(requestDataForExports));
  };

  // handle filter by keyword, semester, class, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterProject(1);
  }, [
    keyword,
    classId,
    semesterId,
    instructorCode,
    projectStatusId,
    pageSizeState,
  ]);

  // handle sort by and sort dir
  useEffect(() => {
    handleFilterProject(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setClassId("");
    setSemesterId(semesterReducer.currentSemester?.semesterId);
    setInstructorCode("");
    setProjectStatusId("");
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

  // handle Export to Excel:
  const handleExportToExcel = () => {
    const data = teacherLeaderReducer.projectsForExport?.content;

    const formattedData = data?.map((item, index) => [
      index + 1,
      item.projectName,
      item.student.fullName,
      item.student.studentCode,
      item.student.instructor.fullName,
    ]);

    const header = [
      {
        v: "STT",
        s: { font: { bold: true }, alignment: { horizontal: "center" } },
      },
      { v: "Tên đề tài", s: { font: { bold: true } } },
      { v: "Sinh viên thực hiện", s: { font: { bold: true } } },
      { v: "Mã sinh viên", s: { font: { bold: true } } },
      { v: "Giảng viên hướng dẫn", s: { font: { bold: true } } },
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...formattedData]);

    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 30 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách đề tài");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(
      blob,
      "Danh sách đề tài khoa " +
        authReducer.user?.userDetails.faculty.facultyName +
        ".xlsx"
    );
  };

  // handle loading :
  useEffect(() => {
    if (isProjectsLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isProjectsLoading]);

  return (
    <>
      <Container className="my-10 py-10" component={Paper}>
        {/* Breadcrumbs */}
        <CustomBreadCrumb
          links={[
            {
              label: "Tổng hợp đề tài đồ án tốt nghiệp",
              href: "/teacher/projects/summary",
            },
          ]}
        />
        <Typography
          color="primary"
          className="uppercase text-center"
          component="h2"
          sx={{ fontSize: 35 }}
        >
          TỔNG HỢP ĐỀ TÀI ĐATN
        </Typography>

        {/* DSSV chưa được phân GVHD */}
        <div>
          <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
            Danh sách đề tài tốt nghiệp
          </h1>
          {/* SEARCH & FILTER */}
          <div className="flex flex-col lg:flex-row mb-5 items-center gap-3">
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
            </div>

            {/* FILTER SELECT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
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

              {/* FILTER BY PROJECT STATUS */}
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Trạng thái đề tài
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={projectStatusId}
                  label="Trạng thái đề tài"
                  onChange={(e) => setProjectStatusId(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Trạng thái đề tài</em>
                    {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                  </MenuItem>
                  <MenuItem value={1}>Chờ duyệt</MenuItem>
                  <MenuItem value={2}>Đã duyệt</MenuItem>
                  <MenuItem value={3}>Bị từ chối</MenuItem>
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

          {teacherLeaderReducer.projectSummaryPagination?.content.length >
            0 && (
            <div className="flex items-center justify-end mb-3">
              <Button
                variant="outlined"
                color="success"
                className="flex items-center justify-center gap-2"
                onClick={handleExportToExcel}
              >
                {/* SVG icon for export to excel */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    height={24}
                  >
                    <path
                      fill="#169154"
                      d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"
                    ></path>
                    <path
                      fill="#18482a"
                      d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"
                    ></path>
                    <path
                      fill="#0c8045"
                      d="M14 15.003H29V24.005000000000003H14z"
                    ></path>
                    <path fill="#17472a" d="M14 24.005H29V33.055H14z"></path>
                    <g>
                      <path
                        fill="#29c27f"
                        d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"
                      ></path>
                      <path
                        fill="#27663f"
                        d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"
                      ></path>
                      <path
                        fill="#19ac65"
                        d="M29 15.003H44V24.005000000000003H29z"
                      ></path>
                      <path fill="#129652" d="M29 24.005H44V33.055H29z"></path>
                    </g>
                    <path
                      fill="#0c7238"
                      d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"
                    ></path>
                  </svg>
                </div>
                <span>Xuất danh sách</span>
              </Button>
            </div>
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
          {teacherLeaderReducer.projectSummaryPagination?.content.length <= 0 &&
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
                        <div className="w-full flex items-center justify-center min-h-40">
                          <CircularProgress />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    teacherLeaderReducer.projectSummaryPagination?.content.map(
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
                              {item.student.fullName}
                            </TableCell>
                            <TableCell align="left">
                              {item.student.studentCode}
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
          {teacherLeaderReducer.projectSummaryPagination?.content.length > 0 &&
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

export default InstructorProjectSummary;
