import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const FilterByStatus = ({ status, setStatus, trigger }) => {
  const handleChange = async (e) => {
    await trigger(e.target.value);
    setStatus(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120, maxWidth: 300, my: "10px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter By Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Filter By Status"
          onChange={handleChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Available"}>Available</MenuItem>
          <MenuItem value={"Reserved"}>Reserved</MenuItem>
          <MenuItem value={"Pending"}>Pending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterByStatus;
