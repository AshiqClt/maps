import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { getPlaces } from "../services/API";

const SearchComponent = ({
  selectedLocation,
  setSelectedLocation,
  setSelectedLocationCoordinates,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await getPlaces(searchText);
      setLoading(false);
      const filteredResults = response.filter(
        (result) => result.type === "administrative"
      );
      setSearchResults(filteredResults);
    } catch (error) {
      setLoading(false);
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
          {populationData.population ? (
            <>
              <Typography>Population: {populationData.population}</Typography>
              <Typography>
                Year:{" "}
                {populationData.year
                  ? populationData.year
                  : "Data not available"}
              </Typography>
            </>
          ) : (
            <Typography>Population data not available.</Typography>
          )}
        </div>
      )}
      <div style={{ marginTop: "15px" }}>
        <Typography variant="h5">Search Results</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {searchResults.map((result) => (
              <ListItem key={result.place_id}>
                <Button onClick={() => handleLocationSelect(result)}>
                  <ListItemText primary={result.display_name} />
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
