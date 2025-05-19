import React from "react";
import logoUte from "../../assets/images/logo-ute.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center">
      {/* Banner */}
      <div className="w-full bg-blue-500 py-16 flex flex-col items-center shadow-md">
        <img
          src={logoUte}
          alt="UTE Logo"
          className="w-24 h-24 mb-4 rounded-full shadow-lg bg-white p-2"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">
          Chào mừng đến với Hệ thống Quản lý Đồ án Tốt nghiệp
        </h1>
        <p className="text-lg md:text-xl text-blue-100 text-center max-w-2xl">
          Nền tảng hỗ trợ sinh viên, giảng viên và quản trị viên trong việc quản
          lý, đăng ký, và theo dõi tiến độ đồ án tốt nghiệp một cách hiệu quả.
        </p>
      </div>

      {/* Giới thiệu */}
      <section className="mt-12 max-w-4xl w-full px-4">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Giới thiệu
        </h2>
        <p className="text-gray-700 text-justify">
          Hệ thống giúp kết nối sinh viên với giảng viên hướng dẫn, hỗ trợ đăng
          ký đề tài, quản lý tiến độ, và cập nhật thông báo quan trọng. Giao
          diện thân thiện, dễ sử dụng.
        </p>
      </section>

      {/* Các tính năng nổi bật */}
      <section className="mt-10 max-w-5xl w-full px-4">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Tính năng nổi bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-600 text-3xl mb-2">📚</span>
            <h3 className="font-bold text-lg mb-2">Quản lý đề tài</h3>
            <p className="text-gray-600 text-center">
              Dễ dàng đăng ký, cập nhật và theo dõi tiến độ các đề tài đồ án tốt
              nghiệp.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-600 text-3xl mb-2">👨‍🏫</span>
            <h3 className="font-bold text-lg mb-2">Kết nối giảng viên</h3>
            <p className="text-gray-600 text-center">
              Tìm kiếm, liên hệ và nhận hướng dẫn từ các giảng viên chuyên môn.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-blue-600 text-3xl mb-2">🔔</span>
            <h3 className="font-bold text-lg mb-2">Thông báo nhanh chóng</h3>
            <p className="text-gray-600 text-center">
              Cập nhật thông báo, lịch trình và các mốc quan trọng kịp thời.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 mb-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Hệ thống Quản lý Đồ án Tốt nghiệp - UTE
      </footer>
    </div>
  );
};

export default Home;
