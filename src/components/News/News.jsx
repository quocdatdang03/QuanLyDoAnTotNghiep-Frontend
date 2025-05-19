import React from "react";
import devImage from "../../assets/images/dev-image.png";
import noResultImg from "../../assets/images/no-result-img.png";
import logoUte from "../../assets/images/logo-ute.png";

const newsList = [
  {
    id: 1,
    title: "Khai giảng năm học mới 2025-2026",
    description:
      "Trường Đại học Sư phạm Kỹ thuật tổ chức lễ khai giảng năm học mới với nhiều hoạt động ý nghĩa dành cho sinh viên và giảng viên.",
    image: devImage,
    date: "19/05/2025",
  },
  {
    id: 2,
    title: "Thông báo về việc đăng ký đề tài ĐATN đợt 1",
    description:
      "Sinh viên năm cuối lưu ý thời gian đăng ký đề tài Đồ án tốt nghiệp đợt 1 bắt đầu từ ngày 25/05/2025.",
    image: noResultImg,
    date: "18/05/2025",
  },
  {
    id: 3,
    title: "Hội thảo hướng nghiệp cho sinh viên năm cuối",
    description:
      "Hội thảo với sự tham gia của các doanh nghiệp lớn, giúp sinh viên định hướng nghề nghiệp và chuẩn bị cho tương lai.",
    image: logoUte,
    date: "15/05/2025",
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 text-center">
        Tin tức mới nhất
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {newsList.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-blue-800 mb-2 line-clamp-2">
                {news.title}
              </h2>
              <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                {news.description}
              </p>
              <div className="text-sm text-gray-400 mt-auto">
                Ngày đăng: {news.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
