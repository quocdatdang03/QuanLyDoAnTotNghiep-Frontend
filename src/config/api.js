import axios from "axios";

export const BASE_API_URL =
  "https://quanlydoantotnghiep-backend.onrender.com/api";

// Tạo instance axios chính
export const axiosAPI = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tạo instance axios riêng để refresh token để tránh vòng lặp vô tận
const axiosRefresh = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response?.data?.message);
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      (error.response?.data?.message === "Invalid jwt token" ||
        error.response?.data?.message === "Expired jwt token" ||
        error.response?.data?.message === "Unsupported jwt token" ||
        error.response?.data?.message === "Jwt claims string is empty")
    ) {
      originalRequest._retry = true;

      try {
        // Taking old session to refresh
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axiosRefresh.post("/auth/refreshToken", {
          refreshToken: refreshToken,
        });

        const newToken = response.data.accessToken;

        // Lưu token mới
        localStorage.setItem("jwtToken", newToken);

        // Cập nhật header cho request gốc
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosAPI(originalRequest);
      } catch (error) {
        // Clear auth data
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");

        // Redirect to login
        if (window.location.pathname !== "/account/login") {
          window.location.href = "/account/login";
        }

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// Hàm helper để kiểm tra token hết hạn
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expiryTime;
  } catch {
    return true;
  }
};

// Hàm setup axios instance với token mới
export const setupAxiosInterceptors = (token) => {
  if (token) {
    axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosAPI.defaults.headers.common["Authorization"];
  }
};
