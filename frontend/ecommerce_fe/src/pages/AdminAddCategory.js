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
  InputLabel,
  Input,
  Link,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminTab from "../components/AdminTab";
import { useCookies } from "react-cookie";
import Footer from "../components/Footer";

const AdminAddCategory = () => {
  const [cookies] = useCookies(["token"], ["user"], ["userId"]);
  const navigate = useNavigate();

  const checkUser = async () => {
    if (typeof cookies.token === "undefined" || cookies.user === "user") {
      navigate("/error");
    } else {
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // ADD CATEGORY
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function addCategory(event) {
    event.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/categories`,
        {
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin", {
            state: {
              message: "Create category successfully",
            },
          });
        }
      })
      .catch((error) => {
        navigate("/admin", {
          state: {
            message: "Create category failed",
          },
        });
      });
  }

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
          Add new category
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
          <AdminTab val={"addcategory"} />
          <Grid item xs={12}>
            <Box
              component="form"
              onSubmit={addCategory}
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
                Category information
              </Typography> */}
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
                  Category name
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormHelperText id="my-helper-text" sx={{}}>
                  Enter category name
                </FormHelperText>
              </FormControl>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormHelperText id="my-helper-text" sx={{}}>
                  More information
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
      <Box>{/* <Footer /> */}</Box>
    </div>
  );
};

export default AdminAddCategory;
