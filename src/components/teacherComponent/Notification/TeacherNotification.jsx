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
import { useFormik } from "formik";
import { formNotificationValidation } from "./validation/formNotifiticationValidation";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationsByTeacherAndSemesterAction } from "../../../redux/Notification/Action";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { getCurrentSemesterAction } from "../../../redux/Semester/Action";

var client = null;
const TeacherNotification = () => {
  const { notificationReducer, authReducer, semesterReducer } = useSelector(
    (store) => store
  );
  const dispatch = useDispatch();

  const [notifications, setNofitications] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stompClient, setStompClient] = useState(null);

  // handle send nofitication:
  const formik = useFormik({
    validationSchema: formNotificationValidation,
    initialValues: {
      notificationTitle: "",
      notificationContent: "",
    },
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        ...values,
        teacherCode: authReducer.user?.code,
      };

      console.log(requestData);

      stompClient.send(
        "/app/sendNotification",
        {},
        JSON.stringify(requestData)
      );

      resetForm();
    },
  });

  useEffect(() => {
    // get all notifications:
    if (authReducer.user?.code) {
      const requestData = {
        teacherCode: authReducer.user?.code,
      };

      dispatch(getAllNotificationsByTeacherAndSemesterAction(requestData));
    }
  }, [authReducer.user?.code, dispatch]);

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
      teacherCode: authReducer.user?.code,
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

        // Subscribe to the topic
        client.subscribe(
          `/topic/notification/semester.${semesterReducer.currentSemester?.semesterId}/teacher.${authReducer.user?.code}`,
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
  }, [authReducer.user?.code, semesterReducer.currentSemester?.semesterId]);

  return (
    <Container className="my-10 py-10" component={Paper}>
      <Typography
        color="primary"
        className="uppercase text-center"
        component="h2"
        sx={{ fontSize: 30 }}
      >
        Đăng thông báo
      </Typography>

      {/* Form Create Notification */}
      <form className="space-y-2 md:space-y-3" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="notificationTitle"
            className="block mb-2 text-sm font-medium"
          >
            Tiêu đề
          </label>
          <TextField
            label="Nhập tiêu đề thông báo"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            type="text"
            name="notificationTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notificationTitle}
            error={
              formik.errors.notificationTitle &&
              Boolean(formik.errors.notificationTitle)
            }
            helperText={
              formik.errors.notificationTitle && formik.errors.notificationTitle
            }
          />
        </div>
        <div>
          <label
            htmlFor="notificationContent"
            className="block mb-2 text-sm font-medium"
          >
            Nội dung
          </label>
          <TextField
            label="Nhập nội dung thông báo"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            sx={{ marginBottom: 2 }}
            type="text"
            name="notificationContent"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notificationContent}
            error={
              formik.errors.notificationContent &&
              Boolean(formik.errors.notificationContent)
            }
            helperText={
              formik.errors.notificationContent &&
              formik.errors.notificationContent
            }
          />
        </div>
        <div className="flex items-center justify-center">
          {" "}
          <Button variant="contained" sx={{ paddingY: 1 }} type="submit">
            Đăng thông báo
          </Button>
        </div>
      </form>

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

export default TeacherNotification;
