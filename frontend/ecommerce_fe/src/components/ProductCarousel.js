import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Number of items to show at once
  const autoMoveInterval = 3000; // Interval for automatic movement in milliseconds
  const autoMoveRef = useRef(null);
  const navigate = useNavigate();

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

  const productDetail = (event) => {
    console.log(event);
    navigate(`/products/detail/${event.target.id}`);
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
          style={{
            transform: `translateX(-${currentIndex * (400 + 10)}px)`,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
            cursor: "pointer",
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="carousel-item"
              // onClick={(event) => productDetail(event)}
            >
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
              <div
                className="product-details"
                id={product.id}
                style={{ cursor: "pointer" }}
                onClick={(event) => productDetail(event)}
              >
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
