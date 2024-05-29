/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
  Pagination,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminTab from "../components/AdminTab";
import { useCookies } from "react-cookie";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#29722C",
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AdminAllCategories = () => {
  const [cookies, setCookie] = useCookies(["token"], ["user"], ["userId"]);
  const navigate = useNavigate();

  const checkUser = async () => {
    if (typeof cookies.token === "undefined" || cookies.user === "user") {
      navigate("/error");
    } else {
      fetchData();
    }
  };

  // PAGINATION
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const getData = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/categories`,
          {
            headers: {
              Authorization: "Bearer " + cookies.token,
            },
          }
        );
        setCategories(response.data);
        // setTotalPages(response.data.totalPages);
      };
      getData();
    } catch (error) {
      navigate("/error", {
        state: {
          message: "Error loading users",
        },
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const productDetail = (productId) => {
    const link = "/admin/product/";
    console.log(productId);
    navigate(link + productId);
  };

  // DELETE CATEGORY
  function deleteCategory(event) {
    event.preventDefault();
    console.log(event.target.value);
    axios
      .delete(`http://localhost:8080/api/categories/${event.target.value}`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin", {
            state: {
              message: "Delete category successfully",
            },
          });
        }
      })
      .catch((error) => {
        navigate("/admin", {
          state: {
            message: "Delete category failed",
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
          All Categories
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
          <AdminTab val={"allcategories"} />
          <Grid item xs={12}>
            <TableContainer sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Catgegory name</StyledTableCell>
                    <StyledTableCell align="center">
                      Catgegory description
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center">Manage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => {
                    return (
                      <StyledTableRow key={category.id}>
                        <StyledTableCell component="th" scope="row">
                          {category.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {category.description}
                        </StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell align="right">
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ p: 0.3, borderRadius: 5, marginRight: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="success"
                            sx={{ p: 0.3, borderRadius: 5, marginRight: 1 }}
                          >
                            <Link
                              onClick={() => productDetail(category.id)}
                              sx={{
                                textDecoration: "none",
                              }}
                            >
                              Detail
                            </Link>
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ p: 0.3, borderRadius: 5 }}
                            value={category.id}
                            onClick={(event) => deleteCategory(event)}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminAllCategories;
