import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import Nav from "../components/Nav";
import CloseIcon from "@mui/icons-material/Close";

const fakeItems = [
  { id: 1, name: "Sunflower Painting", price: 50, quantity: 1 },
  { id: 2, name: "Abstract Sculpture", price: 100, quantity: 1 },
  { id: 3, name: "Landscape Print", price: 30, quantity: 1 },
  { id: 4, name: "Portrait Drawing", price: 80, quantity: 1 },
];

const CartPage = ({ cartItems }) => {
  const [items, setItems] = useState(fakeItems);

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
    setItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <div className="App">
      <Nav />
      <Container>
        <Typography variant="h3" gutterBottom marginTop={20}>
          Cart
        </Typography>
        {items.map((item, index) => (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <CardContent>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item sx={{ width: "30%" }}>
                  {" "}
                  {/* Adjust the width as needed */}
                  <Typography variant="h5" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body1">Price: ${item.price}</Typography>
                </Grid>
                <Grid item sx={{ width: "20%" }}>
                  {" "}
                  {/* Adjust the width as needed */}
                  <Grid item>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: 100, height: 100 }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  sx={{
                    width: "30%", // Adjust the width as needed
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <TextField
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    inputProps={{ min: 1 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      variant="outlined"
                      // color="primary"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                    <Button
                      variant="outlined"
                      // color="primary"
                      onClick={() => {
                        const newQuantity = Math.max(item.quantity - 1, 0);
                        handleQuantityChange(index, newQuantity);
                        if (newQuantity === 0) {
                          handleRemoveItem(index);
                        }
                      }}
                    >
                      -
                    </Button>
                  </Box>
                </Grid>

                <Grid item sx={{ width: "10%" }}>
                  {" "}
                  {/* Adjust the width as needed */}
                  <Typography variant="body1">
                    Total Price: ${item.price * item.quantity}
                  </Typography>
                </Grid>
                <Grid item sx={{ width: "10%" }}>
                  {" "}
                  {/* Adjust the width as needed */}
                  <IconButton
                    onClick={() => handleRemoveItem(index)}
                    color="secondary"
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Container>
      <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="success"
          style={{
            marginTop: "1rem",
            marginRight: "1rem",
            padding: "1rem 2.5rem",
          }}
        >
          Checkout
        </Button>
        <Typography
          variant="h5"
          alignContent={"center"}
          style={{
            marginTop: "1rem",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "32px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Total: ${calculateTotalPrice()}
        </Typography>
      </Container>
    </div>
  );
};

export default CartPage;
