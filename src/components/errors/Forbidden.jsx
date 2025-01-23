import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">403</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mt-4">Forbidden</h2>
      <p className="text-lg text-gray-500 mt-2">
        You do not have permission to access this page
      </p>
      <Button
        onClick={() => navigate("/")}
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
        Go to Home
      </Button>
    </div>
  );
};

export default Forbidden;
