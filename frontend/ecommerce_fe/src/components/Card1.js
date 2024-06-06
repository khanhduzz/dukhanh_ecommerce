import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import { Button, Box, Chip } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductItemCard({ product, user }) {
  const [rating, setRating] = React.useState(0);
  const [cart, setCart] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const productDetail = () => {
    navigate(`/products/detail/${product.id}`);
  };

  const setAddCart = () => {
    setCart(!cart);
  };

  // RATING FUNCTION
  function userRating(event, rate) {
    axios
      .post(
        `http://localhost:8080/api/ratings`,
        {
          userId: user.id,
          productId: product.id,
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
        toast.error("You have already rated this item!");
      });
  }

  // ADD TO CART
  function addToCart() {
    axios
      .post(
        `http://localhost:8080/api/orders`,
        {
          userId: user.id,
          productId: product.id,
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
        toast.error("You have already added this item!");
      });
  }

  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="product"
            src={`http://localhost:8080/api/images/${product.image[0]}`}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6">{product.name.substring(0, 20)}</Typography>
        }
        subheader="Available Now"
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:8080/api/images/${product.image[0]}`}
        alt={product.name}
      />
      <CardContent>
        {product.featured === 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Chip label="Featured" color="success" />
          </Box>
        )}
        {product.featured !== 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Chip label="Origin" color="primary" />
          </Box>
        )}
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
                <Chip label={category.name} color="error" variant="outlined" />
              </Box>
            ))
          ) : (
            <span>No categories available</span>
          )}
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            height: "100px",
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography
          variant="h4"
          color="text.secondary"
          align="center"
          sx={{
            height: "20px",
          }}
        >
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </Typography>
      </CardContent>
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
          defaultValue={product.rating}
          disabled={
            rating !== 0 ||
            typeof Object.keys(user)[0] === "undefined" ||
            cookies["user"] === "admin" ||
            (user.ratings &&
              user.ratings.find((rating) => rating.product === product.name))
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
          value={product.id}
          onClick={() => addToCart()}
          disabled={
            cart === true ||
            typeof Object.keys(user)[0] === "undefined" ||
            cookies["user"] === "admin" ||
            (user.orders &&
              user.orders.find((order) => order.product === product.name))
          }
          sx={{
            marginLeft: "auto",
            display: `${user !== null ? "block" : "none"}`,
          }}
        >
          Cart
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => productDetail()}
          sx={{ marginLeft: "auto" }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
