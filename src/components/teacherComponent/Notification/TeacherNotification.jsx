import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  IconButton,
  Modal,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import ReactQuill from "react-quill";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import defaultAvatar from "../../../assets/images/default-avatar.png"; // Adjust the path as necessary
import { useFormik } from "formik";
import { formNotificationValidation } from "./validation/formNotifiticationValidation";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationsByTeacherAndSemesterAction } from "../../../redux/Notification/Action";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { getCurrentSemesterAction } from "../../../redux/Semester/Action";
import CustomBreadCrumb from "../../BreadCrumb/CustomBreadCrumb";

// style of delete progress report modal:
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

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

  const [openUpdateNotificationModal, setOpenUpdateNotificationModal] =
    useState(false);
  const [updateNotification, setUpdateNotification] = useState(null);

  const [
    openDeleteNotificationModalModal,
    setOpenDeleteNotificationModalModal,
  ] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(null);

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

  const formikUpdate = useFormik({
    enableReinitialize: true,
    validationSchema: formNotificationValidation,
    initialValues: {
      notificationTitle: updateNotification?.notificationTitle || "",
      notificationContent: updateNotification?.notificationContent || "",
    },
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        ...values,
        notificationId: updateNotification?.notificationId,
      };

      console.log(requestData);

      stompClient.send(
        "/app/updateNotification",
        {},
        JSON.stringify(requestData)
      );

      handleCloseUpdateNotificationModal();
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

  // handle open/close update notification modal:
  const handleOpenUpdateNotificationModal = (item) => {
    setOpenUpdateNotificationModal(true);
    setUpdateNotification(item);
  };

  const handleCloseUpdateNotificationModal = () => {
    setOpenUpdateNotificationModal(false);
    setUpdateNotification(null);
  };

  // handle open/close delete notification modal:
  const handleOpenDeleteNotificationModal = (item) => {
    setDeleteNotification(item);
    setOpenDeleteNotificationModalModal(true);
  };

  const handleCloseDeleteNotificationModal = () => {
    setOpenDeleteNotificationModalModal(false);
    setDeleteNotification(null);
  };

  // handle delete notification:
  const handleDeleteNotification = () => {
    const requestData = {
      notificationId: deleteNotification?.notificationId,
    };

    console.log(requestData);
    stompClient.send(
      "/app/deleteNotification",
      {},
      JSON.stringify(requestData)
    );

    handleCloseDeleteNotificationModal();
  };

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // get url from env file (both dev and product)

  // handle connect to websocket server:
  useEffect(() => {
    let socket = new SockJS(SOCKET_URL);
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
            const action = msg.headers.action;
            const receivedNotification = JSON.parse(msg.body);

            if (action === "DELETE") {
              setNofitications((prev) =>
                prev.filter(
                  (item) =>
                    item.notificationId !== receivedNotification.notificationId
                )
              );
            } else {
              setNofitications((prevNotifications) => {
                // Check for duplicate notificationId
                if (
                  !prevNotifications.some(
                    (item) =>
                      item.notificationId ===
                      receivedNotification.notificationId
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
    <>
      <Container className="my-10 py-10" component={Paper}>
        {/* Breadcrumbs */}
        <CustomBreadCrumb
          links={[{ label: "Thông báo", href: "/teacher/notifications" }]}
        />
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
                formik.errors.notificationTitle &&
                formik.errors.notificationTitle
              }
            />
          </div>
          {/* <div>
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
          </div> */}
          <div>
            <label
              htmlFor="notificationContent"
              className="block mb-2 text-sm font-medium"
            >
              Nội dung
            </label>
            <ReactQuill
              theme="snow"
              value={formik.values.notificationContent}
              onChange={(value) =>
                formik.setFieldValue("notificationContent", value)
              }
              style={{
                marginBottom: "3rem",
                height: "220px",
              }}
            />
            {formik.touched.notificationContent &&
              formik.errors.notificationContent && (
                <p className="text-red-500 text-sm mt-10">
                  {formik.errors.notificationContent}
                </p>
              )}
          </div>
          <div className="flex items-center justify-center">
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
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-start space-x-4 w-full">
                    <img
                      src={item.teacher.image || defaultAvatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.notificationTitle}
                      </h2>
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: item.notificationContent,
                        }}
                      />
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
                  <div className="flex items-center gap-3">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenUpdateNotificationModal(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteNotificationModal(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
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

      {/* UPDATE NOTIFICATION MODAL : */}
      <Modal
        open={openUpdateNotificationModal}
        onClose={handleCloseUpdateNotificationModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openUpdateNotificationModal} className="w-[90%] md:w-[50%]">
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Cập nhật thông báo
            </Typography>
            {/* Form Update Notification */}
            <form
              className="space-y-2 md:space-y-3"
              onSubmit={formikUpdate.handleSubmit}
            >
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
                  onChange={formikUpdate.handleChange}
                  onBlur={formikUpdate.handleBlur}
                  value={formikUpdate.values.notificationTitle}
                  error={
                    formikUpdate.errors.notificationTitle &&
                    Boolean(formikUpdate.errors.notificationTitle)
                  }
                  helperText={
                    formikUpdate.errors.notificationTitle &&
                    formikUpdate.errors.notificationTitle
                  }
                />
              </div>
              {/* <div>
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
                  onChange={formikUpdate.handleChange}
                  onBlur={formikUpdate.handleBlur}
                  value={formikUpdate.values.notificationContent}
                  error={
                    formikUpdate.errors.notificationContent &&
                    Boolean(formikUpdate.errors.notificationContent)
                  }
                  helperText={
                    formikUpdate.errors.notificationContent &&
                    formikUpdate.errors.notificationContent
                  }
                />
              </div> */}
              <div>
                <label
                  htmlFor="notificationContent"
                  className="block mb-2 text-sm font-medium"
                >
                  Nội dung
                </label>
                <ReactQuill
                  theme="snow"
                  value={formikUpdate.values.notificationContent}
                  onChange={(value) =>
                    formikUpdate.setFieldValue("notificationContent", value)
                  }
                  style={{
                    marginBottom: "3rem",
                    height: "220px",
                  }}
                />
                {formikUpdate.touched.notificationContent &&
                  formikUpdate.errors.notificationContent && (
                    <p className="text-red-500 text-sm mt-10">
                      {formikUpdate.errors.notificationContent}
                    </p>
                  )}
              </div>
              <div className="flex items-center justify-center">
                <Button variant="contained" sx={{ paddingY: 1 }} type="submit">
                  Cập nhật thông báo
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>

      {/* DELETE NOTIFICATION MODAL : */}
      <Modal
        open={openDeleteNotificationModalModal}
        onClose={() => setOpenDeleteNotificationModalModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade
          in={openDeleteNotificationModalModal}
          className="w-[90%] md:w-[50%]"
        >
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Xác nhận xóa?
            </Typography>
            <div>
              <p>
                Bạn có chắc chắn muốn xóa báo cáo thông báo:
                <b className="pl-3">{deleteNotification?.notificationTitle}</b>
              </p>
              <div className="mt-3 space-x-3 text-right">
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleCloseDeleteNotificationModal}
                >
                  Hủy bỏ
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteNotification}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TeacherNotification;
