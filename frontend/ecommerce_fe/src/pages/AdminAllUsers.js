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

const AdminAllUsers = () => {
  const [cookies, setCookie] = useCookies(["token"], ["user"], ["userId"]);
  const navigate = useNavigate();

  const checkUser = async () => {
    if (typeof cookies.token === "undefined" || cookies.user === "user") {
      navigate("/error");
    }
  };

  function deleteUser(event) {
    axios
      .delete(`http://localhost:8080/api/users/${event}`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      })
      .then(() => {
        navigate("/admin", {
          state: {
            message: "Delete user successfully",
          },
        });
      })
      .catch((error) => {
        navigate("/admin", {
          state: {
            message: "Delete failed",
          },
        });
      });
  }

  // PAGINATION
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(0);
  // const [totalPages, setTotalPages] = useState(1);
  // const [sortedBy, setSortedBy] = useState("name"); // Sorting field
  // const [direction, setDirection] = useState(-1); // Sorting direction

  const fetchData = async () => {
    setLoading(true);
    try {
      const getData = async () => {
        const response = await axios.get(`http://localhost:8080/api/users`, {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        });
        setUsers(response.data);
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
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  // const handlePageChange = (event, value) => {
  //   setPage(value - 1);
  // };

  // const handleSortChange = (event) => {
  //   setSortedBy(event.target.value);
  // };

  // const handleDirectionChange = (event) => {
  //   setDirection(event.target.value);
  // };
  // END PAGING

  const userDetail = (userId) => {
    const link = "/admin/user/";
    console.log(userId);
    navigate(link + userId);
  };

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
          All users
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
          <AdminTab val={"allusers"} />
          <Grid item xs={14}>
            <TableContainer sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Username</StyledTableCell>
                    <StyledTableCell align="center">First Name</StyledTableCell>
                    <StyledTableCell align="center">Last Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Role</StyledTableCell>
                    <StyledTableCell align="center">Avatar</StyledTableCell>
                    <StyledTableCell align="center">Manage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    return (
                      <StyledTableRow key={user.id}>
                        <StyledTableCell component="th" scope="row">
                          {user.username}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.firstName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.authorities[0].authority.substring(5)}
                          {user.authorities[1] &&
                          typeof user.authorities[1].authority !== "undefined"
                            ? ", " + user.authorities[1].authority.substring(5)
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <img
                            src={
                              user.image
                                ? `http://localhost:8080/api/images/${user.image}`
                                : ""
                            }
                            alt={user.image ? "" : "No image"}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {/* <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ p: 0.3, borderRadius: 5, marginRight: 1 }}
                          >
                            Edit
                          </Button> */}
                          <Button
                            variant="outlined"
                            color="success"
                            sx={{ p: 0.3, borderRadius: 5, marginRight: 1 }}
                          >
                            <Link
                              onClick={() => userDetail(user.id)}
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
                            value={user.id}
                            onClick={(e) => deleteUser(e.target.value)}
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
          {/* <Grid xs={2} sx={{ marginTop: "20px" }}>
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
          </Grid> */}
        </Grid>
      </Box>
      {/* <Box
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
      </Box> */}
    </div>
  );
};

export default AdminAllUsers;
