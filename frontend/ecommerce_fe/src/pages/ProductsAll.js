import React, { useState, useEffect } from "react";
import { Grid, Box, CircularProgress, Pagination } from "@mui/material";
import Card1 from "../components/Card1";
import Nav from "../components/Nav";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const ProductPage = () => {
  // GET ALL PRODUCTS
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState({});
  const [cookies] = useCookies(["token"]);
  const [page, setPage] = useState(0);

  // HANDLE PAGE
  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  // GET CATEGORIES
  function getCategories() {
    axios
      .get(`http://localhost:8080/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        toast.error("Error when seaching category");
      });
  }

  function handleSeach(filtersToSubmit) {
    getFilterProducts(filtersToSubmit);
  }

  // GET PRODUCT WITH FILTER
  function getFilterProducts(filtersToSubmit) {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/products`, {
        params: { ...filtersToSubmit, page: page, size: 9 },
      })
      .then((response) => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(response);
      })
      .catch((error) => {
        toast.error("Error when filter product");
      });
    setLoading(false);
  }

  // GET USER INFOR
  // const getUserInformation = async () => {
  //   if (typeof cookies.token === "undefined") {
  //     return;
  //   }
  //   const response = await axios
  //     .get(`http://localhost:8080/api/me`, {
  //       headers: {
  //         Authorization: "Bearer " + cookies.token,
  //       },
  //     })
  //     .catch((error) => {
  //       navigate("/signin", {
  //         state: {
  //           message: "Do not change the cookies",
  //         },
  //       });
  //     });
  //   let info = response.data.split(" ");
  //   let res = info[1].trim();
  //   getUser(res);
  // };

  // const getUser = async (res) => {
  //   const response = await axios
  //     .get(`http://localhost:8080/api/users/${res}`, {
  //       headers: {
  //         Authorization: "Bearer " + cookies.token,
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       navigate("/error", {
  //         state: {
  //           message: "Error",
  //         },
  //       });
  //     });
  // };

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
        console.log(error);
      });
    let info = response.data.split(" ");
    let res = info[1].trim();

    const re = await axios.get(`http://localhost:8080/api/users/${res}`, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    });
    const { data } = re;
    setUser({ ...data });
    // console.log(user);
  };

  useEffect(() => {
    getUserInformation();
    getFilterProducts();
    getCategories();
  }, [page]);

  return (
    <div className="App">
      <Nav user={user} />
      <Grid
        spacing={3}
        boxSizing="border-box"
        sx={{
          margin: "20vh 40px 40px 40px",
        }}
        display="flex"
        gap={4}
        justifyContent="flex-start"
      >
        <Grid item xs={2}>
          <SearchForm categories={categories} onSearch={handleSeach} />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2} gap={4} justifyContent="center">
            {products.map((product, index) => (
              <Card1 key={product.id} product={product} user={user} />
            ))}
          </Grid>
        </Grid>
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
      </Grid>
    </div>
  );
};

export default ProductPage;
