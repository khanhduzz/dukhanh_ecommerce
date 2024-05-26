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
import { useNavigate } from "react-router-dom";

const color = grey[50];

const UserSignIn = () => {
  const [token, setToken] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async (event) => {
    event.preventDefault();
    try {
      console.log("it run");
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
        navigate("/allproducts");
      };
      getData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.location.reload();
      }
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  console.log(username);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  console.log(password);

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
          }}
        >
          Welcome to GAlLéRY
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
