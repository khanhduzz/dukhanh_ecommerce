import React, { useState, useEffect } from "react";
import { Typography, Box, Hidden, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink } from "react-router-dom";

const Nav = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

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
        // marginX: "40px",
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
          <Box>sign in</Box>
          <Box>sign up</Box>
          <Box>sign out</Box>
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
          <Box>
            <Button
              component={RouterLink}
              to="/cart"
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              cart
            </Button>
          </Box>
        </Box>
      </Hidden>
    </Box>
    // </div>
  );
};

export default Nav;
