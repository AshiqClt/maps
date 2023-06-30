import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const SearchComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationCoordinates, setSelectedLocationCoordinates] =
    useState([42.3601, -71.0589]);
  const [populationData, setPopulationData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&extratags=1&addressdetails=1&limit=8&q=${searchText}`
      );
      const filteredResults = response.data.filter(
        (result) => result.type === "administrative"
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSelectedLocationCoordinates([
      Number(location?.lat),
      Number(location?.lon),
    ]);
    setPopulationData({
      population: location?.extratags?.population,
      year: location?.extratags["population:date"],
    });
  };

  return (
    <div style={{ width: "20%", height: "100vh", padding: "10px" }}>
      <Typography variant="h5">Search for a location</Typography>
      <TextField
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search locations..."
        sx={{ width: "100%", marginBottom: "10px", marginTop: "5px" }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {selectedLocation && (
        <div style={{ marginTop: "15px" }}>
          <Typography variant="h5">Population Information</Typography>
          {populationData.population || populationData.year ? (
            <>
              <Typography>Population: {populationData.population}</Typography>
              <Typography>Year: {populationData.year}</Typography>
            </>
          ) : (
            <Typography>No population data available.</Typography>
          )}
        </div>
      )}
      <div style={{ marginTop: "15px" }}>
        <Typography variant="h5">Search Results</Typography>
        <List>
          {searchResults.map((result) => (
            <ListItem key={result.place_id}>
              <Button onClick={() => handleLocationSelect(result)}>
                <ListItemText primary={result.display_name} />
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default SearchComponent;
