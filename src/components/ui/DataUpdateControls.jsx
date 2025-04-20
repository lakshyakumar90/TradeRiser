import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useMarketData } from '../../context/MarketDataContext';

const DataUpdateControls = ({ showTimeRange = true }) => {
  const { isDarkMode } = useTheme();
  const { 
    formattedLastUpdated, 
    isLoading, 
    isAutoUpdateEnabled, 
    updateInterval,
    updateMarketData, 
    toggleAutoUpdate,
    changeUpdateInterval
  } = useMarketData();

  const intervals = [
    { value: 5000, label: '5s' },
    { value: 10000, label: '10s' },
    { value: 30000, label: '30s' },
    { value: 60000, label: '1m' },
    { value: 300000, label: '5m' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      <div>
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Last updated: {formattedLastUpdated}
          {isAutoUpdateEnabled && (
            <span className="ml-2">
              (Auto-update: <span className="font-medium">{updateInterval / 1000}s</span>)
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        {/* Auto-update toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleAutoUpdate}
          className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
          title={isAutoUpdateEnabled ? "Disable auto-update" : "Enable auto-update"}
        >
          <i className={`bx ${isAutoUpdateEnabled ? "bx-pause" : "bx-play"} text-xl`}></i>
        </motion.button>
        
        {/* Manual refresh */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={updateMarketData}
          className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
          disabled={isLoading}
          title="Refresh data"
        >
          <i className={`bx bx-refresh text-xl ${isLoading ? "animate-spin" : ""}`}></i>
        </motion.button>
        
        {/* Update interval selector */}
        {isAutoUpdateEnabled && (
          <select
            value={updateInterval}
            onChange={(e) => changeUpdateInterval(Number(e.target.value))}
            className={`rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"} px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {intervals.map((interval) => (
              <option key={interval.value} value={interval.value}>
                {interval.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default DataUpdateControls;
