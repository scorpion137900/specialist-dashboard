import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/features/auth/thunks/authThunks";
import { useSelector } from "react-redux";
const AvatarProfile = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const logOut = () => {
    handleCloseUserMenu();
    dispatch(logout()).then(() => navigate("/login"));
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const user = useSelector((state) => state.auth.user);
  /*
      
  */
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <Button
            variant="contained"
            startIcon={<ManageAccountsIcon />}
            onClick={handleOpenUserMenu}
          >
            {matches ? null : user?.name}
          </Button>
        </Tooltip>
        <Menu
          sx={{ mt: "45px", zIndex: "9999", color: "var(--text-color)" }}
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
          <MenuItem onClick={logOut}>
            <Typography textAlign="center">تسجيل الخروج</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              navigate("/reset-password");
            }}
          >
            <Typography textAlign="center">اعادة تعيين كلمة المرور</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              navigate("/profile");
            }}
          >
            <Typography textAlign="center">صفحتي الشخصية</Typography>
          </MenuItem>
          {/* {userMenu.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))} */}
        </Menu>
      </Box>
    </>
  );
};

export default AvatarProfile;
