import React from "react";
import logoUte from "../../../assets/images/logo-ute.png";

const AdminFooter = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 flex flex-col items-center py-4 px-2 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
        <div className="text-white text-center md:text-left mb-2 md:mb-0">
          <h1 className="font-bold text-xl text-cyan-400 mb-1">
            Hệ thống quản lý Đồ án Tốt nghiệp - Admin
          </h1>
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} UTE. All rights reserved.
          </p>
        </div>
        <img
          src={logoUte}
          alt="UTE Logo"
          className="w-20 h-20 object-contain ml-0 md:ml-8"
        />
      </div>
    </div>
  );
};

export default AdminFooter;
