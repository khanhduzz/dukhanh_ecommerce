/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
  FormHelperText,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Input,
  Link,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AdminTab from "../components/AdminTab";
import { useCookies } from "react-cookie";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const AdminAllProducts = () => {
  const [cookies] = useCookies(["token"], ["user"], ["userId"]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const respone = await axios.get(`http://localhost:8080/api/categories`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });
      setCategories(respone.data);
    } catch (error) {
      window.location.replace("/error");
    }
  };

  const checkUser = async () => {
    if (typeof cookies.token === "undefined" || cookies.user === "user") {
      navigate("/error");
    } else {
      getCategory();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  //   Categoriess
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

  // ADD PRODUCT
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

  // add product after image ok, but not cover exception
  const addProduct = async (imageUrl) => {
    try {
      const respone = await axios.post(
        `http://localhost:8080/api/products/create`,
        {
          name: name,
          price: price,
          description: description,
          featured: featured,
          image: imageUrl,
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
          message: "Create ok",
        },
      });
    } catch (error) {
      navigate("/error", {
        state: {
          message: "Create failed",
        },
      });
    }
  };

  // submit image ok
  function handleSubmitImage(event) {
    event.preventDefault();
    const url = "http://localhost:8080/api/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        Authorization: "Bearer " + cookies.token,
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => {
        setImageUrl(response.data.url);
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Upload image failed",
          },
        });
      });
    addProduct(imageUrl);
  }

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
          Add new product
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
          <AdminTab val={"addproduct"} />
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
              <Typography
                variant="h4"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 300,
                }}
              >
                Product information
              </Typography>
              {/* Name + Price */}
              <Box
                sx={{
                  display: "inline-flex",
                  width: "90%",
                }}
              >
                {/* Name */}
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
                    Product name
                  </InputLabel>
                  <Input
                    id="name"
                    color="grey"
                    type="text"
                    aria-describedby="my-helper-text"
                    sx={{
                      fontSize: "20px",
                      marginLeft: "15px",
                    }}
                    //   value={username}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Enter product name
                  </FormHelperText>
                </FormControl>
                {/* Price */}
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
                    Product price
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
                    //   value={username}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Enter product name
                  </FormHelperText>
                </FormControl>
                {/* Featured */}
                <FormControl
                  sx={{
                    width: "90%",
                    marginY: "15px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        onChange={(e) => setFeatured(e.target.checked ? 1 : 0)}
                      />
                    }
                    label="Feature"
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Select product is feature
                  </FormHelperText>
                </FormControl>
              </Box>
              {/* Description */}
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
                  Product description
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
                  //   value={password}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormHelperText id="my-helper-text" sx={{}}>
                  More information
                </FormHelperText>
              </FormControl>
              {/* Categories */}
              <FormControl
                sx={{ width: "90%", marginY: "15px", marginLeft: "20px" }}
              >
                <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
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
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
              {/* Image */}
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
                  <Input
                    id="image"
                    color="grey"
                    type="file"
                    aria-describedby="my-helper-text"
                    sx={{
                      fontSize: "18px",
                      marginLeft: "15px",
                      textDecoration: "none",
                      width: "100%",
                    }}
                    // value={file}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Box>
                <FormHelperText id="my-helper-text" sx={{}}>
                  Upload image here
                </FormHelperText>
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
                >
                  <Link
                    href="/"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Cancel
                  </Link>
                </Button>
              </Box>
              <Typography
                sx={{
                  marginTop: "20px",
                  cursor: "pointer",
                }}
              >
                Just a sentence for space...
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminAllProducts;
