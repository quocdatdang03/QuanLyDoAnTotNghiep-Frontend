import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllFacultiesAction } from "../../../redux/Faculty/Action";
import {
  getAllClassesAction,
  getAllClassesByFacultyAction,
} from "../../../redux/Class/Action";
import {
  getAllStudentsAccountAction,
  updateEnableStatusOfStudentAction,
} from "../../../redux/Student/Action";
import noResultImage from "../../../assets/images/no-result-img.png";
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

const ManageStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [classId, setClassId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");

  const { facultyReducer, classReducer, studentReducer } = useSelector(
    (store) => store
  );

  // get all info for pagination:
  const totalElements = studentReducer.studentAccountPagination?.totalElements;
  const pageSize = studentReducer.studentAccountPagination?.pageSize;
  const pageNumber = studentReducer.studentAccountPagination?.pageNumber;

  // get all Faculty, Class
  useEffect(() => {
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

    dispatch(getAllStudentsAccountAction(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      studentAccountPagination: {
        classId,
        facultyId,
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllStudentsAccountAction(requestData));
  };

  const handleFilterStudent = (pageNum) => {
    const requestData = {
      keyword,
      studentAccountPagination: {
        classId,
        facultyId,
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllStudentsAccountAction(requestData));
  };

  // handle filter by keyword, semester, class, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(1);
  }, [keyword, facultyId, classId]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
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

  // handle lock/unlock student account:
  const handleUpdateEnableStatusOfStudent = (student, enableStatus) => {
    console.log(student);
    const requestData = {
      studentCode: student.studentCode,
      enableStatus: enableStatus,
    };

    console.log(requestData);

    dispatch(updateEnableStatusOfStudentAction(requestData));
  };

  return (
    <Container className="my-10">
      {/* Breadcrumbs */}
      <AdminBreadCrumbs
        links={[
          {
            label: "Quản lý tài khoản sinh viên",
            href: "/admin/manage-student",
          },
        ]}
      />
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30, fontWeight: "bold" }}
      >
        Quản lý tài khoản sinh viên
      </Typography>
      <div>
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
          Danh sách tài khoản sinh viên
        </h1>

        <div className="flex items-center justify-end">
          <Button
            variant="contained"
            color="success"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate("create")}
          >
            Thêm tài khoản
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
          </div>
          {/* FILTER SELECT */}
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
            Kết quả danh sách sinh viên được tìm kiếm theo{" "}
            {keyword.trim() && <b>{'từ khóa "' + keyword + '"'}</b>}
          </h2>
        )}

        {/* TABLE */}
        {studentReducer.studentAccountPagination?.content.length <= 0 ? (
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
                          {sortBy === item.sortByField && sortDir === "asc" && (
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
                {studentReducer.studentAccountPagination?.content.map(
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
                          <div className="flex gap-2">
                            <Button
                              variant="contained"
                              color="info"
                              startIcon={<EditIcon />}
                              onClick={() =>
                                navigate(`edit/${item.studentCode}`)
                              }
                            >
                              Sửa
                            </Button>
                            {/* <Button variant="contained" color="error">
                            Xóa
                          </Button> */}
                            {item.enable ? (
                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<LockOutlinedIcon />}
                                onClick={() =>
                                  handleUpdateEnableStatusOfStudent(
                                    item,
                                    "lock"
                                  )
                                }
                              >
                                Khóa
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="success"
                                startIcon={<LockOpenIcon />}
                                onClick={() =>
                                  handleUpdateEnableStatusOfStudent(
                                    item,
                                    "unlock"
                                  )
                                }
                              >
                                Mở khóa
                              </Button>
                            )}
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* END TABLE */}

        {/* Pagination */}
        {studentReducer.studentAccountPagination?.content.length > 0 && (
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

export default ManageStudent;
