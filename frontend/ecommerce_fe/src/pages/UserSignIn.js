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
import ColorLensIcon from "@mui/icons-material/ColorLens";

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
          Sign In
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
            Enter your password
          </FormHelperText>
        </FormControl>

        <Typography
          sx={{
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          You do not have an account, go to{" "}
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
            width: "150px",
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

export default UserSignUp;
