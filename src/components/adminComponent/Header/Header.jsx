import React, { useEffect, useState } from "react";
import defaultImage from "../../../assets/images/default-avatar.png";
import logoUTE from "../../../assets/images/logo-ute.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutAction } from "../../../redux/Auth/Action";

const loggedInSettings = ["Thông tin cá nhân", "Đăng xuất"];
const Header = () => {
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;

  const handleOpenMenuAdmin = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseMenuAdmin = () => {
    setAnchorElAdmin(null);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    setAnchorElAdmin(null);
    navigate("/account/login");
  };

  const handleNavigateToProfile = () => {
    setAnchorElAdmin(null);
    navigate("/admin/profile");
  };

  // handle loading :
  useEffect(() => {
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
    <div className="w-full flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-1">
        <img src={logoUTE} width="55" height="55" />
        <p className="font-bold tracking-wide">ADMIN</p>
      </div>

      {/* START AVATAR SETTING */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="admin">
          <IconButton onClick={handleOpenMenuAdmin} sx={{ p: 0 }}>
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
          anchorEl={anchorElAdmin}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElAdmin)}
          onClose={handleCloseMenuAdmin}
        >
          {loggedInSettings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={
                setting === "Đăng xuất" ? handleLogout : handleNavigateToProfile
              }
            >
              <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/* END AVATAR SETTING */}
    </div>
  );
};

export default Header;
