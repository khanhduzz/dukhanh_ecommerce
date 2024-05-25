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
import Pagination from "@mui/material/Pagination";

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
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    console.log(response.data);
    setProducts(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
          <Grid item xs={3} sx={{ marginTop: 1 }}>
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
          <Grid item xs={13}>
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
                      <StyledTableCell align="right">
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
            {/* <Pagination count={10} color="secondary" /> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminAllProducts;
