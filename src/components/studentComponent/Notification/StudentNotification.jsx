import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import defaultAvatar from "../../../assets/images/default-avatar.png"; // Adjust the path as necessary
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationsByTeacherAndSemesterAction } from "../../../redux/Notification/Action";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { getCurrentSemesterAction } from "../../../redux/Semester/Action";
import { getInstructorByStudentIdAction } from "../../../redux/Student/Action";

var client = null;
const StudentNotification = () => {
  const { notificationReducer, authReducer, semesterReducer, studentReducer } =
    useSelector((store) => store);
  const dispatch = useDispatch();

  const [notifications, setNofitications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // get instructor of student in current semester:
    dispatch(
      getInstructorByStudentIdAction({
        studentId: authReducer.user?.userDetails.studentId,
      })
    );

    // get all notifications:
    if (studentReducer.instructor?.teacherCode) {
      const requestData = {
        teacherCode: studentReducer.instructor?.teacherCode,
      };

      dispatch(getAllNotificationsByTeacherAndSemesterAction(requestData));
    }
  }, [studentReducer.instructor?.teacherCode, dispatch]);

  // get current semester
  useEffect(() => {
    dispatch(getCurrentSemesterAction());
  }, []);

  // handle set notifications
  useEffect(() => {
    if (notificationReducer.notifications) {
      setNofitications(notificationReducer.notifications.content || []);
      setPageNumber(notificationReducer.notifications.pageNumber || 1);
      setTotalPages(notificationReducer.notifications.totalPages || 1);
    }
  }, [notificationReducer.notifications]);

  // handle page change
  const handlePageChange = (event, value) => {
    setPageNumber(value);
    const requestData = {
      teacherCode: studentReducer.instructor?.teacherCode,
      pageNumber: value,
    };
    dispatch(getAllNotificationsByTeacherAndSemesterAction(requestData));
  };

  // handle connect to websocket server:
  useEffect(() => {
    let socket = new SockJS("http://localhost:8989/ws");
    client = over(socket);

    client.connect(
      {},
      () => {
        console.log(
          "--------------------Connected to the Websocket server--------------------"
        );

        // subscibe to the topic:
        client.subscribe(
          `/topic/notification/semester.${semesterReducer.currentSemester?.semesterId}/teacher.${studentReducer.instructor?.teacherCode}`,
          (msg) => {
            const receivedNotification = JSON.parse(msg.body);

            setNofitications((prevNotifications) => {
              // Check for duplicate notificationId
              if (
                !prevNotifications.some(
                  (item) =>
                    item.notificationId === receivedNotification.notificationId
                )
              ) {
                return [receivedNotification, ...prevNotifications];
              } else {
                // Update existing notification if it already exists
                return prevNotifications.map((item) =>
                  item.notificationId === receivedNotification.notificationId
                    ? receivedNotification
                    : item
                );
              }
            });
          }
        );
      },
      (error) => {
        console.error(
          "+++++++++++++++++++++++++++WebSocket connection error:",
          error
        );
      }
    );
    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [
    studentReducer.instructor?.teacherCode,
    semesterReducer.currentSemester?.semesterId,
  ]);

  return (
    <Container className="my-10 py-10" component={Paper}>
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30 }}
      >
        Xem thông báo
      </Typography>

      {/* Notification List */}
      <div className="mt-10">
        <h1 className="text-[#0355d2] font-bold uppercase pb-3 border-b-[2px] border-[#0355d2] mb-5">
          Danh sách thông báo
        </h1>
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.notificationId}
                className="flex items-start space-x-4 border-b pb-4"
              >
                <img
                  src={item.teacher.image || defaultAvatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.notificationTitle}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {item.notificationContent}
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    Được đăng bởi{" "}
                    <b className="px-1">{item.teacher.fullName}</b> vào lúc
                    <b className="px-1">
                      {new Date(item.createdDate).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </b>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Typography className="text-center text-gray-500">
              Không có thông báo nào.
            </Typography>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              count={totalPages}
              page={pageNumber}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default StudentNotification;
