import React, { useEffect, Image, useState } from "react";
import { useCookies } from "react-cookie";
import Nav from "../components/Nav";
import home from "../static/home.jpeg";
import Card from "../components/Card";
import Card1 from "../components/Card1";
import SignUpForm from "../components/SignUpForm";
import Paragraph from "../components/Paragraph";
import ProductCarousel from "../components/ProductCarousel";
import {
  Paper,
  Box,
  Typography,
  Button,
  useTheme,
  MobileStepper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"],
    ["user"],
    ["userId"]
  );

  // GET ALL PRODUCTS
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  function getProducts() {
    axios
      .get(`http://localhost:8080/api/products`)
      .then((response) => {
        setProducts(response.data);
        console.log(response);
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Error when loading product",
          },
        });
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <Nav />;
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          height: "70vh",
          marginTop: "20vh",
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

        {/* feature product */}
        <Box
          className="sectionProduct"
          sx={{
            height: "auto",
            width: "100%",
            backgroundColor: "#DBDFDF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingY: "40px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "500",
              marginBottom: "40px",
            }}
          >
            Feature Products
          </Typography>
          <ProductCarousel products={products} />
        </Box>

        {/* list product */}
        <Box
          sx={{
            height: "auto",
            width: "100%",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            margin: "60px 40px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "500",
              marginBottom: "40px",
            }}
          >
            Discover More
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {products.map((product, index) => (
              <Card1 product={product} />
            ))}
          </Box>
        </Box>

        {/* Sign up */}
        <Box
          sx={{
            height: "auto",
            width: "100%",
            backgroundColor: "#DBDFDF",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginY: "40px",
            padding: "40px",
          }}
        >
          <SignUpForm />
          <Paragraph />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
