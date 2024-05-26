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
  // const [number, setNumber] = useState(1); // Number of items per page
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
        setData(response.data.content);
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

  // const handleNumberChange = (event) => {
  //   setNumber(event.target.value);
  // };

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
      {/* <FormControl sx={{ marginBottom: 2, minWidth: 120 }}>
        <InputLabel>Items per page</InputLabel>
        <Select value={number} onChange={handleNumberChange}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl> */}
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
            page={page + 1}
            onChange={handlePageChange}
            sx={{ marginTop: 2 }}
            color="secondary"
          />
        </Box>
      )}
    </Box>
  );
};

export default PaginatedList;
