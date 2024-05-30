import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const { state } = useLocation();

  // useEffect(() => {
  //   if (state != null) {
  //     state.message = null;
  //   }
  // });
  return (
    <div className="App">
      <Box
        sx={{
          position: "fixed",
          bottom: "0vh",
          marginTop: "20px",
          width: "100%",
          height: "3rem",
          backgroundColor: "grey",
          alignItems: "center",
          alignContent: "center",
          color: "#fff",
        }}
      >
        <Typography variant="subtitle">
          @NashTech ecommerce Assignment
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
