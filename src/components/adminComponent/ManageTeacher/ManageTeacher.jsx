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

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import noResultImage from "../../../assets/images/no-result-img.png";
import defaultImage from "../../../assets/images/default-avatar.png";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getAllTeachersAction } from "../../../redux/Teacher/Action";

import { getAllFacultiesAction } from "../../../redux/Faculty/Action";

// Table header data:
const tableHeaderDatas = [
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
    title: "Hành động",
  },
];

const ManageTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("account.fullName");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const { teacherReducer, facultyReducer } = useSelector((store) => store);

  const isInstructorLoading = teacherReducer.isLoading;

  // get all info for pagination:
  const totalElements = teacherReducer.teacherPagination?.totalElements;
  const pageSize = teacherReducer.teacherPagination?.pageSize;
  const pageNumber = teacherReducer.teacherPagination?.pageNumber;

  // get all faculties and get all teachers:
  useEffect(() => {
    // get all faculties:
    dispatch(getAllFacultiesAction());

    // get all teachers:
    const requestData = {};
    dispatch(getAllTeachersAction(requestData));
  }, [dispatch]);

  // handle change page:
  const handleChangePage = (e, value) => {
    const requestData = {
      keyword,
      studentPagination: {
        facultyId,
        pageNumber: value,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    setCurrentPageNum(value);

    dispatch(getAllTeachersAction(requestData));
  };

  const handleFilterStudent = (pageNum) => {
    const requestData = {
      keyword,
      studentPagination: {
        facultyId,
        pageNumber: pageNum,
        sortDir,
        sortBy,
      },
    };

    console.log(requestData);

    dispatch(getAllTeachersAction(requestData));
  };

  // handle filter by keyword, faculty
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(1);
  }, [keyword, facultyId]);

  // handle sort by and sort dir
  useEffect(() => {
    // Nếu filter -> reset về pageNumber là 1
    handleFilterStudent(currentPageNum);
  }, [sortBy, sortDir]);

  // handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setFacultyId("");
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
        sx={{ fontSize: 30, fontWeight: "bold" }}
      >
        Danh sách giảng viên
      </Typography>

      <div>
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mt-6 mb-5">
          Danh sách giảng viên
        </h1>

        <div className="flex items-center justify-end">
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/admin/manage-teacher/create")}
          >
            Thêm tài khoản
          </Button>
        </div>

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
              <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={facultyId}
                label="Khoa"
                onChange={(e) => setFacultyId(e.target.value)}
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
        {teacherReducer.teacherPagination?.content.length <= 0 ? (
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
                      <TableCell key={index} align="center">
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
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherReducer.teacherPagination?.content.map(
                  (item, index) => {
                    return (
                      <TableRow key={item.teacherCode}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">
                          <img
                            className="w-16 h-16 object-cover object-top rounded-sm"
                            src={item.image || defaultImage}
                            alt={item.fullName}
                          />
                        </TableCell>
                        <TableCell align="left">{item.teacherCode}</TableCell>
                        <TableCell align="left">
                          {item.fullName}
                          {item.leader && (
                            <p className="font-bold">(Trưởng bộ môn)</p>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {item.faculty.facultyName}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="info"
                            onClick={() => navigate("edit/" + item.teacherCode)}
                          >
                            Sửa
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
        {teacherReducer.teacherPagination?.content.length > 0 && (
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

export default ManageTeacher;
