import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
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
} from "@mui/material";
import React from "react";

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

const rows = [
  {
    maSinhVien: "SV001",
    hoTen: "Nguyễn Văn A",
    lop: "DHKTPM15A",
    khoa: "Công nghệ thông tin",
    hocKy: "HK1 2024-2025",
  },
  {
    maSinhVien: "SV002",
    hoTen: "Trần Thị B",
    lop: "DHKTPM15B",
    khoa: "Công nghệ thông tin",
    hocKy: "HK1 2024-2025",
  },
  {
    maSinhVien: "SV003",
    hoTen: "Lê Văn C",
    lop: "DHKTPM15A",
    khoa: "Kỹ thuật điện tử",
    hocKy: "HK1 2024-2025",
  },
  {
    maSinhVien: "SV004",
    hoTen: "Phạm Thị D",
    lop: "DHKTPM15C",
    khoa: "Công nghệ thông tin",
    hocKy: "HK2 2024-2025",
  },
  {
    maSinhVien: "SV004",
    hoTen: "Phạm Thị D",
    lop: "DHKTPM15C",
    khoa: "Công nghệ thông tin",
    hocKy: "HK2 2024-2025",
  },
  {
    maSinhVien: "SV004",
    hoTen: "Phạm Thị D",
    lop: "DHKTPM15C",
    khoa: "Công nghệ thông tin",
    hocKy: "HK2 2024-2025",
  },
  {
    maSinhVien: "SV004",
    hoTen: "Phạm Thị D",
    lop: "DHKTPM15C",
    khoa: "Công nghệ thông tin",
    hocKy: "HK2 2024-2025",
  },
  {
    maSinhVien: "SV004",
    hoTen: "Phạm Thị D",
    lop: "DHKTPM15C",
    khoa: "Công nghệ thông tin",
    hocKy: "HK2 2024-2025",
  },
  {
    maSinhVien: "SV004",
    hoTen: "Phạm Thị D",
    lop: "DHKTPM15C",
    khoa: "Công nghệ thông tin",
    hocKy: "HK2 2024-2025",
  },
  {
    maSinhVien: "SV004",
    hoTen: "Phạm Thị D",
    lop: "DHKTPM15C",
    khoa: "Công nghệ thông tin",
    hocKy: "HK2 2024-2025",
  },
];

const ManageStudentRegister = () => {
  return (
    <div>
      <h1 className="text-center uppercase text-2xl font-bold">
        Danh sách sinh viên đăng ký đồ án tốt nghiệp
      </h1>

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
              // onChange={(e) => setKeyword(e.target.value)}
            />
            <IconButton
              color="primary"
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              // onClick={handleSearchStudent}
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              sx={{ p: "10px" }}
              // onClick={handleClearSearch}
            >
              <RefreshIcon />
            </IconButton>
          </Paper>
          {/* END INPUT SEARCH */}
          {/* FILTER SELECT */}
        </div>
        <div className="flex gap-5 w-full">
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Học kỳ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Học kỳ"
              // onChange={handleChange}
            >
              <MenuItem value={10}>223</MenuItem>
              <MenuItem value={20}>124</MenuItem>
              <MenuItem value={30}>224</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Khoa"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Công nghệ số</MenuItem>
              <MenuItem value={20}>Xây dựng</MenuItem>
              <MenuItem value={30}>Điện - điện tử</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Lớp</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Lớp"
              // onChange={handleChange}
            >
              <MenuItem value={10}>21T3</MenuItem>
              <MenuItem value={20}>21T1</MenuItem>
              <MenuItem value={30}>22T3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {/* END SEARCH & FILTER */}

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">STT</StyledTableCell>
              <StyledTableCell align="left">Mã sinh viên</StyledTableCell>
              <StyledTableCell align="left">Họ tên</StyledTableCell>
              <StyledTableCell align="left">Lớp</StyledTableCell>
              <StyledTableCell align="left">Khoa</StyledTableCell>
              <StyledTableCell align="left">Học kỳ</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item, index) => (
              <StyledTableRow key={item.maSinhVien}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="left">
                  {item.maSinhVien}
                </StyledTableCell>
                <StyledTableCell align="left">{item.hoTen}</StyledTableCell>
                <StyledTableCell align="left">{item.lop}</StyledTableCell>
                <StyledTableCell align="left">{item.khoa}</StyledTableCell>
                <StyledTableCell align="left">{item.hocKy}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* END TABLE */}

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
  );
};

export default ManageStudentRegister;
