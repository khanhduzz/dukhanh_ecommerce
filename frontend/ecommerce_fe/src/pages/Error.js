import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Error = () => {
  const { state } = useLocation();
  const [message, setMessage] = useState("404 NOT FOUND");

  function errorMessage() {
    if (state !== null) {
      setMessage(state.message);
    }
  }

  return (
    <div className="App">
      <Box
        sx={{
          height: "100vh",
          gap: "40px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="https://img.freepik.com/premium-vector/beautiful-eyes-drawn-using-wpap-art-style-pop-art-vector-illustration_675380-170.jpg"
          sx={{
            width: "40vw",
          }}
        ></Box>
        <Box
          sx={{
            width: "500px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography variant="h1" color={"primary"}>
            Oops!!!
          </Typography>
          <Typography variant="h2" color={"secondary.main"}>
            {message}
          </Typography>
          <Box>
            <Button href="/">Go back to Home page</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Error;
