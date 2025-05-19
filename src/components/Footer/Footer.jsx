import React from "react";

import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Divider, IconButton, Link } from "@mui/material";

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900">
      <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
        <div>
          <h1 className="font-bold text-2xl text-cyan-400 mb-5">
            Quản lý đồ án tốt nghiệp
          </h1>
          <p className="text-justify">
            Website Quản lý Đồ án Tốt nghiệp cung cấp giải pháp tiện lợi và hiệu
            quả cho việc quản lý, theo dõi và hỗ trợ quy trình thực hiện đồ án
            tốt nghiệp, giúp kết nối giữa sinh viên, giảng viên và nhà trường
            một cách dễ dàng.
          </p>
          <div className="flex flex-wrap">
            <Link
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener"
            >
              <IconButton>
                <YouTubeIcon fontSize="large" className="text-cyan-400" />
              </IconButton>
            </Link>
            <Link
              href="https://chatgpt.com/c/678db5bb-c6b0-800d-8a64-3a5103322c10"
              target="_blank"
              rel="noopener"
            >
              <IconButton>
                <FacebookIcon fontSize="large" className="text-cyan-400" />
              </IconButton>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-2xl text-cyan-400 mb-5">Liên Hệ</h1>
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-2">
              <LocationOnIcon className="text-cyan-400" />
              <div className="flex flex-col gap-y-2">
                <h3 className="font-semibold text-xl">Địa chỉ</h3>
                <p className="leading-5">
                  K72/29/10 Đinh Tiên Hoàng, Hải Châu, Đà Nẵng
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <MailIcon className="text-cyan-400" />
              <div className="flex flex-col gap-y-2">
                <h3 className="font-semibold text-xl">Email</h3>
                <p className="leading-5">dat09441293@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-2">
              <PhoneIcon className="text-cyan-400" />
              <div className="flex flex-col gap-y-2">
                <h3 className="font-semibold text-xl">Số điện thoại</h3>
                <p className="leading-5">+84 944198125</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider sx={{ bgcolor: "white", opacity: 0.2 }} />
      <p className="flex items-center justify-center p-2">
        <CopyrightIcon fontSize="small" className="text-white pr-1" />
        <span className="font-medium text-cyan-400">DatCoDev@2025</span>
      </p>
    </div>
  );
};

export default Footer;
