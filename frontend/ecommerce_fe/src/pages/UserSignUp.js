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
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";

const UserSignUp = () => {
  const [removeCookie] = useCookies(["token"], ["user"], ["userId"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const sendData = async () => {
        const response = await axios.post(
          `http://localhost:8080/api/auth/signup`,
          {
            username: username,
            password: password,
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data !== "") {
          navigate("/signin", {
            state: {
              message: "Sign up successfully",
            },
          });
        } else {
          navigate("/signup", {
            state: {
              message: "Your username or email is already exists",
            },
          });
        }
      };
      sendData();
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

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  // This for nofication
  const { state } = useLocation();
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
      }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state === null ? "" : state.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          position: "absolute",
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
          }}
        >
          Welcome to GAlLéRY
        </Typography>
      </Box>

      {/* Login form */}
      <Box
        component="form"
        onSubmit={signUp}
        sx={{
          width: "500px",
          height: "500px",
          border: "2px solid #fff",
          borderRadius: "15px",
          padding: "20px",
          marginTop: "10vh",
        }}
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
          Enter your information
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
            More strong password, more sercurity
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
            Your email
          </InputLabel>
          <Input
            id="my-input"
            color="grey"
            type="email"
            aria-describedby="my-helper-text"
            sx={{
              color: "#fff",
              fontSize: "20px",
              marginLeft: "15px",
            }}
            value={email}
            onChange={handleEmail}
          />
          <FormHelperText
            id="my-helper-text"
            sx={{
              color: "#fff",
            }}
          >
            We'll never share your email.
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
            type="submit"
            variant="contained"
            color="success"
            sx={{ padding: "10px 50px", borderRadius: 5 }}
          >
            Sign Up
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
          If you already have an account, go to{" "}
          <Link
            href="/signin"
            sx={{
              textDecoration: "none",
              color: "#fff",
              "&:hover": {
                color: "#2FEC46",
              },
            }}
          >
            Login page
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default UserSignUp;
