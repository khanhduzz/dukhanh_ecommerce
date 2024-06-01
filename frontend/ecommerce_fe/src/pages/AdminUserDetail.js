/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress } from "@mui/material";
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
import { useNavigate, useParams } from "react-router-dom";
import AdminTab from "../components/AdminTab";
import { useCookies } from "react-cookie";
import Footer from "../components/Footer";

const AdminUserDetail = () => {
  const [cookies] = useCookies(["token"], ["user"], ["userId"]);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState([]);

  // CHECK USER IS CORRECT OR NOT
  const checkUser = async () => {
    if (typeof cookies.token === "undefined" || cookies.user === "user") {
      navigate("/error");
    }
  };

  useEffect(() => {
    checkUser();
    getUser();
  }, []);

  // GET USER INFORMATION
  function getUser() {
    axios
      .get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      })
      .then((response) => {
        setUser(response.data);
        setImage(response.data.image);
      })
      .catch((error) => {
        navigate("/admin", {
          state: {
            message: "Could not find user",
          },
        });
      });
  }

  // PREPARE FOR USER
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [file, setFiles] = useState(null);

  // ADD USER WITH IMAGES (FOR LATER)
  const updateUser = async (output) => {
    console.log(output);
    try {
      const respone = await axios.put(
        `http://localhost:8080/api/users/${userId}`,
        {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
          image: output,
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
          message: "Update user successfully",
        },
      });
    } catch (error) {
      navigate("/admin", {
        state: {
          message: "Update failed",
        },
      });
    }
  };

  // SUBMIT IMAGES AND GET INFORMATION BEFORE UPDATE USERS
  function handleSubmitImage(event) {
    event.preventDefault();
    if (!file) {
      updateUser(image);
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
        // console.log(response);
        if (typeof response.data !== "undefined") {
          updateUser(response.data[0]);
          setImage(response.data[0]);
        } else {
          updateUser(image);
        }
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Error when upload images",
          },
        });
      });
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
          {user.username}
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
                    User information
                  </Typography> */}
                  {/* Name + Password */}
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
                        {user.username}
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
                        defaultValue={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <FormHelperText id="my-helper-text" sx={{}}>
                        Enter user name
                      </FormHelperText>
                    </FormControl>

                    {/* PASSWORD */}
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
                        User password
                      </InputLabel>
                      <Input
                        id="password"
                        color="grey"
                        type="password"
                        aria-describedby="my-helper-text"
                        sx={{
                          fontSize: "20px",
                          marginLeft: "15px",
                        }}
                        defaultValue={user.password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <FormHelperText id="my-helper-text" sx={{}}>
                        Enter password
                      </FormHelperText>
                    </FormControl>

                    {/* Description */}
                    {/* <FormControl
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
              </FormControl> */}
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
                        {user.firstName}
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
                        defaultValue={user.firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                      <FormHelperText id="my-helper-text" sx={{}}>
                        Enter First Name
                      </FormHelperText>
                    </FormControl>

                    {/* Last name */}
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
                        {user.lastName}
                      </InputLabel>
                      <Input
                        id="password"
                        color="grey"
                        type="text"
                        aria-describedby="my-helper-text"
                        sx={{
                          fontSize: "20px",
                          marginLeft: "15px",
                        }}
                        defaultValue={user.lastName}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                      <FormHelperText id="my-helper-text" sx={{}}>
                        Enter password
                      </FormHelperText>
                    </FormControl>
                  </Box>

                  {/* EMAIL */}
                  <FormControl
                    sx={{
                      width: "90%",
                      marginY: "15px",
                    }}
                  >
                    <InputLabel
                      htmlFor="email"
                      color="grey"
                      sx={{
                        fontSize: "20px",
                      }}
                    >
                      {user.email}
                    </InputLabel>
                    <Input
                      id="email"
                      color="grey"
                      type="email"
                      aria-describedby="my-helper-text"
                      sx={{
                        fontSize: "20px",
                        marginLeft: "15px",
                      }}
                      defaultValue={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormHelperText id="my-helper-text" sx={{}}>
                      Enter email
                    </FormHelperText>
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
                      {image !== "" ? (
                        <img
                          src={`http://localhost:8080/api/images/${image}`}
                          alt={`User`}
                          style={{
                            width: "150px",
                            objectFit: "cover",
                            height: "150px",
                          }}
                        />
                      ) : (
                        "You have no profile image yet"
                      )}
                    </Box>
                  </Grid>
                  {/* END SHOW IMAGES */}

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
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default AdminUserDetail;
