import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  FormHelperText,
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
  getAllSchoolYearAction,
  getAllSchoolYearsByPaginationAction,
  getSchoolYearByIdAction,
} from "../../../redux/SchoolYear/Action";
import { useFormik } from "formik";
import { formSchoolYearValidation } from "./validation/formSchoolYearValidation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  createSemesterAction,
  deleteSemesterAction,
  getAllSemestersAction,
  getSemesterByIdAction,
} from "../../../redux/Semester/Action";
import { formSemesterValidation } from "./validation/formSemesterValidation";
import AdminBreadCrumbs from "../AdminBreadCrumbs/AdminBreadCrumbs";

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
  const { schoolYearReducer, semesterReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDeleteSchoolYearModal, setOpenDeleteSchoolYearModal] =
    useState(false);
  const [openDeleteSemesterModal, setOpenDeleteSemesterModal] = useState(false);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const isSchoolYearLoading = schoolYearReducer.isLoading;
  const isSemesterLoading = semesterReducer.isLoading;

  var totalElementsSchoolYear =
    schoolYearReducer.schoolYearPagination?.totalElements;
  var pageSizeSchoolYear = schoolYearReducer.schoolYearPagination?.pageSize;
  var currentPageNumberSchoolYear =
    schoolYearReducer.schoolYearPagination?.pageNumber;

  var totalElementsSemester = semesterReducer.semesterPagination?.totalElements;
  var pageSizeSemester = semesterReducer.semesterPagination?.pageSize;
  var currentPageNumberSemester =
    semesterReducer.semesterPagination?.pageNumber;

  // handle create school year:
  const formikSchoolYear = useFormik({
    validationSchema: formSchoolYearValidation,
    initialValues: {
      startYear: "",
      endYear: "",
    },
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        schoolYearData: {
          ...values,
        },
        toast,
        dispatch,
      };

      dispatch(createSchoolYearAction(requestData));

      resetForm();
    },
  });

  // handle create semester:
  const formikSemester = useFormik({
    validationSchema: formSemesterValidation,
    initialValues: {
      semesterName: "",
      schoolYearId: "",
    },

    onSubmit: (values, { resetForm }) => {
      const requestDataCreateSemester = {
        semesterData: {
          ...values,
        },
        toast,
        dispatch,
      };

      dispatch(createSemesterAction(requestDataCreateSemester));

      const requestDataSemester = {
        semesterPagination: {},
      };
      dispatch(getAllSemestersAction(requestDataSemester));

      resetForm();
    },
  });

  // get all school years and all semesters:
  useEffect(() => {
    const requestDataSchoolYear = {
      schoolYearPagination: {},
    };

    const requestDataSemester = {
      semesterPagination: {},
    };

    // get all school years by pagination
    dispatch(getAllSchoolYearsByPaginationAction(requestDataSchoolYear));

    // get all semesters:
    dispatch(getAllSemestersAction(requestDataSemester));

    // get all school years
    dispatch(getAllSchoolYearAction());
  }, [dispatch]);

  // handle load schoolYear list when schoolYearPagination change
  useEffect(() => {
    // get all school years
    dispatch(getAllSchoolYearAction());
  }, [schoolYearReducer.schoolYearPagination]);

  // handle change school year page:
  const handleChangePageSchoolYear = (e, value) => {
    const requestData = {
      schoolYearPagination: {
        pageNumber: value,
      },
    };

    dispatch(getAllSchoolYearsByPaginationAction(requestData));
  };

  // handle change semester page:
  const handleChangePageSemester = (e, value) => {
    const requestData = {
      semesterPagination: {
        pageNumber: value,
      },
    };

    dispatch(getAllSemestersAction(requestData));
  };

  // handle open/close delete modal:
  const handleOpenDeleteSchoolYearModal = (item) => {
    setOpenDeleteSchoolYearModal(true);
    setSelectedSchoolYear(item);
  };

  const handleCloseDeleteSchoolYearModal = () => {
    setOpenDeleteSchoolYearModal(false);
  };

  const handleOpenDeleteSemesterModal = (item) => {
    setOpenDeleteSemesterModal(true);
    setSelectedSemester(item);
  };

  const handleCloseDeleteSemesterModal = () => {
    setOpenDeleteSemesterModal(false);
  };

  // handle delete school year :
  const handleDeleteSchoolYear = () => {
    const requestData = {
      schoolYearId: selectedSchoolYear?.schoolYearId,
      toast,
      dispatch,
    };
    dispatch(deleteSchoolYearAction(requestData));
    setOpenDeleteSchoolYearModal(false);
    toast.success("Xóa năm học thành công");
  };

  // handle delete semester :
  const handleDeleteSemester = () => {
    const requestData = {
      semesterId: selectedSemester?.semesterId,
      toast,
      dispatch,
    };
    dispatch(deleteSemesterAction(requestData));
    setOpenDeleteSemesterModal(false);
    toast.success("Xóa học kỳ thành công");
  };

  return (
    <>
      <div>
        {/* Breadcrumbs */}
        <AdminBreadCrumbs
          links={[{ label: "Quản lý học kỳ", href: "/admin/manage-semester" }]}
        />
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
                onSubmit={formikSchoolYear.handleSubmit}
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
                      onChange={formikSchoolYear.handleChange}
                      onBlur={formikSchoolYear.handleBlur}
                      value={formikSchoolYear.values.startYear}
                      error={
                        formikSchoolYear.errors.startYear &&
                        Boolean(formikSchoolYear.errors.startYear)
                      }
                      helperText={
                        formikSchoolYear.errors.startYear &&
                        formikSchoolYear.errors.startYear
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
                      onChange={formikSchoolYear.handleChange}
                      onBlur={formikSchoolYear.handleBlur}
                      value={formikSchoolYear.values.endYear}
                      error={
                        formikSchoolYear.errors.endYear &&
                        Boolean(formikSchoolYear.errors.endYear)
                      }
                      helperText={
                        formikSchoolYear.errors.endYear &&
                        formikSchoolYear.errors.endYear
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
                onSubmit={formikSemester.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="semesterName"
                    className="block mb-2 text-sm font-medium"
                  >
                    Học kỳ
                  </label>
                  <TextField
                    label="Nhập học kỳ"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    type="number"
                    name="semesterName"
                    onChange={formikSemester.handleChange}
                    onBlur={formikSemester.handleBlur}
                    value={formikSemester.values.semesterName}
                    error={
                      formikSemester.errors.semesterName &&
                      Boolean(formikSemester.errors.semesterName)
                    }
                    helperText={
                      formikSemester.errors.semesterName &&
                      formikSemester.errors.semesterName
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="schoolYearId"
                    className="block mb-2 text-sm font-medium"
                  >
                    Chọn năm học
                  </label>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      formikSemester.errors.schoolYearId &&
                        formikSemester.touched.schoolYearId
                    )}
                  >
                    <InputLabel>Năm học</InputLabel>
                    <Select
                      value={formikSemester.values.schoolYearId}
                      label="Năm học"
                      name="schoolYearId"
                      onChange={formikSemester.handleChange}
                    >
                      {schoolYearReducer.schoolYears?.map((item) => {
                        return (
                          <MenuItem
                            key={item.schoolYearId}
                            value={item.schoolYearId}
                          >
                            {item.schoolYearName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {formikSemester.errors.schoolYearId && (
                      <FormHelperText sx={{ color: "red" }}>
                        {formikSemester.errors.schoolYearId}
                      </FormHelperText>
                    )}
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
                                navigate(`schoolYear/edit/${item.schoolYearId}`)
                              }
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleOpenDeleteSchoolYearModal(item)
                              }
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
                count={Math.ceil(totalElementsSchoolYear / pageSizeSchoolYear)}
                page={currentPageNumberSchoolYear || 1}
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
                  {semesterReducer.semesterPagination?.content.map(
                    (item, index) => (
                      <TableRow
                        key={item.semesterId}
                        className={`${item.isCurrent ? "bg-green-300" : "bg-white"}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          {item.semesterName}{" "}
                          {item.isCurrent && (
                            <i className="font-bold">(Học kỳ hiện tại)</i>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {item.schoolYear.schoolYearName}
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() =>
                                navigate(`semester/edit/${item.semesterId}`)
                              }
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleOpenDeleteSemesterModal(item)
                              }
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
                count={Math.ceil(totalElementsSemester / pageSizeSemester)}
                page={currentPageNumberSemester || 1}
                color="primary"
                onChange={handleChangePageSemester}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DELETE SCHOOL YEAR MODAL : */}
      <Modal
        open={openDeleteSchoolYearModal}
        onClose={handleCloseDeleteSchoolYearModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteSchoolYearModal}>
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
                  onClick={handleCloseDeleteSchoolYearModal}
                >
                  Hủy bỏ
                </Button>
                <Button variant="contained" onClick={handleDeleteSchoolYear}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* DELETE SEMESTER MODAL : */}
      <Modal
        open={openDeleteSemesterModal}
        onClose={handleOpenDeleteSemesterModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteSemesterModal}>
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Xác nhận xóa?
            </Typography>
            <div>
              <p>
                Bạn có chắc chắn muốn xóa học kỳ:{" "}
                {selectedSemester?.semesterName}
              </p>
              <div className="mt-3 space-x-3 text-right">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleCloseDeleteSemesterModal}
                >
                  Hủy bỏ
                </Button>
                <Button variant="contained" onClick={handleDeleteSemester}>
                  Xác nhận
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
