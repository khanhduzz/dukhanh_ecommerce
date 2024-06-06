/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import {
  styled,
  Modal,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
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
import { Link } from "@mui/material";
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

  // GET CATEGORIES
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

  // SET OPEN CLOSE CATEGORY EDIT
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenCategory = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleCloseCategory = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // MODIFY CATEGORY
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function updateCategory(event) {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/categories/${selectedCategory.id}`,
        {
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin", {
            state: {
              message: "Update category successfully",
            },
          });
        }
      })
      .catch((error) => {
        navigate("/admin", {
          state: {
            message: "Update category failed",
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
          <Grid item xs={14}>
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
                            onClick={() => handleOpenCategory(category)}
                          >
                            Edit
                          </Button>
                          <Modal
                            open={open}
                            onClose={handleCloseCategory}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Box
                                component="form"
                                onSubmit={updateCategory}
                                sx={{
                                  width: "100%",
                                  height: "400px",
                                  border: "2px solid #fff",
                                  borderRadius: "15px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="h4"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: 300,
                                  }}
                                >
                                  Category information
                                </Typography>
                                {/* Name */}
                                <FormControl
                                  sx={{
                                    width: "90%",
                                    marginY: "15px",
                                  }}
                                >
                                  <Input
                                    id="name"
                                    color="grey"
                                    type="text"
                                    aria-describedby="my-helper-text"
                                    sx={{
                                      fontSize: "20px",
                                      marginLeft: "15px",
                                    }}
                                    placeholder={
                                      selectedCategory
                                        ? selectedCategory.name
                                        : ""
                                    }
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                  <FormHelperText id="my-helper-text" sx={{}}>
                                    Enter category name
                                  </FormHelperText>
                                </FormControl>
                                {/* Description */}
                                <FormControl
                                  sx={{
                                    width: "90%",
                                    marginY: "15px",
                                  }}
                                >
                                  <Input
                                    id="description"
                                    color="grey"
                                    type="text"
                                    aria-describedby="my-helper-text"
                                    sx={{
                                      fontSize: "20px",
                                      marginLeft: "15px",
                                    }}
                                    placeholder={
                                      selectedCategory
                                        ? selectedCategory.description
                                        : ""
                                    }
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  />
                                  <FormHelperText id="my-helper-text" sx={{}}>
                                    More information
                                  </FormHelperText>
                                </FormControl>

                                {/* Button group */}
                                <Box
                                  sx={{
                                    display: "inline-flex",
                                    gap: "10px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    sx={{
                                      padding: "10px 50px",
                                      borderRadius: 5,
                                    }}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    sx={{
                                      padding: "10px 50px",
                                      borderRadius: 5,
                                    }}
                                  >
                                    <Link
                                      onClick={handleCloseCategory}
                                      sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                      }}
                                    >
                                      Cancel
                                    </Link>
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Modal>
                          {/* <Button
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
                          </Button> */}
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
      {/* <Footer /> */}
    </div>
  );
};

export default AdminAllCategories;
