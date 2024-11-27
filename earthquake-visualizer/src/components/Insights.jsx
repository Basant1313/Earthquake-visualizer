import React, { useState } from "react";
import { generateInsights } from "../services/openAiService";

const Insights = ({ earthquakes }) => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateInsights = async () => {
    setLoading(true);
    const result = await generateInsights(earthquakes);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="my-6 p-6 bg-gradient-to-r from-purple-50 to-purple-100 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-5">Earthquake Insights</h2>
      
      <button
        onClick={handleGenerateInsights}
        className="w-full sm:w-auto bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 transform hover:scale-105"
      >
        {loading ? (
          <span className="animate-spin text-lg">🔄</span>
        ) : (
          "Generate Insights"
        )}
      </button>

      {loading ? (
        <div className="mt-4 text-center text-purple-600 font-medium">
          Generating insights... please wait.
        </div>
      ) : (
        insights && (
          <div className="mt-6 p-4 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Insights:</h3>
            <p>{insights}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Insights;
