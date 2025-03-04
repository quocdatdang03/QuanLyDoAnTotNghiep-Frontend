import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSchoolYearAction,
  deleteSchoolYearAction,
  getAllSchoolYearsAction,
  getSchoolYearByIdAction,
} from "../../../redux/SchoolYear/Action";
import { useFormik } from "formik";
import { formSchoolYearValidation } from "./validation/formSchoolYearValidation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const rows = [
  {
    semesterName: "224",
    schoolYearName: "2024-2025",
    isCurrent: true,
  },
  {
    semesterName: "223",
    schoolYearName: "2023-2024",
    isCurrent: false,
  },
  {
    semesterName: "123",
    schoolYearName: "2023-2024",
    isCurrent: false,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const ManageSemester = () => {
  const { schoolYearReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(null);
  const isSchoolYearLoading = schoolYearReducer.isLoading;

  var totalElements = schoolYearReducer.schoolYearPagination?.totalElements;
  var pageSize = schoolYearReducer.schoolYearPagination?.pageSize;
  var currentPageNumber = schoolYearReducer.schoolYearPagination?.pageNumber;

  // handle create school year:
  const formik = useFormik({
    validationSchema: formSchoolYearValidation,
    initialValues: {
      startYear: "",
      endYear: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(createSchoolYearAction(values));

      resetForm();
    },
  });

  // get all school years:
  useEffect(() => {
    const requestData = {
      schoolYearPagination: {},
    };

    dispatch(getAllSchoolYearsAction(requestData));
  }, [dispatch]);

  // handle change school year page:
  const handleChangePageSchoolYear = (e, value) => {
    const requestData = {
      schoolYearPagination: {
        pageNumber: value,
      },
    };

    dispatch(getAllSchoolYearsAction(requestData));
  };

  // handle open/close delete modal:
  const handleOpenModal = (item) => {
    setOpenDeleteModal(true);
    setSelectedSchoolYear(item);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  // handle delete school year :
  const handleDeleteSchoolYear = () => {
    const requestData = {
      schoolYearId: selectedSchoolYear?.schoolYearId,
    };
    dispatch(deleteSchoolYearAction(requestData));
    setOpenDeleteModal(false);
    toast.success("Xóa năm học thành công");
  };

  // handle open form edit school year:
  const handleOpenFormEditSchoolYear = (schoolYearId) => {
    const requestData = {
      schoolYearId,
      navigate,
      isSchoolYearLoading,
    };

    dispatch(getSchoolYearByIdAction(requestData));
  };

  return (
    <>
      <div>
        <h1 className="text-center uppercase text-2xl font-bold mb-5">
          Quản lý học kỳ đồ án
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* FORM CREATE SCHOOL YEAR */}
          <Paper className="p-5">
            <h2 className="text-center uppercase text-xl font-bold mb-5">
              Thêm năm học
            </h2>
            <div>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="startYear"
                      className="block mb-2 text-sm font-medium"
                    >
                      Năm bắt đầu
                    </label>
                    <TextField
                      label="Nhập năm bắt đầu (e.g. 2024)"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                      type="number"
                      name="startYear"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.startYear}
                      error={
                        formik.errors.startYear &&
                        Boolean(formik.errors.startYear)
                      }
                      helperText={
                        formik.errors.startYear && formik.errors.startYear
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endYear"
                      className="block mb-2 text-sm font-medium"
                    >
                      Năm kết thúc
                    </label>
                    <TextField
                      label="Nhập kết thúc (e.g. 2025)"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                      type="number"
                      name="endYear"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.endYear}
                      error={
                        formik.errors.endYear && Boolean(formik.errors.endYear)
                      }
                      helperText={
                        formik.errors.endYear && formik.errors.endYear
                      }
                    />
                  </div>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ paddingY: 1 }}
                  type="submit"
                  // loading={isDelayedLoading}
                >
                  Thêm mới
                </Button>
              </form>
            </div>
          </Paper>

          {/* FORM CREATE SEMESTER */}
          <Paper className="p-5">
            <h2 className="text-center uppercase text-xl font-bold">
              Thêm học kỳ
            </h2>
            <div>
              <form
                className="space-y-4 md:space-y-6"
                //   onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="semester"
                    className="block mb-2 text-sm font-medium"
                  >
                    Học kỳ
                  </label>
                  <TextField
                    label="Nhập học kỳ"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    type="text"
                    name="semester"
                    //   onChange={formik.handleChange}
                    //   onBlur={formik.handleBlur}
                    //   value={formik.values.code}
                    //   error={formik.errors.code && Boolean(formik.errors.code)}
                    //   helperText={formik.errors.code && formik.errors.code}
                  />
                </div>
                <div>
                  <label
                    htmlFor="code"
                    className="block mb-2 text-sm font-medium"
                  >
                    Chọn năm học
                  </label>
                  <FormControl
                    fullWidth
                    //   error={Boolean(
                    //     formik.errors.categoryId && formik.touched.categoryId
                    //   )}
                  >
                    <InputLabel>Năm học</InputLabel>
                    <Select
                      // value={formik.values.categoryId}
                      label="Năm học"
                      name="categoryId"
                      // onChange={formik.handleChange}
                    >
                      {/* {ingredientReducer.ingredientCategories?.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })} */}
                      <MenuItem value={10}>223</MenuItem>
                      <MenuItem value={20}>124</MenuItem>
                      <MenuItem value={30}>224</MenuItem>
                    </Select>
                    {/* {formik.errors.categoryId && (
                    <FormHelperText>{formik.errors.categoryId}</FormHelperText>
                  )} */}
                  </FormControl>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ paddingY: 1 }}
                  type="submit"
                  // loading={isDelayedLoading}
                >
                  Thêm mới
                </Button>
              </form>
            </div>
          </Paper>
        </div>

        {/* TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* TABLE SCHOOL YEAR */}
          <div>
            <h1 className="uppercase text-lg font-bold mt-10 mb-2">
              Danh sách năm học
            </h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead className="bg-blue-400">
                  <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Năm học</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schoolYearReducer.schoolYearPagination?.content.map(
                    (item, index) => (
                      <TableRow
                        key={item.schoolYearId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          {item.schoolYearName}
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() =>
                                handleOpenFormEditSchoolYear(item.schoolYearId)
                              }
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleOpenModal(item)}
                            >
                              Xóa
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination */}
            <div className="flex items-center justify-center mt-10">
              <Pagination
                count={Math.ceil(totalElements / pageSize)}
                page={currentPageNumber || 1}
                color="primary"
                onChange={handleChangePageSchoolYear}
              />
            </div>
          </div>

          {/* TABLE SEMESTER */}
          <div>
            <h1 className="uppercase text-lg font-bold mt-10 mb-2">
              Danh sách học kỳ
            </h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead className="bg-blue-400">
                  <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Học kỳ</TableCell>
                    <TableCell align="center">Năm học</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((item, index) => (
                    <TableRow
                      key={item.semesterName}
                      className={`${item.isCurrent ? "bg-green-300" : "bg-white"}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {item.semesterName}{" "}
                        {item.isCurrent && (
                          <i className="font-bold">(Học kỳ hiện tại)</i>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {item.schoolYearName}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center space-x-2">
                          <Button variant="contained" color="warning">
                            Sửa
                          </Button>
                          <Button variant="contained" color="error">
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination */}
            <div className="flex items-center justify-center mt-10">
              <Pagination
                count={10}
                page={1}
                color="primary"
                // onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* // DELETE SCHOOL YEAR MODAL : */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteModal}>
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Xác nhận xóa?
            </Typography>
            <div>
              <p>
                Bạn có chắc chắn muốn xóa năm học:{" "}
                {selectedSchoolYear?.schoolYearName}
              </p>
              <div className="mt-3 space-x-3 text-right">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleCloseModal}
                >
                  Hủy bỏ
                </Button>
                <Button variant="contained" onClick={handleDeleteSchoolYear}>
                  Xóa
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ManageSemester;
