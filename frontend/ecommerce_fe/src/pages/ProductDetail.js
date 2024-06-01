import React, { useEffect, useState } from "react";
import {
  styled,
  Grid,
  Slider,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import Nav from "../components/Nav";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const product = {
  name: "Product 1",
  price: 19.99,
  description: "High-quality product for everyday",
  rating: 5,
  like: 3,
};

const ProductPage = () => {
  return (
    <div className="App">
      <Nav />
      <Typography
        variant="h2"
        sx={{
          marginTop: "20vh",
        }}
      >
        PRODUCT DETAIL
      </Typography>
      <Grid
        // container
        spacing={2}
        boxSizing="border-box"
        sx={{
          margin: "20px 40px 40px 40px",
        }}
        display="flex"
        flexDirection={"row"}
        gap={6}
        justifyContent="center"
      >
        <Grid item xs={2}>
          <div>
            <Typography id="price-slider" gutterBottom>
              CATEGORY WILL GO HERE
            </Typography>
            <Typography id="price-slider" gutterBottom>
              CATEGORY WILL GO HERE
            </Typography>
            <Typography id="price-slider" gutterBottom>
              CATEGORY WILL GO HERE
            </Typography>
            <Typography id="price-slider" gutterBottom>
              CATEGORY WILL GO HERE
            </Typography>
            <Typography id="price-slider" gutterBottom>
              CATEGORY WILL GO HERE
            </Typography>

            <Grid
              sx={{
                marginY: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  marginY: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px #888888",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGFydHxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  marginY: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px #888888",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  marginY: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px #888888",
                }}
              />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={10}>
          <Grid
            // container
            rowSpacing={1}
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Grid item xs={6}>
              <Item>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXJ0fGVufDB8fDB8fHww"
                  style={{
                    width: "35vw",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={6} paddingLeft={5}>
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item>
                  <Typography variant="h2" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="subtitle" gutterBottom>
                    {product.description}
                  </Typography>
                  <div>
                    {Array.from({ length: product.rating }, (_, i) => (
                      <StarIcon key={i} color="primary" />
                    ))}
                  </div>
                  <div>
                    {Array.from({ length: product.like }, (_, i) => (
                      <IconButton key={i} aria-label="like" color="secondary">
                        <FavoriteIcon />
                      </IconButton>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductPage;
