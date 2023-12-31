import React, { useState, useEffect } from "react";
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
  setBoundaries,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  const handleSearch = async (text) => {
    try {
      setLoading(true);
      const response = await getPlaces(text);
      setLoading(false);
      const filteredResults = response.filter(
        (result) => result.type === "administrative"
      );
      setSearchResults(filteredResults);
      if (!recentSearches.includes(searchText) && searchText)
        setRecentSearches([searchText, ...recentSearches]);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

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
    setBoundaries(location.geojson.coordinates);
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
      <Button variant="contained" onClick={() => handleSearch(searchText)}>
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
      <div>
        <Typography variant="h5">Recent searches</Typography>
        <List>
          {recentSearches.map((result) => (
            <ListItem key={result}>
              <Button onClick={() => handleSearch(result)}>
                <ListItemText primary={result} />
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default SearchComponent;
