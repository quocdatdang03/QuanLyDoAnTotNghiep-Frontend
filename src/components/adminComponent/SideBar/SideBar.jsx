import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
  Toolbar,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import Header from "../Header/Header";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Groups3Icon from "@mui/icons-material/Groups3";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { Route, Routes, useNavigate } from "react-router-dom";
import ManageStudentRegister from "../ManageStudentRegister/ManageStudentRegister";
import ManageSemester from "../ManageSemester/ManageSemester";
import AdminProfile from "../AdminProfile/AdminProfile";
import FormEditSchoolYear from "../ManageSemester/FormEditSchoolYear";
import FormEditSemester from "../ManageSemester/FormEditSemester";
import ManageTeacher from "../ManageTeacher/ManageTeacher";
import FormCreateTeacher from "../ManageTeacher/FormCreateTeacher";
import FormEditTeacher from "../ManageTeacher/FormEditTeacher";
import ManageStudent from "../ManageStudent/ManageStudent";
import FormCreateStudent from "../ManageStudent/FormCreateStudent";
import FormEditStudent from "../ManageStudent/FormEditStudent";
import FormCreateStudentSemester from "../ManageStudentRegister/FormCreateStudentSemester";
import Dashboard from "../Dashboard/Dashboard";

// +++++++++++++  start for drawer
const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

// +++++++++++++  End for drawer

const sidebarAdminOptions = [
  {
    text: "Bảng điều khiển",
    icon: <DashboardIcon />,
    path: "/admin/",
  },
  {
    text: "Quản lý học kỳ đồ án",
    icon: <EventNoteIcon />,
    path: "/admin/manage-semester",
  },
  {
    text: "Quản lý tài khoản sinh viên",
    icon: <SupervisedUserCircleIcon />,
    path: "/admin/manage-student",
  },
  {
    text: "Quản lý tài khoản giảng viên",
    icon: <Groups3Icon />,
    path: "/admin/manage-teacher",
  },
  {
    text: "Quản lý sinh viên đăng ký ĐATN",
    icon: <GroupIcon />,
    path: "/admin/manage-registerStudent",
  },
];

// ADMIN sidebar:
export const SideBar = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          {/* HEADER */}
          <Header />
          {/* END HEADER */}
        </Toolbar>
      </AppBar>
      {/* SIDE BAR */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MenuOpenIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarAdminOptions.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "block", paddingX: 1, paddingY: 0 }}
              onClick={() => navigate(item.path)}
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: 2,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* END SIDE BAR */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* CONTENT */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile/*" element={<AdminProfile />} />
          <Route path="/manage-semester" element={<ManageSemester />} />
          <Route
            path="/manage-semester/schoolYear/edit/:schoolYearIdParam"
            element={<FormEditSchoolYear />}
          />
          <Route
            path="/manage-semester/semester/edit/:semesterIdParam"
            element={<FormEditSemester />}
          />
          <Route
            path="/manage-registerStudent"
            element={<ManageStudentRegister />}
          />
          <Route
            path="/manage-registerStudent/create"
            element={<FormCreateStudentSemester />}
          />
          <Route path="/manage-student" element={<ManageStudent />} />
          <Route
            path="/manage-student/create"
            element={<FormCreateStudent />}
          />
          <Route
            path="/manage-student/edit/:studentCodeParam"
            element={<FormEditStudent />}
          />
          <Route path="/manage-teacher" element={<ManageTeacher />} />
          <Route
            path="/manage-teacher/create"
            element={<FormCreateTeacher />}
          />
          <Route
            path="/manage-teacher/edit/:teacherCodeParam"
            element={<FormEditTeacher />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default SideBar;
