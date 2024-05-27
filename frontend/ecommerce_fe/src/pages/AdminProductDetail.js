import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Link } from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdminProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    try {
      const getData = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/products/${productId}`
        );
        console.log(response.data.content);
        setProduct(response.data);
      };
      getData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Box>
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "secondary.main",
            marginY: 5,
          }}
        >
          {product.name}
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "90%",
          display: "inline-flex",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Grid container spacing={2} columns={16}>
          <Grid item xs={2} sx={{ marginTop: 1 }}>
            <Grid
              container
              spacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              gap={1.5}
            >
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Add new User
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Add new Produt
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Add new category
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  add new role
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Show all users
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  <Link
                    href="/allproducts"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Show all products
                  </Link>
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Show all categories
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Show all roles
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={14}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box
                  component="img"
                  src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                  sx={{
                    height: "auto",
                    width: "700px",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                ></Box>
              </Grid>
              <Grid item xs={4}>
                <Card
                  sx={{
                    minWidth: 275,
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Word of the Day
                    </Typography>
                    <Typography variant="h3" component="div">
                      {product.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Categories: {product.categories}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Price: {product.price * 1000} VND
                    </Typography>
                    <Typography variant="body2">
                      Description: {product.description}
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="medium"></Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Item>PRODUCT INFORMATION</Item>
              </Grid>
              <Grid item xs={8}>
                <Item>PRODUCT INFORMATION</Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminProductDetail;
