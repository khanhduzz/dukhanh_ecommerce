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
import { grey } from "@mui/material/colors";

const color = grey[50];

const UserSignUp = () => {
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
      <Box
        sx={{
          width: "500px",
          height: "500px",
          border: "2px solid #fff",
          borderRadius: "15px",
          padding: "20px",
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
            Cancel
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
