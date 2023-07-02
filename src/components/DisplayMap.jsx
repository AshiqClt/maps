import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DisplayMap = ({ selectedLocation, selectedLocationCoordinates, boundaries }) => {
  const geoJSONStyle = {
    fillColor: "blue",
    weight: 2,
    opacity: 1,
    color: "blue",
    fillOpacity: 0.3,
  };

  let geoJSONData = null;
  if (boundaries) {
    geoJSONData = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: boundaries,
      },
    };
  }

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
        {geoJSONData && boundaries[0] && boundaries[0].length > 3 && (
          <GeoJSON data={geoJSONData} style={geoJSONStyle} />
        )}

        <Marker position={selectedLocationCoordinates}>
          <Popup>{selectedLocation?.display_name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DisplayMap;
