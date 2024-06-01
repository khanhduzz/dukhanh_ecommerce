import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Paragraph = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            fontFamily: "Georgia, serif",
          }}
        >
          The Beauty of Nature
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "1.75rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            fontFamily: "Georgia, serif",
          }}
        >
          A Journey Through Stunning Landscapes
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img
          src="https://source.unsplash.com/random/800x400?nature"
          alt="Nature 1"
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "1.5rem",
          }}
        />
        <Typography
          paragraph
          sx={{
            fontSize: "1rem",
            lineHeight: "1.8",
            marginBottom: "1.5rem",
            textAlign: "justify",
            textIndent: "1.5rem",
            fontFamily: "Times New Roman, Times, serif",
            padding: "0 1rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          interdum, nisi quis convallis tincidunt, metus augue dictum mi, non
          aliquet orci eros ut nulla. Fusce vitae turpis id sapien feugiat
          aliquet. Duis a lorem nisi. Suspendisse potenti. Sed consectetur
          egestas fermentum. Morbi ac justo nec nunc feugiat aliquet sit amet at
          felis. Integer vulputate mi ut quam venenatis, at sodales metus
          cursus. Sed in turpis sit amet nunc commodo consequat.
        </Typography>
        <img
          src="https://source.unsplash.com/random/800x400?landscape"
          alt="Nature 2"
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "1.5rem",
          }}
        />
        <Typography
          paragraph
          sx={{
            fontSize: "1rem",
            lineHeight: "1.8",
            marginBottom: "1.5rem",
            textAlign: "justify",
            textIndent: "1.5rem",
            fontFamily: "Times New Roman, Times, serif",
            padding: "0 1rem",
          }}
        >
          Aenean tincidunt, justo ac porttitor laoreet, enim est pellentesque
          elit, et pharetra eros risus nec lorem. Aliquam erat volutpat. Cras
          pulvinar lorem at lacus pretium, a bibendum lacus facilisis. Cras
          auctor mi vel odio dignissim, a eleifend mauris accumsan. In interdum,
          felis sed bibendum malesuada, libero dolor auctor odio, ac fringilla
          turpis odio vel metus. Vivamus ultrices, justo sed tempor ultricies,
          dolor lacus feugiat ligula, eget euismod nunc magna ut justo. Nulla
          facilisi.
        </Typography>
        <img
          src="https://source.unsplash.com/random/800x400?forest"
          alt="Nature 3"
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "1.5rem",
          }}
        />
      </Box>
    </Container>
  );
};

export default Paragraph;
