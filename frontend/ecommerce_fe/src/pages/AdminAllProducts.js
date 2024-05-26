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
} from "@mui/material";

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
  // const [products, setProducts] = useState([]);

  // const getData = async () => {
  //   const response = await axios.get("http://localhost:8080/api/products");
  //   console.log(response.data);
  //   setProducts(response.data);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // PAGINATION
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortedBy, setSortedBy] = useState("name"); // Sorting field
  const [direction, setDirection] = useState(-1); // Sorting direction

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("it run");
      const getData = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/products/page/${page}/2/${sortedBy}/${direction}`
        );
        console.log(response.data.content);
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      };
      getData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, sortedBy, direction]);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleSortChange = (event) => {
    setSortedBy(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };
  // END PAGIND

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
          <Grid item xs={2} sx={{ marginTop: 1 }}>
            <Grid
              container
              spacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              gap={1.5}
            >
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Add new User
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Add new Produt
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Add new category
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  add new role
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Show all users
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Show all products
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Show all categories
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  fullWidth
                  sx={{ p: 1.5, borderRadius: 2 }}
                >
                  Show all roles
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableContainer sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Rating</StyledTableCell>
                    <StyledTableCell align="center">
                      Description
                    </StyledTableCell>
                    <StyledTableCell align="center">Manage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <StyledTableRow key={product.name}>
                      <StyledTableCell component="th" scope="row">
                        {product.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.price * 1000} VND
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.rating}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.description}
                      </StyledTableCell>
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
                          Detail
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ p: 0.3, borderRadius: 5 }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={2} sx={{ marginTop: "20px" }}>
            <FormControl
              sx={{
                marginBottom: 3,
                width: "120px",
                marginLeft: 2,
              }}
              color="success"
            >
              <InputLabel
                color="success"
                sx={{
                  fontSize: "16px",
                }}
              >
                Sort By
              </InputLabel>
              <Select
                value={sortedBy}
                onChange={handleSortChange}
                sx={{
                  marginTop: "10px",
                }}
              >
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"price"}>Price</MenuItem>
              </Select>
            </FormControl>
            <FormControl
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
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
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
    </div>
  );
};

export default AdminAllProducts;
