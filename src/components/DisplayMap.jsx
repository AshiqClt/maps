import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DisplayMap = ({ selectedLocation, selectedLocationCoordinates }) => {
  console.log(selectedLocationCoordinates);
  return (
    <div style={{ width: "80%" }}>
      <MapContainer
        center={selectedLocationCoordinates}
        key={`${selectedLocationCoordinates[0]}-${selectedLocationCoordinates[1]}`}
        zoom={12}
        style={{ height: "97vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={selectedLocationCoordinates}>
          <Popup>{selectedLocation?.display_name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DisplayMap;
