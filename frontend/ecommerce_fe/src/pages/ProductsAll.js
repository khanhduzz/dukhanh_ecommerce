import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Card1 from "../components/Card1";
import Nav from "../components/Nav";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  // GET ALL PRODUCTS
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  function getProducts() {
    axios
      .get(`http://localhost:8080/api/products`)
      .then((response) => {
        setProducts(response.data);
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
      <Nav />
      <Grid
        // container
        spacing={3}
        boxSizing="border-box"
        sx={{
          margin: "20vh 40px 40px 40px",
        }}
        display="flex"
        gap={4}
        justifyContent="space-between"
      >
        <Grid item xs={2}>
          <SearchForm />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2} gap={4} justifyContent="center">
            {products.map((product, index) => (
              <Card1 product={product} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductPage;
