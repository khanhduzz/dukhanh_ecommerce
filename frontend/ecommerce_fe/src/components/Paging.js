import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Pagination,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const PaginatedList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [number, setNumber] = useState(1); // Number of items per page
  const [sortedBy, setSortedBy] = useState("name"); // Sorting field
  const [direction, setDirection] = useState(-1); // Sorting direction

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("it run");
    //   const response = await axios.request({
    //     method: "GET",
    //     url: "http://localhost:8080/api/products/page",
    //     headers: {
    //       "content-type": "application/json",
    //       "X-Frame-Options": "DENY",
    //     },
    //     data: [
    //       {
    //         "page":page,
    //         "number":number,
    //         "sortedBy":sortedBy,
    //         "direction":direction,
    //       },
    //     ],
    //   });

        const d = {
            "page":0,
            "number":1,
            "sortedBy":"name",
            "direction":1
        }

        const getData = async () => {
            const response = await axios.get('http://localhost:8080/api/products/page', 
            { params: d });
            console.log(response);
            setData(response.data);
            setTotalPages(response.data.totalPages);
        };

    } catch (error) { 
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, number, sortedBy, direction]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortedBy(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Paginated List
      </Typography>
      <FormControl sx={{ marginBottom: 2, minWidth: 120 }}>
        <InputLabel>Items per page</InputLabel>
        <Select value={number} onChange={handleNumberChange}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginBottom: 2, minWidth: 120, marginLeft: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortedBy} onChange={handleSortChange}>
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"price"}>Price</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginBottom: 2, minWidth: 120, marginLeft: 2 }}>
        <InputLabel>Direction</InputLabel>
        <Select value={direction} onChange={handleDirectionChange}>
          <MenuItem value={-1}>Ascending</MenuItem>
          <MenuItem value={1}>Descending</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          {data.map((item) => (
            <Typography key={item.id} sx={{ marginBottom: 1 }}>
              {item.name}
            </Typography>
          ))}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 2 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PaginatedList;
