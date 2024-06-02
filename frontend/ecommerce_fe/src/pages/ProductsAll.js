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
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function getProducts() {
    axios
      .get(`http://localhost:8080/api/products`)
      .then((response) => {
        setProducts(response.data.content);
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Error when loading product",
          },
        });
      });
  }

  // GET CATEGORIES
  function getCategories() {
    axios
      .get(`http://localhost:8080/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Error when seaching category",
          },
        });
      });
  }

  useEffect(() => {
    getProducts();
    getCategories();
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
          <SearchForm categories={categories} />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2} gap={4} justifyContent="center">
            {products.map((product, index) => (
              <Card1 key={product.id} product={product} user={user} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductPage;
