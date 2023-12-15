import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AvatarProfile from "./AvatarProfile";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// import logo from "../../assets/logo.svg";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { PATHS } from "../../utils/constants";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log(user, "isMaster", user?.isMaster);
  const isAdmin = user?.isMaster;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { pathname } = useLocation();
  const drawer = (
    <div>
      <Toolbar
        sx={{
          "&": {
            minHeight: mobileOpen ? "10px" : "64px",
          },
        }}
      />
      {/* <Divider /> */}
      <Menu>
        {mobileOpen && <Logo />}
        <List sx={{ py: "15px", px: "10px" }}>
          {PATHS(isAdmin)?.map((el, index) => {
            if (el) {
              if (!el?.multiple)
                return (
                  <NavLink to={`${el?.path}`} key={index}>
                    <ListItem
                      disablePadding
                      sx={{
                        fontWeight: "bold",
                        my: "5px",
                        ".active & ": {
                          color: "var(--main-color)",
                          background: " #f6f9ff ",
                        },
                      }}
                    >
                      <ListItemButton>
                        <ListItemText
                          sx={{
                            "& > * ": {
                              fontWeight: "600 ",
                              fontSize: "1.1rem",
                            },
                            ".active & > * ": {
                              fontWeight: "bold",
                            },
                          }}
                          primary={el?.name}
                          z
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                );
              // console.log(pathname.includes(el.path));
              return (
                <SubMenu
                  label={el?.name}
                  id={el?.name}
                  key={el?.name}
                  defaultOpen={pathname?.includes(el?.path)}

                  // open={pathname.startsWith(el.path)}
                >
                  {el?.subPaths?.map((path, index) => (
                    <NavLink to={`${el?.path}/${path?.path}`} key={path?.name}>
                      <ListItem
                        disablePadding
                        sx={{
                          fontWeight: "bold",
                          my: "5px",
                          ".active & ": {
                            color: "var(--main-color)",
                            background: " #f6f9ff ",
                          },
                        }}
                      >
                        <ListItemButton>
                          <ListItemIcon
                            sx={{ ".active &": { color: "var(--main-color)" } }}
                          >
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText
                            sx={{
                              "& > * ": {
                                fontWeight: "600 ",
                                fontSize: "1.1rem",
                                // color: "#012970",
                              },
                              ".active & > * ": {
                                fontWeight: "bold",
                              },
                            }}
                            primary={path.name}
                            // sx={{
                            //   ".active &": {
                            //     fontWeight: "bold ",
                            //   },
                            // }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  ))}
                </SubMenu>
                // <NavLink to={`${el.path}`} key={el.name}>
                //   <ListItem
                //     disablePadding
                //     sx={{
                //       fontWeight: "bold",
                //       my: "5px",
                //       ".active & ": {
                //         color: "var(--main-color)",
                //         background: " #f6f9ff ",
                //       },
                //     }}
                //   >
                //     <MenuItem>
                //       <ListItemButton>
                //         <ListItemIcon
                //           sx={{ ".active &": { color: "var(--main-color)" } }}
                //         >
                //           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                //         </ListItemIcon>
                //         <ListItemText
                //           sx={{
                //             "& > * ": {
                //               fontWeight: "600 ",
                //               fontSize: "1.1rem",
                //               // color: "#012970",
                //             },
                //             ".active & > * ": {
                //               fontWeight: "bold",
                //             },
                //           }}
                //           primary={el.name}
                //           // sx={{
                //           //   ".active &": {
                //           //     fontWeight: "bold ",
                //           //   },
                //           // }}
                //         />
                //       </ListItemButton>
                //     </MenuItem>
                //   </ListItem>
                // </NavLink>
              );
            }
          })}
        </List>
      </Menu>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { md: `calc(100% - ${drawerWidth}px)` },
          // ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% )` },
          ml: { md: `0` },
          // backgroundColor: "rgba(249, 250, 251, 0.8)",
          boxShadow: "var(--shadow)",
          backgroundColor: "var(--light-color)",
          zIndex: "999",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
                color="primary.main"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
            {/* Profile Menu */}
            <AvatarProfile />
          </Box>
          <Logo />
          {/* <img
            style={{
              maxWidth: "200px",
              width: "100%",
              objectFit: "cover",
              height: "70px",
            }}
            src={logo}
          /> */}
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", fontWeight: "bold" }}
            color="primary.main"
          >
            منصة الرفاهية النفسية
          </Typography> */}
        </Toolbar>
      </AppBar>

      <Box
        dir="ltr"
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          dir="ltr"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              zIndex: "99",
              boxSizing: "border-box",
              width: drawerWidth,
              // backdropFilter: "blur(6px)",
              // backgroundColor: "rgba(249, 250, 251, 0.8)",
              boxShadow: "var(--shadow-1)",
              backgroundColor: "var(--light-color)",
              borderRight: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          dir="ltr"
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              // backdropFilter: "blur(6px)",
              // backgroundColor: "rgba(249, 250, 251, 0.8)",
              boxShadow: "var(--shadow)",
              backgroundColor: "var(--light-color)",

              borderRight: "none",
              zIndex: "99",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        {props?.children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
