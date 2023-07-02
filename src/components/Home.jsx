import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import DisplayMap from "./DisplayMap";

const bostonCoordinates = [42.3601, -71.0589];
const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationCoordinates, setSelectedLocationCoordinates] =
    useState(bostonCoordinates);
  const [boundaries, setBoundaries] = useState([]);
  return (
    <div style={{ width: "100vw", display: "flex" }}>
      <SearchComponent
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setSelectedLocationCoordinates={setSelectedLocationCoordinates}
        setBoundaries={setBoundaries}
      />
      <DisplayMap
        selectedLocation={selectedLocation}
        selectedLocationCoordinates={selectedLocationCoordinates}
        boundaries={boundaries}
      />
    </div>
  );
};

export default Home;
