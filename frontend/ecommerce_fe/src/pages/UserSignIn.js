import {
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Button,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";

const color = grey[50];

const UserSignIn = () => {
  const { state } = useLocation();

  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"],
    ["user"],
    ["userId"]
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const getData = async () => {
        const response = await axios.post(
          `http://localhost:8080/api/auth/signin`,
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCookie("token", response.data.access_token);
        if (response.data.access_token !== "") {
          getUser(response.data.access_token);
        } else {
          removeCookie("token");
          navigate("/", {
            state: {
              message: "Login failed",
            },
          });
          window.location.reload();
        }
      };
      getData();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          console.error(
            "Error 403: Forbidden - Invalid credentials or access denied."
          );
        } else {
          console.error("Error:", error.response.status, error.response.data);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const getUser = (e) => {
    try {
      const get = async () => {
        const response = await axios.get(`http://localhost:8080/api/me`, {
          headers: {
            Authorization: "Bearer " + e,
          },
        });
        console.log(response);
        var user = response.data.trim().split(" ");
        setCookie("user", user[0]);
        setCookie("userId", user[1]);
        navigate("/", {
          state: {
            message: "Sign in successfully",
          },
        });
      };
      get();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // This for nofication
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    removeCookie("token");
    removeCookie("user");
    removeCookie("userId");
    setOpen(state === null ? false : true);
  }, []);

  return (
    <Box
      sx={{
        color: "purple",
        background: "linear-gradient(to right bottom, #4DA9FB, #FC60D2)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "99",
      }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", zIndex: "100" }}
        >
          {state === null ? "" : state.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          // position: "r",
          top: "100px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "secondary.main",
            marginBottom: 10,
            fontWeight: 300,
            cursor: "pointer",
          }}
        >
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            sx={{
              color: "secondary.main",
            }}
          >
            Welcome to GAlLéRY
          </Link>
        </Typography>
      </Box>

      {/* Form */}
      <Box
        sx={{
          width: "500px",
          height: "500px",
          border: "2px solid #fff",
          borderRadius: "15px",
          padding: "20px",
        }}
        component="form"
        onSubmit={signIn}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 300,
          }}
        >
          Sign In
        </Typography>
        <Typography
          variant="subtitle"
          sx={{
            justifyContent: "center",
            color: "#fff",
            fontWeight: 300,
            display: "none",
          }}
        >
          Your username or password not correct!
        </Typography>
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
              color: "#fff",
              fontSize: "20px",
            }}
          >
            Your username
          </InputLabel>
          <Input
            id="username"
            color="grey"
            type="text"
            aria-describedby="my-helper-text"
            sx={{
              color: "#fff",
              fontSize: "20px",
              marginLeft: "15px",
            }}
            value={username}
            onChange={handleUsername}
          />
          <FormHelperText
            id="my-helper-text"
            sx={{
              color: "#fff",
            }}
          >
            Enter your username
          </FormHelperText>
        </FormControl>

        <FormControl
          sx={{
            width: "90%",
            marginY: "15px",
          }}
        >
          <InputLabel
            htmlFor="my-input"
            color="grey"
            sx={{
              color: "#fff",
              fontSize: "20px",
            }}
          >
            Your password
          </InputLabel>
          <Input
            id="my-input"
            color="grey"
            type="password"
            aria-describedby="my-helper-text"
            sx={{
              color: "#fff",
              fontSize: "20px",
              marginLeft: "15px",
            }}
            value={password}
            onChange={handlePassword}
          />
          <FormHelperText
            id="my-helper-text"
            sx={{
              color: "#fff",
            }}
          >
            Enter your password
          </FormHelperText>
        </FormControl>

        <Box
          sx={{
            display: "inline-flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ padding: "10px 100px", borderRadius: 5 }}
            type="submit"
          >
            Sign In
          </Button>
        </Box>

        <Typography
          sx={{
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          You do not have any account, go to{" "}
          <Link
            href="/signup"
            sx={{
              textDecoration: "none",
              color: "#fff",
              "&:hover": {
                color: "#2FEC46",
              },
            }}
          >
            Sign up page
          </Link>
        </Typography>
        <ColorLensIcon
          sx={{
            width: "120px",
            height: "auto",
            marginTop: "20px",
            color: "green",
            "&:after": {
              content: "'GALLéRy'",
              position: "absolute",
              width: "100%",
              color: "green",
              display: "block",
            },
          }}
        />
        {/* <Box
          component="img"
          sx={{
            width: "200px",
            height: "auto",
          }}
          alt="Galléry Image"
          src=""
        /> */}
      </Box>
    </Box>
  );
};

export default UserSignIn;
