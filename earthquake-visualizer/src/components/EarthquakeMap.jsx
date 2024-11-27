import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const EarthquakeMap = ({ earthquakes }) => {
  // Function to generate color based on magnitude
  const getColor = (magnitude) => {
    if (magnitude < 4) return "#00FF00"; // Green for small quakes
    if (magnitude < 5) return "#FFFF00"; // Yellow for medium quakes
    if (magnitude < 6) return "#FF9900"; // Orange for stronger quakes
    return "#FF0000"; // Red for very strong quakes
  };

  // Function to adjust the radius based on magnitude
  const getRadius = (magnitude) => {
    return Math.max(magnitude * 3, 10); // Ensure a minimum radius of 10
  };

  return (
    <div className="h-96 mt-5">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {earthquakes.map((quake, index) => (
          <CircleMarker
            key={index}
            center={[quake.latitude, quake.longitude]}
            radius={getRadius(quake.magnitude)}
            color={getColor(quake.magnitude)}
            fillColor={getColor(quake.magnitude)}
            fillOpacity={0.7}
            weight={1}
            opacity={0.8}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openTooltip();
              },
              mouseout: (e) => {
                e.target.closeTooltip();
              },
            }}
          >
            <Tooltip>
              <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                <strong>{quake.place}</strong>
              </div>
              <div style={{ fontSize: "12px" }}>
                Magnitude: {quake.magnitude}
                <br />
                Depth: {quake.depth} km
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;
