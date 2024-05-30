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
import AdbIcon from "@mui/icons-material/Adb";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const pages = ["Products", "Users", "Admin Page"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { state } = useLocation();
  const [name, setName] = React.useState("");

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"],
    ["user"],
    ["userId"]
  );

  function checkUser() {
    if (
      !(
        (typeof cookies["token"] !== "undefined" &&
          typeof cookies["user"] !== "undefined" &&
          typeof cookies["userId"] !== "undefined") ||
        (typeof cookies["token"] === "undefined" &&
          typeof cookies["user"] === "undefined" &&
          typeof cookies["userId"] === "undefined")
      )
    ) {
      signOut();
    }
    setName(cookies["user"]);
  }

  React.useEffect(() => {
    checkUser();
    setOpen(state === null ? false : true);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    removeCookie("token");
    removeCookie("user");
    removeCookie("userId");
    navigate("/signin", {
      state: {
        message: "Sign out successfully",
      },
    });
  };

  const signIn = () => {
    removeCookie("token");
    removeCookie("user");
    removeCookie("userId");
    navigate(
      "/signin"
      // , {
      //   state: {
      //     message: "Sign out successfully",
      //   },
      // }
    );
  };

  const signUp = () => {
    removeCookie("token");
    removeCookie("user");
    removeCookie("userId");
    navigate(
      "/signup"
      // , {
      //   state: {
      //     message: "Sign out successfully",
      //   },
      // }
    );
  };

  // This for nofication
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <AppBar position="static" color="secondary">
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state === null ? "" : state.message}
        </Alert>
      </Snackbar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            GAlLéRY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                marginRight: "20px",
                textTransform: "uppercase",
              }}
            >
              <Button
                href="/admin"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "#fff",
                  display: `${cookies["user"] === "admin" ? "block" : "none"}`,
                }}
              >
                ADMIN PAGE
              </Button>
              <Button
                onClick={signUp}
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "#fff",
                  display: `${
                    typeof cookies.token === "undefined" ? "block" : "none"
                  }`,
                }}
              >
                Sign up
              </Button>
              <Button
                onClick={signOut}
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "#fff",
                  display: `${
                    typeof cookies.token === "undefined" ? "none" : "block"
                  }`,
                }}
              >
                Sign out
              </Button>
            </Box>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              marginRight: "20px",
              textTransform: "uppercase",
            }}
          >
            <Button
              onClick={signIn}
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                color: "#fff",
                display: `${
                  typeof cookies.token === "undefined" ? "block" : "none"
                }`,
              }}
            >
              Sign in
            </Button>
            <Button
              onClick={signUp}
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                color: "#fff",
                display: `${
                  typeof cookies.token === "undefined" ? "block" : "none"
                }`,
              }}
            >
              Sign up
            </Button>
            <Button
              onClick={signOut}
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                color: "#fff",
                display: `${
                  typeof cookies.token === "undefined" ? "none" : "block"
                }`,
              }}
            >
              Sign out
            </Button>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                color: "#fff",
                display: `${typeof name === "undefined" ? "none" : "block"}`,
              }}
            >
              Hello, {name}
            </Button>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: `${
                typeof cookies.token === "undefined" ? "none" : "block"
              }`,
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
