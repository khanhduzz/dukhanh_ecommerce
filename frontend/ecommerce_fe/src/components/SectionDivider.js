import React from "react";
import { Box, Typography } from "@mui/material";

const SectionDivider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100px", // Adjust the height as needed for your design
        backgroundColor: "#f0f0f0", // Set a background color for the divider
        borderTop: "2px solid #ddd", // Add a top border for visual separation
        borderBottom: "2px solid #ddd", // Add a bottom border for visual separation
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" color="text.secondary">
        Explore More
      </Typography>
    </Box>
  );
};

export default SectionDivider;
