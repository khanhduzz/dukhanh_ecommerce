/* eslint-disable react/jsx-no-undef */
import "../App.css";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { Button, Link } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AdminTab = (props) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"],
    ["user"],
    ["userId"]
  );

  function checkUser() {
    if (cookies["user"] !== "admin") {
      navigate("/error", {
        state: {
          message: "You are not allow to access here",
        },
      });
    }
  }

  useEffect(() => {
    checkUser();
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
          >
            <Link
              href="/admin/allusers"
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Show all users
            </Link>
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button
            variant={props.val === "allproducts" ? "contained" : "outlined"}
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
          >
            <Link
              href="/admin/allproducts"
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Show all products
            </Link>
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button
            variant={props.val === "allcategories" ? "contained" : "outlined"}
            color="success"
            fullWidth
            sx={{ p: 1.5, borderRadius: 2 }}
          >
            <Link
              href="/admin/allcategories"
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Show all categories
            </Link>
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
