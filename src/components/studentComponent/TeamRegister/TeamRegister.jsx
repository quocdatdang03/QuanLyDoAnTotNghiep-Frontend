import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  Pagination,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
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

const TeamRegister = () => {
  const { studentReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isStudentLoading = studentReducer.isLoading;
  const [keyword, setKeyword] = useState("");

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
              {studentReducer.studentPagination?.content.map((item, index) => (
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
                          <span>{item.studentClass.faculty.facultyName}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardActions className="flex justify-center">
                    <Button
                      sx={{ marginBottom: 2 }}
                      variant="contained"
                      color="success"
                      loading={isDelayedLoading}
                    >
                      Thêm vào nhóm
                    </Button>
                  </CardActions>
                </Card>
              ))}
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
      </div>
    </Container>
  );
};

export default TeamRegister;
