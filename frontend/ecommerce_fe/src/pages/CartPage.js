import React, { useState, useEffect } from "react";
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
  CardMedia,
} from "@mui/material";
import Nav from "../components/Nav";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

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
    console.log(response.data);
    setUser(response.data);
    setItems(response.data.orders);
  };

  useEffect(() => {
    getUserInformation();
    console.log(user);
  }, []);

  return (
    <div className="App">
      <Nav user={user} />
      <Container>
        <Typography variant="h3" gutterBottom marginTop={20}>
          Cart
        </Typography>
        {typeof user === "undefined" && user.orders.length === 0 ? (
          <Typography variant="h4" color="textSecondary">
            No items available.
          </Typography>
        ) : (
          items.map((item, index) => (
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
                    {/* <Typography variant="body1">
                      Price:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price)}
                    </Typography> */}
                  </Grid>
                  <Grid item sx={{ width: "20%" }}>
                    {" "}
                    {/* Adjust the width as needed */}
                    <Grid item>
                      {/* <img
                        src={`http://localhost:8080/api/images/${item.image[0]}`}
                        alt={item.name}
                        style={{ width: 100, height: 100 }}
                      /> */}
                      {/* <CardMedia
                        component="img"
                        style={{ width: 100, height: 100 }}
                        image={`http://localhost:8080/api/images/${item.image[0]}`}
                        alt={item.name}
                      />*/}
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
                    {/* <Typography variant="body1">
                      Total Price: ${item.price * item.quantity}
                    </Typography> */}
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
          ))
        )}
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
