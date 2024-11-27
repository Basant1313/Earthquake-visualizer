import axios from "axios";
import 'process/browser';
import 'vm-browserify';

export const fetchEarthquakeData = async () => {
  const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  const response = await axios.get(url);
  return response.data.features.map((feature) => ({
    place: feature.properties.place,
    magnitude: feature.properties.mag,
    depth: feature.geometry.coordinates[2],
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
  }));
};
