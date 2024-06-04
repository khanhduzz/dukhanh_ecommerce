import React from "react";
import Navbar from "../components/Navbar";
import AdminTab from "../components/AdminTab";
import Footer from "../components/Footer";
import { Box, Typography } from "@mui/material";

const Admin = () => {
  return (
    <div className="App">
      <Navbar />
      <Box>
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "secondary.main",
          }}
        >
          Administrator
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          display: "inline-flex",
          justifyContent: "center",
          height: "auto",
          marginTop: "4rem",
        }}
      >
        <AdminTab />
      </Box>
      <Footer />
    </div>
  );
};

export default Admin;
