import React, { useEffect, Image } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";
import Nav from "../components/Nav";
import home from "../static/home.jpeg";
// import SectionDivider from "../components/SectionDivider";
import ProductCarousel from "../components/ProductCarousel";
import {
  Paper,
  Box,
  Typography,
  Button,
  useTheme,
  MobileStepper,
} from "@mui/material";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"],
    ["user"],
    ["userId"]
  );

  const products = [
    "https://ik.imagekit.io/theartling/prod/original_images/convergence.jpg?tr=w-950",
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    "https://t3.ftcdn.net/jpg/02/73/22/74/360_F_273227473_N0WRQuX3uZCJJxlHKYZF44uaJAkh2xLG.jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGR2YW5nb2doLXNudmdyb2IuanBn.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmux6GIrnnfLTzHX1lpRAl2TS5wH19PcYbopUtDs9Z0BLhKq2Nr9kbLSJcKp9BBkP6vFA&usqp=CAU",
  ];

  return (
    <div className="App">
      <Nav />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          height: "70vh",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              overflow: "visible",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(20%, -70%)",
              color: "#000",
              textAlign: "left",
              fontWeight: "800",
              fontSize: "128px",
            }}
          >
            Artist, Master
            <br /> Drawings
          </Typography>
          <Typography
            variant="subtitle"
            sx={{
              overflow: "visible",
              position: "absolute",
              top: "80%",
              left: "50%",
              transform: "translate(50%, -70%)",
              color: "#000",
              textAlign: "right",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            Your passionate with art and museum
          </Typography>
        </Box>
        <Box
          sx={{
            width: "60vw",
            height: "100%",
            backgroundImage: `url(${home})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "10px 10px 10px 15px rgba(0, 0, 0, 0.5)",
            margin: "0px 40px 40px 0px",
            borderRadius: "10px",
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            height: "200px",
          }}
        ></Box>
        <Box
          sx={{
            height: "60vh",
            width: "100%",
            backgroundColor: "#DBDFDF",
          }}
        >
          <Typography variant="h2">Feature Products</Typography>
          <ProductCarousel products={products} />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
