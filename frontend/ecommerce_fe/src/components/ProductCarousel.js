// import React, { useState } from "react";
// import { Box, IconButton } from "@mui/material";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// const ProductCarousel = ({ products }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsToShow = 5; // Number of items to show at once

//   const goToPrevSlide = () => {
//     setCurrentIndex(
//       currentIndex === 0 ? products.length - itemsToShow : currentIndex - 1
//     );
//   };

//   const goToNextSlide = () => {
//     setCurrentIndex(
//       currentIndex === products.length - itemsToShow ? 0 : currentIndex + 1
//     );
//   };

//   return (
//     <Box
//       sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//     >
//       <IconButton onClick={goToPrevSlide}>
//         <NavigateBeforeIcon />
//       </IconButton>
//       <Box sx={{ display: "flex", overflowX: "auto", maxWidth: "100%" }}>
//         {products
//           .slice(currentIndex, currentIndex + itemsToShow)
//           .map((product, index) => (
//             <img
//               key={index}
//               src={product}
//               alt={`Product ${index + currentIndex + 1}`}
//               style={{ width: "400px", marginRight: "10px" }}
//             />
//           ))}
//       </Box>
//       <IconButton onClick={goToNextSlide}>
//         <NavigateNextIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default ProductCarousel;

import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, CardContent, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Number of items to show at once
  const autoMoveInterval = 3000; // Interval for automatic movement in milliseconds
  const autoMoveRef = useRef(null);

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

  const startAutoMove = () => {
    if (autoMoveRef.current) return; // Auto-move already started
    autoMoveRef.current = setInterval(goToNextSlide, autoMoveInterval);
  };

  const stopAutoMove = () => {
    clearInterval(autoMoveRef.current);
    autoMoveRef.current = null;
  };

  useEffect(() => {
    startAutoMove(); // Start auto-move when component mounts

    return () => {
      stopAutoMove(); // Stop auto-move when component unmounts
    };
  }, []); // Run only once when the component mounts

  const handlePrevClick = () => {
    stopAutoMove();
    goToPrevSlide();
    startAutoMove();
  };

  const handleNextClick = () => {
    stopAutoMove();
    goToNextSlide();
    startAutoMove();
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      className="carousel-container"
    >
      <IconButton onClick={handlePrevClick}>
        <NavigateBeforeIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          maxWidth: "100%",
          gap: "20px",
        }}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * (400 + 10)}px)` }}
        >
          {products.map((product, index) => (
            <div key={index} className="carousel-item">
              <img
                src={`http://localhost:8080/api/images/${product.image[0]}`}
                alt={`Product ${index + 1}`}
                style={{
                  width: "400px",
                  height: "320px",
                  marginRight: "10px",
                  borderRadius: "10px",
                }}
              />
              <div className="product-details">
                {/* <h3>{product.name}</h3>
                <p>{product.description}</p> */}
                <h3>{product.name}</h3>
                <p>
                  {product.description.length <= 40
                    ? product.description
                    : `${product.description.substring(0, 40)}...`}
                </p>
                <h3>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Box>
      <IconButton onClick={handleNextClick}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

export default ProductCarousel;
