import {
  Button,
  FormControl,
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
  TextField,
} from "@mui/material";

const rowsSchoolYear = [
  {
    schoolYearName: "2024-2025",
  },
  {
    schoolYearName: "2023-2024",
  },
  {
    schoolYearName: "2023-2024",
  },
];

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

const ManageSemester = () => {
  return (
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
              //   onSubmit={formik.handleSubmit}
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
                    //   onChange={formik.handleChange}
                    //   onBlur={formik.handleBlur}
                    //   value={formik.values.code}
                    //   error={formik.errors.code && Boolean(formik.errors.code)}
                    //   helperText={formik.errors.code && formik.errors.code}
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
                    //   onChange={formik.handleChange}
                    //   onBlur={formik.handleBlur}
                    //   value={formik.values.code}
                    //   error={formik.errors.code && Boolean(formik.errors.code)}
                    //   helperText={formik.errors.code && formik.errors.code}
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
                {rowsSchoolYear.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.schoolYearName}</TableCell>
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
                    <TableCell align="center">{item.schoolYearName}</TableCell>
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
  );
};

export default ManageSemester;
