import { useNavigate } from "react-router-dom";

const AdminBreadCrumbs = ({ links }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex items-center text-sm text-gray-600 space-x-1">
      <span
        onClick={() => navigate("/admin")}
        className="hover:bg-gray-300 cursor-pointer transition-colors duration-150 bg-gray-200 py-1 px-3 rounded-full"
      >
        Trang quản trị
      </span>

      {links?.map((item, index) => {
        const isLast = index === links.length - 1;
        return (
          <div key={index} className="flex items-center space-x-1">
            {/* Icon phân tách (>) */}
            <svg
              className="w-4 h-4 text-gray-400 mx-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            {/* <ChevronRightIcon /> */}

            {isLast ? (
              <span className="text-gray-400">{item.label}</span>
            ) : (
              <span
                onClick={() => navigate(item.href)}
                className=" hover:bg-gray-300 cursor-pointer transition-colors duration-150 bg-gray-200 py-1 px-3 rounded-full"
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminBreadCrumbs;
