import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5; // Number of items to show at once

  const goToPrevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? products.length - itemsToShow : currentIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex(
      currentIndex === products.length - itemsToShow ? 0 : currentIndex + 1
    );
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <IconButton onClick={goToPrevSlide}>
        <NavigateBeforeIcon />
      </IconButton>
      <Box sx={{ display: "flex", overflowX: "auto", maxWidth: "100%" }}>
        {products
          .slice(currentIndex, currentIndex + itemsToShow)
          .map((product, index) => (
            <img
              key={index}
              src={product}
              alt={`Product ${index + currentIndex + 1}`}
              style={{ width: "400px", marginRight: "10px" }}
            />
          ))}
      </Box>
      <IconButton onClick={goToNextSlide}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

export default ProductCarousel;
