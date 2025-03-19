// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Chip,
//   Container,
//   IconButton,
//   Skeleton,
//   Tab,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useRef, useState } from "react";
// import defaultImage from "../../../assets/images/default-avatar.png";
// import SubtitlesIcon from "@mui/icons-material/Subtitles";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import SchoolIcon from "@mui/icons-material/School";
// import ClassIcon from "@mui/icons-material/Class";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getTeamDetailsAction } from "../../../redux/Team/Action";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import { getChatRoomByTeamIdAction } from "../../../redux/Chat/Action";

// import TabChatMessage from "./Tab/TabChatMessage";

// var client = null;
// const ProgressManagerXXXXXXXXX = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { teamReducer } = useSelector((store) => store);
//   const { authReducer } = useSelector((store) => store);
//   const [isDelayedLoading, setIsDelayedLoading] = useState(true);
//   const isTeamLoading = teamReducer.isLoading;
//   const [tabValue, setTabValue] = useState("1");

//   // get Team details and get Chat room by teamId:
//   useEffect(() => {
//     const teamId =
//       authReducer.user?.userDetails?.team?.teamId || teamReducer?.teamId;

//     dispatch(getChatRoomByTeamIdAction({ teamId }));

//     console.log("TEAM_ID" + teamId);
//     dispatch(getTeamDetailsAction(teamId));
//   }, [dispatch]);

//   // handle loading :
//   useEffect(() => {
//     if (isTeamLoading) {
//       setIsDelayedLoading(true);
//     } else {
//       const timer = setTimeout(() => {
//         setIsDelayedLoading(false);
//       }, 800);

//       return () => clearTimeout(timer);
//     }
//   }, [isTeamLoading]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   return (
//     <Container className="border border-red-400">
//       <div className="py-7">
//         {/* TEAM NAME */}
//         <div className="flex items-center justify-center gap-2">
//           <Typography
//             color="primary"
//             className="uppercase text-center"
//             component="h2"
//             sx={{ fontSize: 35 }}
//           >
//             Nhóm của bạn:
//           </Typography>
//           <h3 className="text-center text-3xl font-semibold">
//             {teamReducer.teamDetails?.teamName}
//           </h3>
//         </div>
//         {/* TEAM NUMBERS */}
//         <p className="text-center text-xl mt-2 text-gray-600 mb-5">
//           Số lượng thành viên đã tham gia:
//           <b className="pl-1">
//             {teamReducer.teamDetails?.joinedMemberQuantity}/
//             {teamReducer.teamDetails?.memberQuantity}
//           </b>
//         </p>

//         {/* STUDENT LIST */}
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {teamReducer.teamDetails?.students.map((item, index) => (
//             <Card className="relative" key={index}>
//               {authReducer.user?.userDetails.leader && !item.leader && (
//                 <div className="absolute top-1 right-1">
//                   <IconButton color="error">
//                     <DeleteIcon fontSize="large" />
//                   </IconButton>
//                 </div>
//               )}

//               {!item.leader && (
//                 <div className="absolute top-2 left-1">
//                   <Chip
//                     className="shadow-md font-medium"
//                     label={item.joinedTeam ? "Đã tham gia" : "Chưa tham gia"}
//                     sx={{
//                       color: item.joinedTeam ? "#408944" : "#d74141",
//                       backgroundColor: item.joinedTeam ? "#edf7ed" : "#fdeded",
//                     }}
//                   />
//                 </div>
//               )}

//               {isDelayedLoading ? (
//                 <Skeleton variant="rectangular" height={250} />
//               ) : (
//                 <CardMedia
//                   sx={{ height: 250 }}
//                   image={item.image || defaultImage}
//                   title={item.fullName}
//                 />
//               )}

//               <CardContent>
//                 {isDelayedLoading ? (
//                   <Skeleton />
//                 ) : (
//                   <h3 className="text-center text-xl font-medium text-[#1ca3aa] mb-3">
//                     {item.fullName}
//                   </h3>
//                 )}

//                 {isDelayedLoading ? (
//                   <Box sx={{ pt: 0.5 }}>
//                     <Skeleton />
//                     <Skeleton width="80%" />
//                     <Skeleton width="60%" />
//                     <Skeleton width="50%" />
//                   </Box>
//                 ) : (
//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2">
//                       <p className="flex items-center gap-1 text-gray-600">
//                         <SubtitlesIcon />
//                         <b>MSSV:</b>
//                       </p>
//                       <span>{item.studentCode}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <p className="flex items-center gap-1 text-gray-600">
//                         <CalendarMonthIcon />
//                         <b>Ngày sinh:</b>
//                       </p>
//                       <span>
//                         {new Date(item.dateOfBirth).toLocaleDateString("en-GB")}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <p className="flex items-center gap-1 text-gray-600">
//                         <ClassIcon />
//                         <b>Lớp:</b>
//                       </p>
//                       <span>{item.studentClass.className}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <p className="flex items-center gap-1 text-gray-600">
//                         <SchoolIcon />
//                         <b>Khoa:</b>
//                       </p>
//                       <span>{item.studentClass.faculty.facultyName}</span>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//               <CardActions className="flex justify-center">
//                 <Button
//                   sx={{ marginBottom: 2, borderRadius: 9999 }}
//                   variant="contained"
//                   color={item.leader ? "success" : "info"}
//                   // loading={isDelayedLoading}
//                 >
//                   {item.leader ? "Nhóm trưởng" : "Thành viên"}
//                 </Button>
//                 {/* )} */}
//               </CardActions>
//             </Card>
//           ))}
//         </div>

//         {/* TAB LIST */}
//         <div className="mt-10">
//           <TabContext value={tabValue}>
//             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//               <TabList onChange={handleTabChange}>
//                 <Tab label="Đánh giá của giáo viên" value="1" />
//                 <Tab label="Báo cáo của sinh viên" value="2" />
//                 <Tab label="Hỏi đáp với giáo viên" value="3" />
//               </TabList>
//             </Box>
//             <TabPanel value="1">Item One</TabPanel>
//             <TabPanel value="2">Item Two</TabPanel>

//             {/* Tab Chat */}
//             <TabPanel value="3">
//               <TabChatMessage />
//             </TabPanel>
//           </TabContext>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default ProgressManagerXXXXXXXXX;
