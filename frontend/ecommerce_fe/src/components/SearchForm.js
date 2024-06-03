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
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    feature: "",
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

    // Create a new object without empty values
    const filtersToSubmit = Object.fromEntries(
      Object.entries(searchFilters).filter(([key, value]) => value !== "")
    );

    onSearch(filtersToSubmit);
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
          width: "10vw",
          gap: "20px",
        }}
      >
        <Typography variant="h5">Find your product</Typography>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            name="name"
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={searchFilters.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            width: "100%",
          }}
        >
          <FormControl
            variant="outlined"
            xs={12}
            sm={6}
            md={3}
            style={{ width: "100%" }}
          >
            <InputLabel>Select Category</InputLabel>
            <Select
              name="category"
              value={searchFilters.category}
              onChange={handleChange}
              label="Select Category"
            >
              <MenuItem value="">Select Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            name="minPrice"
            label="Min Price"
            variant="outlined"
            fullWidth
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            value={searchFilters.minPrice}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={3}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            name="maxPrice"
            label="Max Price"
            variant="outlined"
            fullWidth
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            value={searchFilters.maxPrice}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            width: "100%",
          }}
        >
          <FormControl
            variant="outlined"
            xs={12}
            sm={6}
            md={3}
            style={{ width: "100%" }}
          >
            <InputLabel>Select Feature</InputLabel>
            <Select
              name="feature"
              value={searchFilters.feature}
              onChange={handleChange}
              label="Feature Product"
            >
              <MenuItem value="">All products</MenuItem>
              <MenuItem value={1}>Feature products</MenuItem>
            </Select>
          </FormControl>
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
