import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { stocksData as initialStocksData, marketIndices as initialMarketIndices, portfolioSummary as initialPortfolioSummary } from '../data/stocksData';
import { updateStocksData, updateMarketIndices, updatePortfolioSummary, formatTimeAgo } from '../utils/timeBasedData';

const MarketDataContext = createContext();

export const MarketDataProvider = ({ children }) => {
  const [stocksData, setStocksData] = useState(initialStocksData);
  const [marketIndices, setMarketIndices] = useState(initialMarketIndices);
  const [portfolioSummary, setPortfolioSummary] = useState(initialPortfolioSummary);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const [updateInterval, setUpdateInterval] = useState(30000); // 30 seconds by default
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Function to update all market data
  const updateMarketData = useCallback(() => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Update stocks data
      const updatedStocks = updateStocksData(stocksData);
      setStocksData(updatedStocks);
      
      // Update market indices
      const updatedIndices = updateMarketIndices(marketIndices);
      setMarketIndices(updatedIndices);
      
      // Update portfolio summary based on updated stocks
      const updatedSummary = updatePortfolioSummary(updatedStocks, portfolioSummary);
      setPortfolioSummary(updatedSummary);
      
      // Update last updated timestamp
      const now = new Date().toISOString();
      setLastUpdated(now);
      
      setIsLoading(false);
    }, 500); // 500ms delay to simulate network request
  }, [stocksData, marketIndices, portfolioSummary]);

  // Set up auto-update interval
  useEffect(() => {
    let intervalId;
    
    if (isAutoUpdateEnabled) {
      intervalId = setInterval(() => {
        updateMarketData();
      }, updateInterval);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [updateMarketData, updateInterval, isAutoUpdateEnabled]);

  // Function to change update interval
  const changeUpdateInterval = (newInterval) => {
    setUpdateInterval(newInterval);
  };

  // Function to toggle auto-update
  const toggleAutoUpdate = () => {
    setIsAutoUpdateEnabled(prev => !prev);
  };

  // Format the last updated time
  const formattedLastUpdated = formatTimeAgo(lastUpdated);

  return (
    <MarketDataContext.Provider 
      value={{ 
        stocksData, 
        marketIndices, 
        portfolioSummary,
        lastUpdated,
        formattedLastUpdated,
        isLoading,
        isAutoUpdateEnabled,
        updateInterval,
        updateMarketData,
        changeUpdateInterval,
        toggleAutoUpdate
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (context === undefined) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
};
