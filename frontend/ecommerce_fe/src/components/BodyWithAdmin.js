import * as React from "react";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

export default function ColumnsGrid() {
  return (
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
        <Grid item xs={4} sx={{ marginTop: 1 }}>
          <Grid
            container
            spacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            gap={1.5}
          >
            <Grid xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ p: 1.5, borderRadius: 5 }}
              >
                Add new User
              </Button>
            </Grid>
            <Grid xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ p: 1.5, borderRadius: 5 }}
              >
                Add new Produt
              </Button>
            </Grid>
            <Grid xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ p: 1.5, borderRadius: 5 }}
              >
                Add new category
              </Button>
            </Grid>
            <Grid xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ p: 1.5, borderRadius: 5 }}
              >
                add new role
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell align="right">Role</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
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
  );
}
