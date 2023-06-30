# Location Search and Map Display Project Documentation

This project is a web application that allows users to search for locations and display them on a map. It is built using React and Material-UI for styling. The OpenStreetMap API is used for location search, and the React-Leaflet library is used for map display.

## Installation

- Clone the project repository
- Install dependencies with `npm install`
- Start the development server with `npm run dev`

## Project Structure

- `App.jsx`: Main entry point of the application
- `Home.jsx`: Component for search functionality and map display
- `DisplayMap.jsx`: Component for Leaflet map display
- `SearchComponent.jsx`: Component for search input and results

## Usage

1. Enter a location in the search input field.
2. Click the "Search" button.
3. View search results and select a location.
4. Selected location is displayed on the map as a marker.
5. Population information is shown if available.

## Dependencies

- React
- Material-UI
- axios
- react-leaflet

## Approach to the problem

1. Understand the requirements.
2. Understand the third-party API by reading Nominatim Documentation.
3. Learn about the required libraries which I am not familiar with (react-leaflet).
4. Implement the requirements one by one.
5. Modularize the code.
6. Add additional features (e.g. Loader for asynchronous operations).
7. Document the project.

## Decisions took

1. Decide the libraries required.
2. Decide how to use the API to get the required data. I figured out that setting extratags parameter to one will give population data. Set the limit parameter to 8 so that too many results will not be fetched and displayed on the screen.
3. Decide the overall design. I decided to place the search and search results container left and map to the right of it with a height equal to the full height of the screen.
4. Decide where to display population details. I decided to show population details below the search area and above the search results.
5. Decide how to properly modularize the code to improve readability and maintainability.

## Conclusion

This project demonstrates location search and map display functionality using React, Material-UI, and Leaflet.