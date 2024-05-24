import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const AdminAllUsers = () => {
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
      <h1 variant="h1">Administrator</h1>
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
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Rating</StyledTableCell>
                    <StyledTableCell align="right">Description</StyledTableCell>
                    <StyledTableCell align="right">Manage</StyledTableCell>
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
                      <StyledTableCell align="right">
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminAllUsers;
