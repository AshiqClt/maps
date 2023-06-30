import axios from "axios";

export async function getPlaces(searchText) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&extratags=1&addressdetails=1&limit=8&q=${searchText}`
  );
  return response.data;
}
