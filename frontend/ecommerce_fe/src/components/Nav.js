import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  useMediaQuery,
  Typography,
  Box,
  Hidden,
  Button,
  Badge,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = ({ user }) => {
  const [scrollY, setScrollY] = useState(0);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // // GET USER INFOR
  // const getUserInformation = async () => {
  //   if (typeof cookies.token === "undefined") {
  //     return;
  //   }
  //   const response = await axios
  //     .get(`http://localhost:8080/api/me`, {
  //       headers: {
  //         Authorization: "Bearer " + cookies.token,
  //       },
  //     })
  //     .catch((error) => {
  //       navigate("/error", {
  //         state: {
  //           message: "Error",
  //         },
  //       });
  //     });
  //   let info = response.data.split(" ");
  //   let res = info[1].trim();
  //   getUser(res);
  // };

  // const getUser = async (res) => {
  //   const response = await axios
  //     .get(`http://localhost:8080/api/users/${res}`, {
  //       headers: {
  //         Authorization: "Bearer " + cookies.token,
  //       },
  //     })
  //     .catch((error) => {
  //       navigate("/error", {
  //         state: {
  //           message: "Error",
  //         },
  //       });
  //     });
  //   sendData(response);
  // };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const minHeight = 75; // Minimum height of the nav bar
  const maxHeight = 150; // Maximum height of the nav bar
  const dynamicHeight = Math.max(minHeight, maxHeight - scrollY);

  const maxFontSize = 2.5; // Maximum font size in rem
  const minFontSize = 2; // Minimum font size in rem
  const titleFontSize = Math.max(minFontSize, maxFontSize - scrollY * 0.01);

  const maxLinkFontSize = 1.5; // Maximum font size in em
  const minLinkFontSize = 1.3; // Minimum font size in em
  const linkFontSize = Math.max(
    minLinkFontSize,
    maxLinkFontSize - scrollY * 0.01
  );

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("xl"));

  function signOut() {
    const res = axios
      .post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      )
      .then(() => {
        navigate("/signin", {
          state: {
            message: "Log out successfully",
          },
        });
      });
  }

  return (
    // <div className="App">
    <Box
      sx={{
        position: "fixed",
        boxSizing: "border-box",
        width: "100%",
        top: 0,
        zIndex: 2,
        height: `${dynamicHeight}px`,
        transition: "height 0.2s ease-out, font-size 0.2s ease-out", // Smooth transition
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px",
        justifyContent: "space-between",
        opacity: "0.9",
        // marginX: "20px",
      }}
    >
      <Typography
        variant="h4"
        component={RouterLink}
        to="/"
        sx={{
          textDecoration: "none",
          color: "#000",
          fontSize: `${titleFontSize}rem`,
          fontWeight: "700",
          transition: "font-size 0.2s ease-out", // Smooth transition for font size
          //   flexGrow: 1,
        }}
      >
        Art Gallery
      </Typography>

      <Hidden mdDown={isMediumScreen}>
        <Box
          sx={{
            fontFamily: "IBM Plex Serif",
            display: "flex",
            flexDirection: "row",
            gap: "3em",
            fontSize: `${linkFontSize}em`,
            fontWeight: "400",
            textTransform: "uppercase",
            transition: "font-size 0.2s ease-out",
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: `${
                typeof cookies["token"] !== "undefined" &&
                cookies["user"] === "admin"
                  ? "block"
                  : "none"
              }`,
            }}
          >
            <Button
              component={RouterLink}
              to="/admin"
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              Admin's page
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              component={RouterLink}
              to="/about"
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              what's on
            </Button>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/products"
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              collection
            </Button>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/about"
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              about us
            </Button>
          </Box>
          <Box
            sx={{
              display: `${
                typeof cookies["token"] !== "undefined" ? "none" : "block"
              }`,
            }}
          >
            <Button
              component={RouterLink}
              to="/signin"
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              sign in
            </Button>
          </Box>
          <Box
            sx={{
              display: `${
                typeof cookies["token"] !== "undefined" ? "none" : "block"
              }`,
            }}
          >
            <Button
              component={RouterLink}
              to="/signup"
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              sign up
            </Button>
          </Box>
          <Box
            sx={{
              display: `${
                typeof cookies["token"] === "undefined" ? "none" : "block"
              }`,
            }}
          >
            <Button
              component={RouterLink}
              onClick={() => signOut()}
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              sign out
            </Button>
          </Box>
          <Box
            sx={{
              display: `${
                typeof cookies["token"] === "undefined" ? "none" : "block"
              }`,
            }}
          >
            {user && user.orders && user.orders.length > 0 ? (
              <Badge badgeContent={user.orders.length} color="primary">
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/cart"
                  sx={{
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  Cart
                </Button>
              </Badge>
            ) : (
              <Button
                component={RouterLink}
                to="/cart"
                sx={{
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Cart
              </Button>
            )}
          </Box>
        </Box>
      </Hidden>
    </Box>
    // </div>
  );
};

export default Nav;
