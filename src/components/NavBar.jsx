import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  AutoMode,
  LibraryBooks,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode, toggleTheme, activeTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const navItems = [
    { label: "Trending", path: "/" },
    { label: "Browse", path: "/browse" },
    { label: "Random", path: "/random" },
    { label: "About", path: "/about" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleThemeMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setAnchorEl(null);
  };

  const getThemeIcon = () => {
    if (themeMode === "light") return <LightMode />;
    if (themeMode === "dark") return <DarkMode />;
    return <AutoMode />;
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Toolbar />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: (theme) =>
            activeTheme === "dark"
              ? "rgba(30, 30, 30, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <LibraryBooks sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: { xs: 1, sm: 0 },
              mr: { sm: 4 },
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Library App
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", gap: 1, ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "inherit",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: location.pathname === item.path ? "80%" : "0%",
                      height: "2px",
                      backgroundColor: "primary.main",
                      transition: "width 0.3s ease",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ ml: "auto" }}>
            <IconButton
              color="inherit"
              onClick={handleThemeMenuOpen}
              aria-label="theme toggle"
            >
              {getThemeIcon()}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleThemeMenuClose}
            >
              <MenuItem
                onClick={() => {
                  toggleTheme();
                  handleThemeMenuClose();
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {themeMode === "light" && (
                    <>
                      <LightMode fontSize="small" /> Light
                    </>
                  )}
                  {themeMode === "dark" && (
                    <>
                      <DarkMode fontSize="small" /> Dark
                    </>
                  )}
                  {themeMode === "system" && (
                    <>
                      <AutoMode fontSize="small" /> System
                    </>
                  )}
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      <Toolbar />
    </>
  );
}
