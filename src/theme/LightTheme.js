import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Màu xanh dương nhạt
    },
    secondary: {
      main: "#9c27b0", // Màu tím nhạt
    },
    black: {
      main: "#000000", // Màu đen chính
    },
    background: {
      main: "#ffffff", // Màu nền chính là trắng
      default: "#f5f5f5", // Màu nền mặc định sáng hơn
      paper: "#ffffff", // Màu nền của các thành phần như Card, Paper
    },
    textColor: {
      main: "#000000", // Màu chữ chính là đen
    },
  },
});
