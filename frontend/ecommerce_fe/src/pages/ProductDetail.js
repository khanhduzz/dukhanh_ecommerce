import React, { useEffect, useState } from "react";
import {
  styled,
  Grid,
  Typography,
  Paper,
  IconButton,
  CardActions,
  Rating,
  Button,
  CardContent,
  Box,
  Chip,
} from "@mui/material";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageGallery from "../components/ImageGallery";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductPage = () => {
  const [cart, setCart] = React.useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState({});
  const [cookies] = useCookies(["token"]);
  let { productId } = useParams();

  const setAddCart = () => {
    setCart(!cart);
  };

  // GET USER INFOR
  const getUserInformation = async () => {
    if (typeof cookies.token === "undefined") {
      return;
    }
    const response = await axios
      .get(`http://localhost:8080/api/me`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      })
      .catch((error) => {
        navigate("/signin", {
          state: {
            message: "Do not change the cookies",
          },
        });
      });
    let info = response.data.split(" ");
    let res = info[1].trim();
    getUser(res);
  };

  const getUser = async (res) => {
    const response = await axios
      .get(`http://localhost:8080/api/users/${res}`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Error",
          },
        });
      });
    // console.log(response.data);
    setUser(response.data);
  };

  async function getProduct() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${productId}`
      );
      // setProduct(response.data);
      // console.log(product.image);
      const { data } = response;
      setProduct({ ...data });
    } catch (error) {
      navigate("/error", {
        state: {
          message: "Could not find product",
        },
      });
    }
  }

  // HANDLE RATING, FAVORITE
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  // RATING FUNCTION
  function userRating(event, rate) {
    axios
      .post(
        `http://localhost:8080/api/ratings`,
        {
          userId: user.id,
          productId: productId,
          rate: rate,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      )
      .then((respone) => {
        // console.log(respone);
        toast.success("Rating product successfully!");
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Some thing went wrong!");
      });
  }

  // ADD TO CART
  function addToCart() {
    axios
      .post(
        `http://localhost:8080/api/orders`,
        {
          userId: user.id,
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      )
      .then((respone) => {
        toast.success("Item added to cart successfully!");
        setAddCart();
      })
      .catch((error) => {
        toast.error("Some thing went wrong!");
      });
  }

  useEffect(() => {
    getProduct();
    getUserInformation();
  }, []);

  return (
    <div className="App">
      <Nav user={user} />
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
                <ImageGallery image={product.image} />
              </Item>
            </Grid>
            <Grid item xs={6} paddingLeft={5} fullWidth>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {product.categories && product.categories.length > 0 ? (
                  product.categories.map((category, index) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Chip label={category} color="error" variant="outlined" />
                    </Box>
                  ))
                ) : (
                  <span>No categories</span>
                )}
              </CardContent>

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
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={handleFavoriteClick}
                      color={isFavorite ? "secondary" : "default"}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <Rating
                      name="product-rating"
                      defaultValue={rating}
                      disabled={
                        rating !== 0 ||
                        typeof Object.keys(user)[0] === "undefined" ||
                        cookies["user"] === "admin" ||
                        (user.ratings &&
                          user.ratings.find(
                            (rating) => rating.product === product.name
                          ))
                      }
                      onChange={(event, newValue) => {
                        if (user) {
                          setRating(newValue);
                          userRating(event, newValue);
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      disabled={
                        cart === true ||
                        typeof Object.keys(user)[0] === "undefined" ||
                        cookies["user"] === "admin" ||
                        (user.orders &&
                          user.orders.find(
                            (order) => order.product === product.name
                          ))
                      }
                      value={product.id}
                      onClick={() => addToCart()}
                      sx={{
                        marginLeft: "auto",
                        display: `${user !== null ? "block" : "none"}`,
                      }}
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
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
