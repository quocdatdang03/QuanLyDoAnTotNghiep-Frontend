import DashboardCardItem from "./DashboardCardItem";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SchoolIcon from "@mui/icons-material/School";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllFacultiesAction } from "../../../redux/Faculty/Action";
import {
  getAllClassesAction,
  getAllClassesByFacultyAction,
} from "../../../redux/Class/Action";
import {
  getAllSemestersWithoutPaginationAction,
  getCurrentSemesterAction,
} from "../../../redux/Semester/Action";
import {
  countAllRegisteredProjectStudent,
  countAllStudents,
  countAllStudentSemesters,
  countAllTeachers,
} from "../../../redux/Dashboard/Action";
import dashboardReducer from "../../../redux/Dashboard/Reducer";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { facultyReducer, classReducer, semesterReducer, dashboardReducer } =
    useSelector((store) => store);

  const [classId, setClassId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  const handleFilterByFaculty = (facultyId) => {
    setFacultyId(facultyId);
    setClassId(""); // reset classId when changing facultyId

    if (facultyId !== "") {
      // get all Classes by facultyId (when changing dropdownlist faculty)
      const requestData = {
        facultyId: facultyId,
      };

      dispatch(getAllClassesByFacultyAction(requestData));
    } else {
      dispatch(getAllClassesAction());
    }
  };

  // handle clear filter
  const handleClearFilter = () => {
    setClassId("");
    setFacultyId("");
    setSemesterId(semesterReducer?.currentSemester.semesterId);

    dispatch(getAllClassesAction());
  };

  // get all Faculty, Class, current Semester
  useEffect(() => {
    dispatch(getAllFacultiesAction());
    dispatch(getAllClassesAction());
    dispatch(getCurrentSemesterAction());
    dispatch(getAllSemestersWithoutPaginationAction());
  }, [dispatch]);

  // Khi lấy được học kỳ hiện tại từ store thì cập nhật semesterId
  useEffect(() => {
    if (semesterReducer.currentSemester?.semesterId) {
      setSemesterId(semesterReducer.currentSemester.semesterId);
    }
  }, [semesterReducer.currentSemester]);

  // count all students, teachers, studentSemesters, registeredProjectStudent
  useEffect(() => {
    const requestData = {};

    dispatch(countAllStudents(requestData));
    dispatch(countAllTeachers(requestData));
    dispatch(countAllStudentSemesters(requestData));
    dispatch(countAllRegisteredProjectStudent(requestData));
  }, []);

  // count after filtering
  useEffect(() => {
    const requestDataStudents = { facultyId, classId };
    const requestDataTeachers = { facultyId };
    const requestDataStudentSemesters = { facultyId, classId, semesterId };

    dispatch(countAllStudents(requestDataStudents));
    dispatch(countAllTeachers(requestDataTeachers));
    dispatch(countAllStudentSemesters(requestDataStudentSemesters));
    dispatch(countAllRegisteredProjectStudent(requestDataStudentSemesters));
  }, [facultyId, classId, semesterId]);

  const cardDatas = [
    {
      fromColor: "#1ea357",
      toColor: "#47d382",
      cardTitle: "Số tài khoản sinh viên",
      cardNumber: dashboardReducer?.studentNumber,
      cardIcon: <SupervisedUserCircleIcon sx={{ fontSize: "40px" }} />,
      filterBy: [facultyId && "Khoa", classId && "Lớp"].filter(Boolean),
    },
    {
      fromColor: "#2d79e5",
      toColor: "#5faef5",
      cardTitle: "Số tài khoản giảng viên",
      cardNumber: dashboardReducer?.teacherNumber,
      cardIcon: <AccountCircleIcon sx={{ fontSize: "40px" }} />,
      filterBy: [facultyId && "Khoa"].filter(Boolean),
    },
    {
      fromColor: "#c114e3",
      toColor: "#ea62fe",
      cardTitle: "Số sinh viên trong học kỳ đồ án ",
      cardNumber: dashboardReducer?.studentSemesterNumber,
      cardIcon: <SchoolIcon sx={{ fontSize: "40px" }} />,
      filterBy: [
        facultyId && "Khoa",
        classId && "Lớp",
        semesterId && "Học kỳ",
      ].filter(Boolean),
    },
    {
      fromColor: "#e1960e",
      toColor: "#f3cc28",
      cardTitle: "Số sinh viên đã đăng ký đề tài tốt nghiệp",
      cardNumber: dashboardReducer?.registeredProjectStudentNumber,
      cardIcon: <HowToRegIcon sx={{ fontSize: "40px" }} />,
      filterBy: [
        facultyId && "Khoa",
        classId && "Lớp",
        semesterId && "Học kỳ",
      ].filter(Boolean),
    },
  ];

  const chartData = [
    {
      name: "Tài khoản sinh viên",
      value: dashboardReducer?.studentNumber,
    },
    {
      name: "Tài khoản giảng viên",
      value: dashboardReducer?.teacherNumber,
    },
    {
      name: "Sinh viên trong học kỳ đồ án",
      value: dashboardReducer?.studentSemesterNumber,
    },
    {
      name: "Sinh viên đã đăng ký đề tài",
      value: dashboardReducer?.registeredProjectStudentNumber,
    },
  ];

  const barColors = ["#33bb6d", "#4593ed", "#d539f0", "#e9af1a"];

  const pieChartData = [
    {
      name: "Đã đăng ký",
      value: dashboardReducer?.registeredProjectStudentNumber,
    },
    {
      name: "Chưa đăng ký",
      value:
        dashboardReducer?.studentSemesterNumber -
        dashboardReducer?.registeredProjectStudentNumber,
    },
  ];

  return (
    <Container className="my-5">
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30, fontWeight: "bold" }}
      >
        Bảng điều khiển
      </Typography>

      <div className="mt-2">
        {/* FILTER SECTION */}
        <div>
          <p className="uppercase font-bold mb-2">Lọc dữ liệu</p>
          <div className="flex gap-5 w-full mb-5 max-w-[80vw] md:max-w-[50vw]">
            {/* FILTER BY SEMESTER */}
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Học kỳ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={semesterId}
                label="Học kỳ"
                onChange={(e) => setSemesterId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Học kỳ</em> {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                </MenuItem>
                {semesterReducer.semesters?.map((item) => {
                  return (
                    <MenuItem key={item.semesterId} value={item.semesterId}>
                      {item.semesterName}
                      {item.isCurrent && (
                        <span className="pl-1 font-bold">
                          (Học kỳ hiện tại)
                        </span>
                      )}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* FILTER BY FACULTY */}
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={facultyId}
                label="Khoa"
                onChange={(e) => handleFilterByFaculty(e.target.value)}
              >
                <MenuItem value="">
                  <em>Khoa</em> {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                </MenuItem>
                {facultyReducer.faculties?.map((item) => {
                  return (
                    <MenuItem key={item.facultyId} value={item.facultyId}>
                      {item.facultyName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* FILTER BY CLASS */}
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Lớp</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={classId}
                label="Lớp"
                onChange={(e) => setClassId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Lớp</em> {/* Giá trị rỗng để hiển thị khi chưa chọn */}
                </MenuItem>
                {classReducer.classes?.map((item) => {
                  return (
                    <MenuItem key={item.classId} value={item.classId}>
                      {item.className}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              title="Hủy bỏ lọc"
              sx={{ padding: 0, backgroundColor: "#c7e2d3" }}
              onClick={() => handleClearFilter()}
            >
              <FilterAltOffIcon sx={{ color: "#2e7d32" }} />
            </Button>
          </div>
        </div>

        {/* CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {/* Card items */}
          {cardDatas.map((item, index) => (
            <DashboardCardItem
              key={index}
              fromColor={item.fromColor}
              toColor={item.toColor}
              cardTitle={item.cardTitle}
              cardNumber={item.cardNumber}
              cardIcon={item.cardIcon}
              filterBy={item.filterBy}
            />
          ))}
        </div>

        {/* CHART SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          {/* Bar Chart */}
          <div className="w-full mt-10">
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [`${value}`, "Số lượng"]} />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={50}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Chú thích ở dưới */}
            <div className="flex flex-col items-start mt-2 space-y-1 ml-10">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      backgroundColor: barColors[index % barColors.length],
                    }}
                  ></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Pie Chart */}
          <div className="w-full">
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    <Cell fill="#1ea357" />
                    <Cell fill="#e1960e" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center mt-2 text-lg">
              Thống kê sinh viên đăng ký đề tài
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
