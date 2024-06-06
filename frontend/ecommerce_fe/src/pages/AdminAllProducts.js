/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { hexToRgb, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Hidden } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Typography from "@mui/material/Typography";
import SearchForm from "../components/SearchForm";
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
import Footer from "../components/Footer";

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

const AdminAllProducts = () => {
  const navigate = useNavigate();
  // PAGINATION
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // GET CATEGORIES
  function getCategories() {
    axios
      .get(`http://localhost:8080/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Error when seaching category",
          },
        });
      });
  }

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  // GET PRODUCT WITH FILTER
  function getFilterProducts(filtersToSubmit) {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/products`, {
        params: { ...filtersToSubmit, page: page },
      })
      .then((response) => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(response);
      })
      .catch((error) => {
        navigate("/", {
          state: {
            message: "Error when filter product",
          },
        });
      });
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
    getFilterProducts();
  }, [page]);

  function handleSeach(filtersToSubmit) {
    getFilterProducts(filtersToSubmit);
  }

  // END PAGING

  // GO TO PRODUCT DETAIL
  const productDetail = (productId) => {
    const link = "/admin/product/";
    console.log(productId);
    navigate(link + productId);
  };

  // DELETE PRODUCT
  const [cookies] = useCookies(["token"], ["user"], ["userId"]);

  function deleteProduct(event) {
    event.preventDefault();
    axios
      .delete(
        `http://localhost:8080/api/products/delete/${event.target.value}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin", {
            state: {
              message: "Delete successfully",
            },
          });
        }
      })
      .catch((error) => {
        navigate("/admin", {
          state: {
            message: "Delete failed",
          },
        });
      });
  }

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
          All products
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
          <AdminTab val="allproducts" />
          <Grid item xs={14}>
            <TableContainer sx={{ borderRadius: 2, maxHeight: "60vh" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Rating</StyledTableCell>
                    <StyledTableCell align="center">Featured</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        width: "300px",
                      }}
                    >
                      Description
                    </StyledTableCell>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="center">Manage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => {
                    return (
                      <StyledTableRow key={product.name}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{
                            minWidth: "100px",
                          }}
                        >
                          {product.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.rating}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.featured}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: "300px",
                            height: "100px",
                            overflow: "auto",
                          }}
                        >
                          {product.description.substring(0, 40)}...
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            Width: "150px",
                            Height: "100px",
                            overflow: "auto",
                          }}
                        >
                          <img
                            src={
                              product.image
                                ? `http://localhost:8080/api/images/${product.image[0]}`
                                : ""
                            }
                            alt={product.image ? "" : "No image"}
                            style={{
                              width: "150px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="success"
                              sx={{
                                p: 0.3,
                                borderRadius: 5,
                              }}
                              onClick={() => productDetail(product.id)}
                            >
                              Detail
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              sx={{ p: 0.3, borderRadius: 5 }}
                              value={product.id}
                              onClick={(event) => deleteProduct(event)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* <Grid item xs={2} sx={{ marginTop: "20px" }}>
            <Grid container>
              <Grid item xs={4}>
                <SearchForm categories={categories} onSearch={handleSeach} />
              </Grid>
            </Grid>
          </Grid> */}
          {/* <FormControl
              sx={{ marginBottom: 3, width: "120px", marginLeft: 2 }}
            >
              <InputLabel
                color="success"
                sx={{
                  fontSize: "16px",
                }}
              >
                Direction
              </InputLabel>
              <Select
                value={direction}
                onChange={handleDirectionChange}
                sx={{
                  marginTop: "10px",
                }}
              >
                <MenuItem value={-1}>Ascending</MenuItem>
                <MenuItem value={1}>Descending</MenuItem>
              </Select>
            </FormControl> */}
        </Grid>
        <Box
          sx={{
            width: "100px",
            marginLeft: "2rem",
          }}
        >
          <SearchForm categories={categories} onSearch={handleSeach} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          position: "fixed",
          left: "45vw",
          top: "85vh",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={handlePageChange}
              sx={{ marginTop: 2 }}
              color="success"
            />
          </Box>
        )}
      </Box>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminAllProducts;
