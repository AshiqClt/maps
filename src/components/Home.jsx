import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import DisplayMap from "./DisplayMap";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationCoordinates, setSelectedLocationCoordinates] =
    useState([42.3601, -71.0589]);
  return (
    <div style={{ width: "100vw", display: "flex" }}>
      <SearchComponent 
      selectedLocation={selectedLocation}
      setSelectedLocation={setSelectedLocation}
      setSelectedLocationCoordinates={setSelectedLocationCoordinates}
      />
      <DisplayMap 
      selectedLocation={selectedLocation}
      selectedLocationCoordinates={selectedLocationCoordinates}
      />
    </div>
  );
};

export default Home;
