import React, { useState } from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import LineChart from '../components/charts/LineChart';
import DataUpdateControls from '../components/ui/DataUpdateControls';
import { useTheme } from '../context/ThemeContext';
import { useMarketData } from '../context/MarketDataContext';

const TimeBasedDataDemo = () => {
  const { isDarkMode } = useTheme();
  const { 
    stocksData, 
    marketIndices, 
    portfolioSummary, 
    updateInterval, 
    changeUpdateInterval, 
    isAutoUpdateEnabled, 
    toggleAutoUpdate 
  } = useMarketData();
  
  const [selectedStock, setSelectedStock] = useState(stocksData[0].id);
  
  const stock = stocksData.find(s => s.id === selectedStock);
  
  const intervals = [
    { value: 2000, label: '2 seconds' },
    { value: 5000, label: '5 seconds' },
    { value: 10000, label: '10 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' },
    { value: 300000, label: '5 minutes' },
  ];

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-2"
      >
        Time-Based Data Demo
      </motion.h1>
      
      <DataUpdateControls />
      
      <Card 
        title="Data Update Settings" 
        padding="p-5"
        delay={1}
      >
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium mb-2">Auto-Update</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                When enabled, data will automatically update at the specified interval.
              </p>
            </div>
            
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isAutoUpdateEnabled}
                  onChange={toggleAutoUpdate}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium">
                  {isAutoUpdateEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium mb-2">Update Interval</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Choose how frequently the data should update.
              </p>
            </div>
            
            <div>
              <select
                value={updateInterval}
                onChange={(e) => changeUpdateInterval(Number(e.target.value))}
                disabled={!isAutoUpdateEnabled}
                className={`rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isAutoUpdateEnabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {intervals.map((interval) => (
                  <option key={interval.value} value={interval.value}>
                    {interval.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      <Card 
        title="Stock Price Updates" 
        padding="p-5"
        delay={2}
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium mb-2">Select Stock</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Choose a stock to monitor its real-time price updates.
              </p>
            </div>
            
            <div>
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(Number(e.target.value))}
                className={`rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {stocksData.map((stock) => (
                  <option key={stock.id} value={stock.id}>
                    {stock.symbol} - {stock.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {stock && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{stock.symbol}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stock.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${stock.price.toLocaleString()}</div>
                  <div className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercentage.toFixed(2)}%)
                  </div>
                </div>
              </div>
              
              <div className="h-60">
                <LineChart 
                  data={stock.dailyData} 
                  dataKey="price" 
                  xAxisKey="time" 
                  color={stock.change >= 0 ? '#34C759' : '#FF3B30'} 
                  height={240}
                  showGrid={true}
                  showTooltip={true}
                  showXAxis={true}
                  showYAxis={true}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <Card 
        title="Portfolio Summary Updates" 
        padding="p-5"
        delay={3}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</p>
            <h3 className="text-xl font-bold mt-1">${portfolioSummary.totalValue.toLocaleString()}</h3>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Daily Change</p>
            <h3 className="text-xl font-bold mt-1">${portfolioSummary.dailyChange.toLocaleString()}</h3>
            <div className={`text-sm ${portfolioSummary.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioSummary.dailyChange >= 0 ? '+' : ''}{portfolioSummary.dailyChangePercentage.toFixed(2)}%
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monthly Change</p>
            <h3 className="text-xl font-bold mt-1">${portfolioSummary.monthlyChange.toLocaleString()}</h3>
            <div className={`text-sm ${portfolioSummary.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioSummary.monthlyChange >= 0 ? '+' : ''}{portfolioSummary.monthlyChangePercentage.toFixed(2)}%
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Yearly Change</p>
            <h3 className="text-xl font-bold mt-1">${portfolioSummary.yearlyChange.toLocaleString()}</h3>
            <div className={`text-sm ${portfolioSummary.yearlyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioSummary.yearlyChange >= 0 ? '+' : ''}{portfolioSummary.yearlyChangePercentage.toFixed(2)}%
            </div>
          </div>
        </div>
      </Card>
      
      <Card 
        title="Market Indices Updates" 
        padding="p-5"
        delay={4}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketIndices.map((index) => (
            <div key={index.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{index.name}</h3>
                <div className={index.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.change >= 0 ? '+' : ''}{index.changePercentage.toFixed(2)}%)
                </div>
              </div>
              <div className="text-xl font-bold mb-3">{index.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TimeBasedDataDemo;
