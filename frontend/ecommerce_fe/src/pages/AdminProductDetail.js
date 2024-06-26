import React, { useEffect, useState } from "react";
import "../App.css";
import {
  FormHelperText,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Input,
  OutlinedInput,
  Select,
  MenuItem,
  Chip,
  Button,
  Link,
  useTheme,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import Navbar from "../components/Navbar";
import AdminTab from "../components/AdminTab";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminProductDetail = () => {
  const [cookies] = useCookies(["token"], ["user"], ["userId"]);
  const navigate = useNavigate();
  let { productId } = useParams();

  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  // GET ALL CATEGORIES IN DATABASE
  const getCategory = async () => {
    try {
      const respone = await axios.get(`http://localhost:8080/api/categories`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });
      // setCategories({ ...data });
      setCategories(respone.data);
      // console.log(categories);
    } catch (error) {
      navigate(-1, {
        state: {
          message:
            "Error when getting information, check your connection or login again",
        },
      });
    }
  };

  const checkUser = async () => {
    if (typeof cookies.token === "undefined" || cookies.user === "user") {
      navigate("/signin", {
        state: {
          message: "Do not change cookie information, please login again",
        },
      });
    } else {
      getCategory();
    }
  };

  //   SETUP SHOWING CATEGORIES
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(categories, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(categories) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [category, setCategory] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  async function getProduct() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${productId}`
      );
      console.log(response);
      setProduct(response.data);
      setImages(response.data.image);
      setFeatured(response.data.featured);
      setCategory(response.data.categories);
    } catch (error) {
      navigate("/error", {
        state: {
          message: "Could not find product",
        },
      });
    }
  }

  useEffect(() => {
    checkUser();
    getProduct();
  }, []);

  // SUBMIT IMAGES AND GET INFORMATION BEFORE MODIFY PRODUCT
  const [file, setFiles] = useState(null);

  function handleSubmitImage(event) {
    event.preventDefault();
    if (!file) {
      updateProduct(images);
      return;
    }

    const form = new FormData();
    for (let i = 0; i < file.length; i++) {
      form.append(`file`, file[i]);
      form.append(`fileName`, file[i].name);
    }
    axios
      .post(`http://localhost:8080/api/upload`, form, {
        headers: {
          Authorization: "Bearer " + cookies.token,
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        updateProduct(response.data);
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Error when upload images",
          },
        });
      });
  }

  // ADD PRODUCT WITH IMAGES
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(1);

  const updateProduct = async (output) => {
    try {
      await axios.put(
        `http://localhost:8080/api/products/update/${productId}`,
        {
          name: name,
          price: price,
          description: description,
          featured: featured,
          image: output,
          categories: category,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/admin", {
        state: {
          message: "Update product successfully",
        },
      });
    } catch (error) {
      navigate("/error", {
        state: {
          message: "Update failed",
        },
      });
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Box>
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "secondary.main",
            marginY: 2,
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
          <AdminTab />
          <Grid item xs={14}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  component="form"
                  onSubmit={handleSubmitImage}
                  sx={{
                    width: "100%",
                    height: "500px",
                    border: "2px solid #fff",
                    borderRadius: "15px",
                    marginX: "20px",
                  }}
                >
                  {/* <Typography
                    variant="h4"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 300,
                    }}
                  >
                    Edit Product information
                  </Typography> */}

                  {/* NAME + PRICE */}
                  <Box
                    sx={{
                      display: "inline-flex",
                      width: "90%",
                    }}
                  >
                    {/* NAME */}
                    <FormControl
                      sx={{
                        width: "90%",
                        marginY: "15px",
                      }}
                    >
                      <InputLabel
                        htmlFor="username"
                        color="grey"
                        sx={{
                          fontSize: "20px",
                        }}
                      >
                        {product.name}
                      </InputLabel>
                      <Input
                        id="name"
                        color="grey"
                        type="text"
                        aria-describedby="my-helper-text"
                        defaultValue={product.name}
                        sx={{
                          fontSize: "20px",
                          marginLeft: "15px",
                        }}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <FormHelperText id="my-helper-text" sx={{}}>
                        Enter product name
                      </FormHelperText>
                    </FormControl>

                    {/* PRICE */}
                    <FormControl
                      sx={{
                        width: "90%",
                        marginY: "15px",
                      }}
                    >
                      <InputLabel
                        htmlFor="username"
                        color="grey"
                        sx={{
                          fontSize: "20px",
                        }}
                      >
                        {product.price}
                      </InputLabel>
                      <Input
                        id="price"
                        color="grey"
                        type="number"
                        step="any"
                        aria-describedby="my-helper-text"
                        sx={{
                          fontSize: "20px",
                          marginLeft: "15px",
                        }}
                        defaultValue={product.price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <FormHelperText id="my-helper-text" sx={{}}>
                        Enter product price
                      </FormHelperText>
                    </FormControl>

                    {/* FEATURE */}
                    <FormControl
                      sx={{
                        width: "90%",
                        marginY: "15px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={featured === 1}
                            onChange={(e) =>
                              setFeatured(e.target.checked ? 1 : 0)
                            }
                          />
                        }
                        label="Feature"
                      />
                      <FormHelperText id="my-helper-text" sx={{}}>
                        Select product is feature
                      </FormHelperText>
                    </FormControl>
                  </Box>

                  {/* DESCRIPTION */}
                  <FormControl
                    sx={{
                      width: "90%",
                      marginY: "15px",
                    }}
                  >
                    <InputLabel
                      htmlFor="description"
                      color="grey"
                      sx={{
                        fontSize: "20px",
                      }}
                    >
                      {product.description}
                    </InputLabel>
                    <Input
                      id="description"
                      color="grey"
                      type="text"
                      aria-describedby="my-helper-text"
                      sx={{
                        fontSize: "20px",
                        marginLeft: "15px",
                      }}
                      defaultValue={product.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormHelperText id="my-helper-text" sx={{}}>
                      More information
                    </FormHelperText>
                  </FormControl>

                  {/* CATEGORIES */}
                  <FormControl
                    sx={{ width: "90%", marginY: "15px", marginLeft: "20px" }}
                  >
                    <InputLabel id="demo-multiple-chip-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={category}
                      onChange={handleChange}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {categories.map((name) => (
                        <MenuItem
                          key={name.id}
                          value={name.name}
                          style={getStyles(name.name, category, theme)}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <label
                      htmlFor="username"
                      color="grey"
                      sx={{
                        fontSize: "20px",
                      }}
                      style={{
                        textAlign: "left",
                      }}
                    >
                      Product name
                    </label>
                    <input
                      id="name"
                      color="grey"
                      defaultValue={product.name}
                      type="text"
                      aria-describedby="my-helper-text"
                      sx={{
                        fontSize: "20px",
                        marginLeft: "15px",
                      }}
                      style={{
                        border: "none",
                        padding: "10px 0",
                        borderBottom: "1px solid gray",
                      }}
                      //   value={username}
                    />
                  </FormControl>

                  {/* SHOW IMAGES */}
                  <Grid>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                        marginY: "20px",
                      }}
                    >
                      {images && images.length > 0
                        ? images.map((img, index) => (
                            <img
                              key={index} // Make sure to include a unique key for each element
                              src={`http://localhost:8080/api/images/${img}`}
                              alt={`Product ${index + 1}`}
                              style={{
                                width: "150px",
                                objectFit: "cover",
                                height: "100px",
                              }}
                            />
                          ))
                        : "You have no images yet"}
                    </Box>
                  </Grid>
                  {/* END SHOW IMAGES */}

                  {/* IMAGES */}
                  <FormControl
                    sx={{
                      width: "90%",
                      marginY: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "inline-flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <input
                        type="file"
                        multiple
                        id="image"
                        style={{
                          fontSize: "18px",
                          marginLeft: "15px",
                          textDecoration: "none",
                          width: "100%",
                          fontWeight: "200",
                        }}
                        onChange={(e) => {
                          setFiles(e.target.files);
                        }}
                      />
                    </Box>
                    <FormHelperText id="my-helper-text" sx={{}}>
                      Upload image here
                    </FormHelperText>
                    <Box
                      component="img"
                      src={""}
                      sx={{
                        width: "200px",
                        height: "auto",
                      }}
                    ></Box>
                  </FormControl>

                  {/* Button group */}
                  <Box
                    sx={{
                      display: "inline-flex",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{ padding: "10px 50px", borderRadius: 5 }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ padding: "10px 50px", borderRadius: 5 }}
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      <Link
                        // href="/admin"
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        Cancel
                      </Link>
                    </Button>
                    {/* END BUTTON */}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default AdminProductDetail;
