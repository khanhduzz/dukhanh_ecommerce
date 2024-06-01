import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const SearchForm = ({ categories, onSearch }) => {
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: "",
    selectedCategory: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchFilters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        // container
        spacing={2}
        alignItems="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "15vw",
          gap: "20px",
        }}
      >
        <Typography variant="h5">Find your product</Typography>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="searchTerm"
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={searchFilters.searchTerm}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            width: "95%",
          }}
        >
          <FormControl variant="outlined" fullWidth style={{ width: "100%" }}>
            <InputLabel>Select Category</InputLabel>
            <Select
              name="selectedCategory"
              // value={searchFilters.selectedCategory}
              // onChange={handleChange}
              label="Select Category"
            >
              <MenuItem value="">Select Categories</MenuItem>
              {/* {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            name="minPrice"
            label="Min Price"
            variant="outlined"
            fullWidth
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            // value={searchFilters.minPrice}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            name="maxPrice"
            label="Max Price"
            variant="outlined"
            fullWidth
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            // value={searchFilters.maxPrice}
            // onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;
