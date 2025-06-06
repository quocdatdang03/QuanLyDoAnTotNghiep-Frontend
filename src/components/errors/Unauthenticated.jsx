import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Unauthenticated = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100">
      <h1 className="text-8xl font-bold text-gray-800">Unauthorized</h1>

      <p className="text-lg text-gray-500 mt-2">
        Bạn cần đăng nhập để truy cập trang này.
      </p>
      <Button
        onClick={() => navigate("/account/login")}
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          paddingX: 5,
          paddingY: 1,
          textTransform: "none",
          borderRadius: "50px",
        }}
      >
        Đi đến trang đăng nhập
      </Button>
    </div>
  );
};

export default Unauthenticated;
