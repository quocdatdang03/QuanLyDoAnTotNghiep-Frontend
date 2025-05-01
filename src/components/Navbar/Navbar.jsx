import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupIcon from "@mui/icons-material/Group";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonIcon from "@mui/icons-material/Person";
import Person3Icon from "@mui/icons-material/Person3";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Filter1Icon from "@mui/icons-material/Filter1";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/Auth/Action";

const pages = [
  {
    icon: <HomeIcon />,
    title: "Trang Chủ",
    path: "",
  },
  {
    icon: <NewspaperIcon />,
    title: "Tin Tức",
  },
  {
    icon: <ContactPageIcon />,
    title: "Liên Hệ",
  },
  {
    icon: <PersonIcon />,
    title: "Sinh Viên",
  },
  {
    icon: <Person3Icon />,
    title: "Giảng Viên",
  },
];

const sinhVienOptions = [
  {
    icon: <NotificationsIcon />,
    title: "Xem thông báo",
    path: "/student/notifications",
  },
  {
    icon: <HowToRegIcon />,
    title: "Đề xuất GVHD",
    path: "/student/recommendTeacher",
  },
  {
    icon: <HistoryEduIcon />,
    title: "Đăng ký đề tài",
    path: "/student/project/register",
  },
  // {
  //   icon: <GroupIcon />,
  //   title: "Đăng ký nhóm",
  //   path: "/student/teams/register",
  // },
  {
    icon: <ManageHistoryIcon />,
    title: "Quản lý tiến độ",
    path: "/student/progress/manage",
  },
  {
    icon: <DescriptionIcon />,
    title: "Tài liệu hướng dẫn",
    path: "/student/documents",
  },
];
const giangVienOptions = [
  {
    icon: <NotificationAddIcon />,
    title: "Đăng thông báo",
    path: "/teacher/notifications",
  },
  {
    icon: <GroupsIcon />,
    title: "Danh sách sinh viên",
    path: "/teacher/students",
  },
  {
    icon: <ListAltIcon />,
    title: "Danh sách đề tài",
    path: "/teacher/projects",
  },
  {
    icon: <Filter1Icon />,
    title: "Quản lý giai đoạn",
    path: "/teacher/stages",
  },
  {
    icon: <ManageHistoryIcon />,
    title: "Quản lý tiến độ",
    path: "/teacher/progress/manage",
  },
  {
    icon: <DescriptionIcon />,
    title: "Tài liệu hướng dẫn",
    path: "/teacher/documents",
  },
];
const loggedInSettings = ["Thông tin cá nhân", "Đăng xuất"];
const nonLoggedInSettings = ["Đăng nhập"];

function Navbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorElStudent, setAnchorElStudent] = React.useState(null);
  const [anchorElTeacher, setAnchorElTeacher] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openStudentOption, setOpenStudentOption] = React.useState(false);
  const [openTeacherOption, setOpenTeacherOption] = React.useState(false);
  const navigate = useNavigate();
  const { authReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const isAuthLoading = authReducer.isLoading;
  const [isDelayedLoading, setIsDelayedLoading] = React.useState(true);

  const handleOpenMenuStudent = (event) => {
    setAnchorElStudent(event.currentTarget);
  };

  const handleCloseMenuStudent = () => {
    setAnchorElStudent(null);
  };

  const handleOpenMenuTeacher = (event) => {
    setAnchorElTeacher(event.currentTarget);
  };

  const handleCloseMenuTeacher = () => {
    setAnchorElTeacher(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateToLoginPage = () => {
    handleCloseUserMenu();
    navigate("/account/login");
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    setAnchorElUser(null);
    navigate("/account/login");
  };

  const handleNavigateToProfile = () => {
    setAnchorElUser(null);
    navigate("/user/profile");
  };

  const handleNavigateToStudentPath = (path) => {
    handleCloseMenuStudent();
    navigate(path);
  };

  const handleNavigateToTeacherPath = (path) => {
    handleCloseMenuTeacher();
    navigate(path);
  };

  const handleNavigateToPathOnDrawer = (path) => {
    setOpenDrawer(false);
    navigate(path);
  };

  // handle loading :
  React.useEffect(() => {
    if (isAuthLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isAuthLoading]);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* START LOGO ON LARGE SCREEN*/}
          <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            className="cursor-pointer"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            UTE
          </Typography>
          {/* END LOGO ON LARGE SCREEN*/}

          {/* START LIST ITEM OF NAVBAR (LARGE SCREEN) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page.title === "Sinh Viên" ? (
                authReducer.user?.roles[0].roleName === "SINHVIEN" && (
                  <div key={page.title}>
                    <Button
                      onMouseEnter={handleOpenMenuStudent}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        textTransform: "none",
                      }}
                    >
                      {page.title}
                      <ArrowDropDownIcon />
                    </Button>
                    <Menu
                      anchorEl={anchorElStudent}
                      open={Boolean(anchorElStudent)}
                      onClose={handleCloseMenuStudent}
                      MenuListProps={{ onMouseLeave: handleCloseMenuStudent }}
                    >
                      {sinhVienOptions.map((item) => (
                        <MenuItem
                          key={item.title}
                          onClick={() => handleNavigateToStudentPath(item.path)}
                        >
                          {item.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                )
              ) : page.title === "Giảng Viên" ? (
                (authReducer.user?.roles[0].roleName === "GIANGVIEN" ||
                  authReducer.user?.roles[0].roleName === "ADMIN") && (
                  <div key={page.title}>
                    <Button
                      onMouseEnter={handleOpenMenuTeacher}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        textTransform: "none",
                      }}
                    >
                      {page.title}
                      <ArrowDropDownIcon />
                    </Button>
                    <Menu
                      anchorEl={anchorElTeacher}
                      open={Boolean(anchorElTeacher)}
                      onClose={handleCloseMenuTeacher}
                      MenuListProps={{ onMouseLeave: handleCloseMenuTeacher }}
                    >
                      {giangVienOptions.map((option) => (
                        <MenuItem
                          key={option.title}
                          onClick={() =>
                            handleNavigateToTeacherPath(option.path)
                          }
                        >
                          {option.title}
                        </MenuItem>
                      ))}
                      {authReducer.user?.userDetails.isLeader && (
                        <>
                          <MenuItem
                            key="Phân chia GVHD"
                            onClick={() =>
                              handleNavigateToTeacherPath(
                                "/teacher/instructors"
                              )
                            }
                          >
                            Phân chia GVHD
                          </MenuItem>
                          <MenuItem
                            key="DSSV đã phân chia GVHD"
                            onClick={() =>
                              handleNavigateToTeacherPath(
                                "/teacher/instructors/results"
                              )
                            }
                          >
                            DSSV đã phân chia GVHD
                          </MenuItem>
                          <MenuItem
                            key="Tổng hợp đề tài ĐATN"
                            onClick={() =>
                              handleNavigateToTeacherPath(
                                "/teacher/projects/summary"
                              )
                            }
                          >
                            Tổng hợp đề tài ĐATN
                          </MenuItem>
                        </>
                      )}
                    </Menu>
                  </div>
                )
              ) : (
                <Button
                  key={page.title}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "none",
                  }}
                >
                  {page.title}
                </Button>
              )
            )}
          </Box>
          {/* END LIST ITEM OF NAVBAR (LARGE SCREEN) */}

          {/* START DRAWER  */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={() => setOpenDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <List component="nav" className="w-[250px]">
                {pages.map((page, index) =>
                  page.title === "Sinh Viên" ? (
                    authReducer.user?.roles[0].roleName === "SINHVIEN" && (
                      <>
                        <ListItemButton
                          onClick={() =>
                            setOpenStudentOption(!openStudentOption)
                          }
                        >
                          <ListItemIcon>{page.icon}</ListItemIcon>
                          <ListItemText primary={page.title} />
                          {openStudentOption ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={openStudentOption}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {sinhVienOptions.map((item) => (
                              <ListItemButton
                                sx={{ pl: 4 }}
                                key={item.title}
                                onClick={() =>
                                  handleNavigateToPathOnDrawer(item.path)
                                }
                              >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      </>
                    )
                  ) : page.title === "Giảng Viên" ? (
                    (authReducer.user?.roles[0].roleName === "GIANGVIEN" ||
                      authReducer.user?.roles[0].roleName === "ADMIN") && (
                      <>
                        <ListItemButton
                          onClick={() =>
                            setOpenTeacherOption(!openTeacherOption)
                          }
                        >
                          <ListItemIcon>{page.icon}</ListItemIcon>
                          <ListItemText primary={page.title} />
                          {openTeacherOption ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={openTeacherOption}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {giangVienOptions.map((item) => (
                              <ListItemButton
                                sx={{ pl: 4 }}
                                key={item.title}
                                onClick={() =>
                                  handleNavigateToPathOnDrawer(item.path)
                                }
                              >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                              </ListItemButton>
                            ))}
                            {authReducer.user?.userDetails.isLeader && (
                              <>
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  key="Phân chia GVHD"
                                  onClick={() =>
                                    handleNavigateToPathOnDrawer(
                                      "/teacher/instructors"
                                    )
                                  }
                                >
                                  <ListItemIcon>
                                    <AssignmentIndIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Phân chia GVHD" />
                                </ListItemButton>
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  key="DSSV đã phân chia GVHD"
                                  onClick={() =>
                                    handleNavigateToPathOnDrawer(
                                      "/teacher/instructors/results"
                                    )
                                  }
                                >
                                  <ListItemIcon>
                                    <PeopleAltIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="DSSV đã phân chia GVHD" />
                                </ListItemButton>
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  key="Tổng hợp đề tài ĐATN"
                                  onClick={() =>
                                    handleNavigateToPathOnDrawer(
                                      "/teacher/projects/summary"
                                    )
                                  }
                                >
                                  <ListItemIcon>
                                    <ReceiptLongIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Tổng hợp đề tài ĐATN" />
                                </ListItemButton>
                              </>
                            )}
                          </List>
                        </Collapse>
                      </>
                    )
                  ) : (
                    <ListItem key={page.title} disablePadding>
                      <ListItemButton sx={{ paddingRight: 8 }}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.title} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
              </List>
            </Drawer>
          </Box>
          {/* END DRAWER  */}

          {/* START LOGO ON SMALL SCREEN*/}
          <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            UTE
          </Typography>

          {/* END LOGO ON SMALL SCREEN*/}

          {/* START AVATAR SETTING */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={authReducer.user?.fullName}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {authReducer.user && isDelayedLoading ? (
                  <Skeleton variant="circular" height={40} width={40} />
                ) : authReducer.user && !isDelayedLoading ? (
                  authReducer.user?.image ? (
                    <img
                      className="rounded-full w-10 h-10 object-cover object-center"
                      src={authReducer.user?.image}
                      alt="Avatar"
                    />
                  ) : (
                    <Avatar
                      className="uppercase"
                      alt={authReducer.user?.fullName}
                      src={authReducer.user?.image}
                    />
                  )
                ) : (
                  <AccountCircleIcon className="text-white" fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {authReducer.user
                ? loggedInSettings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Đăng xuất"
                          ? handleLogout
                          : handleNavigateToProfile
                      }
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))
                : nonLoggedInSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleNavigateToLoginPage}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          {/* END AVATAR SETTING */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
