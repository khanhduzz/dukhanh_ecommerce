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
import Textarea from "@mui/joy/Textarea";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AdminTab from "../components/AdminTab";
import { useCookies } from "react-cookie";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Footer from "../components/Footer";

const AdminAddUser = () => {
  const [cookies] = useCookies(["token"], ["user"], ["userId"]);
  const navigate = useNavigate();

  // CHECK USER IS CORRECT OR NOT
  const checkUser = async () => {
    if (typeof cookies.token === "undefined" || cookies.user === "user") {
      navigate("/error");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // PREPARE FOR PRODUCTS
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //   const [file, setFiles] = useState(null);

  // ADD USER
  const addUser = async (event) => {
    event.preventDefault();
    try {
      const respone = await axios.post(
        `http://localhost:8080/api/auth/signup`,
        {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
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
          message: "Create user successfully",
        },
      });
    } catch (error) {
      navigate("/admin", {
        state: {
          message: "Create user failed, username or email is already exists",
        },
      });
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
          Add new users
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
          <AdminTab val={"adduser"} />
          <Grid item xs={12}>
            <Box
              component="form"
              onSubmit={addUser}
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
                User information
              </Typography> */}
              {/* Name */}
              <Box
                sx={{
                  display: "inline-flex",
                  width: "90%",
                }}
              >
                {/* Name */}
                <FormControl
                  sx={{
                    width: "100%",
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
                    Username
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Enter username
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  width: "90%",
                }}
              >
                {/* PASSWORD */}
                <FormControl
                  sx={{
                    width: "100%",
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
                    User password
                  </InputLabel>
                  <Input
                    id="price"
                    color="grey"
                    type="password"
                    aria-describedby="my-helper-text"
                    sx={{
                      fontSize: "20px",
                      marginLeft: "15px",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Enter user password
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  width: "90%",
                }}
              >
                {/* First Name */}
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
                    First Name
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
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Enter username
                  </FormHelperText>
                </FormControl>

                {/* Last Name */}
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
                    Last Name
                  </InputLabel>
                  <Input
                    id="price"
                    color="grey"
                    type="text"
                    aria-describedby="my-helper-text"
                    sx={{
                      fontSize: "20px",
                      marginLeft: "15px",
                    }}
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Enter user password
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  width: "90%",
                }}
              >
                {/* Email */}
                <FormControl
                  sx={{
                    width: "100%",
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
                    User email
                  </InputLabel>
                  <Input
                    id="price"
                    color="grey"
                    type="email"
                    aria-describedby="my-helper-text"
                    sx={{
                      fontSize: "20px",
                      marginLeft: "15px",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormHelperText id="my-helper-text" sx={{}}>
                    Enter user email
                  </FormHelperText>
                </FormControl>
              </Box>

              {/* Description */}
              {/* <FormControl
                sx={{
                  width: "90%",
                  marginY: "15px",
                }}
              >
                <Textarea
                  id="description"
                  color="grey"
                  type="textarea"
                  aria-describedby="my-helper-text"
                  placeholder="User information"
                  sx={{
                    fontSize: "20px",
                    marginLeft: "15px",
                    height: "20vh",
                    background: "none",
                    border: "none",
                  }}
                  //   value={password}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormHelperText id="my-helper-text" sx={{}}>
                  More information
                </FormHelperText>
              </FormControl> */}

              {/* Image */}
              {/* <FormControl
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
              </FormControl> */}

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
                    href="/admin"
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
          <Grid item xs={2}>
            {/* SHOW IMAGES */}
            {/* <Grid>
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
                {images === "" ? (
                  <img
                    src={`http://localhost:8080/api/images/${images}`}
                    alt={`User`}
                    style={{
                      width: "150px",
                      objectFit: "cover",
                      height: "150px",
                    }}
                  />
                ) : (
                  "You have no images yet"
                )}
              </Box>
            </Grid> */}
            {/* END SHOW IMAGES */}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default AdminAddUser;
