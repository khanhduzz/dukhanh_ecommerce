import * as React from "react";
import { styled } from "@mui/material/styles";
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

export default function ProductItemCard({ product }) {
  const [expanded, setExpanded] = React.useState(false);
  const [rating, setRating] = React.useState(4); // Default rating value
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

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
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Button
          variant="outlined"
          color="success"
          onClick={() => (window.location.href = "/product-detail")}
          sx={{ marginLeft: "auto" }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
