import React from "react";

const Filters = ({ minMagnitude, setMinMagnitude }) => {
  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 shadow-lg rounded-lg mb-6">
      <label className="block text-2xl font-semibold text-gray-800 mb-4">
        Minimum Magnitude
      </label>
      
      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={minMagnitude}
        onChange={(e) => setMinMagnitude(parseFloat(e.target.value))}
        className="w-full h-2 bg-green-300 rounded-lg appearance-none"
        style={{
          backgroundSize: `${(minMagnitude / 10) * 100}% 100%`,
          transition: 'background-size 0.25s ease-in-out',
        }}
      />
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 pointer-events-none"
        style={{ left: `${(minMagnitude / 10) * 100}%` }}
      >
        {/* <div className="w-6 h-6 bg-green-600 rounded-full shadow-lg" /> */}
      </div>
      
      <p className="mt-4 text-center text-lg font-medium text-gray-700">
        Current: <span className="text-2xl font-bold text-green-600">{minMagnitude}</span>
      </p>
    </div>
  );
};

export default Filters;
