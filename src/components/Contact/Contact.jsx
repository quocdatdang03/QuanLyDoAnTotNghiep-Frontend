import React from "react";
import logoUte from "../../assets/images/logo-ute.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
        Liên hệ
      </h1>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full flex flex-col items-center">
        <img
          src={logoUte}
          alt="UTE Logo"
          className="w-20 h-20 mb-4 rounded-full bg-white shadow"
        />
        <p className="text-lg text-gray-700 mb-4 text-center">
          Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng
          tôi qua các thông tin dưới đây:
        </p>
        <div className="w-full mb-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold w-32">Địa chỉ:</span>
            <span>cơ sở 1 số 48 Cao Thắng, TP. Đà Nẵng</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-semibold w-32">Email:</span>
            <a
              href="mailto:dhspktdn@ute.udn.vn"
              className="text-blue-600 hover:underline"
            >
              dhspktdn@ute.udn.vn
            </a>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-semibold w-32">Điện thoại:</span>
            <a href="tel:02838968641" className="text-blue-600 hover:underline">
              (0236) 382257
            </a>
          </div>
        </div>
        <div className="w-full mt-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">
            Gửi phản hồi nhanh
          </h2>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Họ và tên"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <textarea
              placeholder="Nội dung"
              rows={4}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 transition"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
