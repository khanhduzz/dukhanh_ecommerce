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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductItemCard({ product, user }) {
  const [rating, setRating] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const productDetail = (event) => {
    navigate(`/products/detail/${event.target.value}`);
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
        console.log(respone);
        toast.success("Rating product successfully!");
      })
      .catch((error) => {
        console.log(error);
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
      })
      .catch((error) => {
        toast.error("Some thing went wrong!");
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
          disabled={!user}
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
