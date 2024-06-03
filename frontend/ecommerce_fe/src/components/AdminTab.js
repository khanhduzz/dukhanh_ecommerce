/* eslint-disable react/jsx-no-undef */
import "../App.css";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { Button, Link } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminTab = (props) => {
  const navigate = useNavigate();

  const [cookies] = useCookies(["token"], ["user"], ["userId"]);

  // function checkUser() {
  //   if (cookies["user"] !== "admin") {
  //     navigate("/error", {
  //       state: {
  //         message: "You are not allow to access here",
  //       },
  //     });
  //   }
  // }
  // GET USER INFOR
  const getUserInformation = async () => {
    if (typeof cookies.token === "undefined") {
      return;
    }
    const response = await axios
      .get(`http://localhost:8080/api/me`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      })
      .catch((error) => {
        navigate("/signin", {
          state: {
            message: "Do not change the cookies",
          },
        });
      });
    let info = response.data.split(" ");
    let res = info[0].trim();
    if (res !== "admin") {
      navigate("/", {
        state: {
          message: "You are not allowed",
        },
      });
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <Grid item xs={2} sx={{ marginTop: 1 }}>
      <Grid
        container
        spacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        gap={1.5}
      >
        <Grid xs={12}>
          <Button
            href="/admin/adduser"
            variant={props.val === "adduser" ? "contained" : "outlined"}
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
          >
            Add new User
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button
            href="/admin/addproduct"
            variant={props.val === "addproduct" ? "contained" : "outlined"}
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
          >
            Add new Produt
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button
            variant={props.val === "addcategory" ? "contained" : "outlined"}
            href="/admin/addcategory"
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
          >
            Add new category
          </Button>
        </Grid>
        {/* <Grid xs={12}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
          >
            add new role
          </Button>
        </Grid> */}
        <Grid xs={12}>
          <Button
            variant={props.val === "allusers" ? "contained" : "outlined"}
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
            href="/admin/allusers"
          >
            <Link
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            ></Link>
            Show all users
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button
            variant={props.val === "allproducts" ? "contained" : "outlined"}
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
            href="/admin/allproducts"
          >
            <Link
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            ></Link>
            Show all products
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button
            variant={props.val === "allcategories" ? "contained" : "outlined"}
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
            href="/admin/allcategories"
          >
            <Link
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            ></Link>
            Show all categories
          </Button>
        </Grid>
        {/* <Grid xs={12}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
          >
            Show all roles
          </Button>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default AdminTab;
