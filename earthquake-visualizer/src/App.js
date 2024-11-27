import React, { useState, useEffect } from "react";
import EarthquakeMap from "./components/EarthquakeMap";
import Filters from "./components/Filters";
import Insights from "./components/Insights";
import { fetchEarthquakeData } from "./services/earthquakeService";
import "./App.css";
import { config } from "dotenv";
import 'process/browser'; // This ensures that 'process' is available in the browser

import 'vm-browserify';

config();


const App = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredEarthquakes, setFilteredEarthquakes] = useState([]);
  const [minMagnitude, setMinMagnitude] = useState(2.5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchEarthquakeData();
      setEarthquakes(data);
      setFilteredEarthquakes(data);
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const filtered = earthquakes.filter(
      (quake) => quake.magnitude >= minMagnitude
    );
    setFilteredEarthquakes(filtered);
  }, [minMagnitude, earthquakes]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        Earthquake Visualizer 🌍
      </h1>
      {loading ? (
        <p className="text-center text-lg">Loading data...</p>
      ) : (
        <>
        
          <Filters minMagnitude={minMagnitude} setMinMagnitude={setMinMagnitude} />
          
          <Insights earthquakes={filteredEarthquakes} />
          <EarthquakeMap earthquakes={filteredEarthquakes} />
        </>
      )}
    </div>
  );
};

export default App;
