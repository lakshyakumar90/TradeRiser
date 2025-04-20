/**
 * Generates a random number within a range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimals - Number of decimal places
 * @returns {number} Random number
 */
export const getRandomNumber = (min, max, decimals = 2) => {
  const random = Math.random() * (max - min) + min;
  return Number(random.toFixed(decimals));
};

/**
 * Generates a random price change based on volatility
 * @param {number} currentPrice - Current price
 * @param {number} volatility - Volatility factor (0-1)
 * @returns {number} New price
 */
export const generatePriceChange = (currentPrice, volatility = 0.005) => {
  const changePercent = getRandomNumber(-volatility, volatility, 4);
  const change = currentPrice * changePercent;
  return Number((currentPrice + change).toFixed(2));
};

/**
 * Updates stock data with time-based changes
 * @param {Array} stocks - Array of stock objects
 * @returns {Array} Updated stocks
 */
export const updateStocksData = (stocks) => {
  return stocks.map(stock => {
    // Generate new price with random change
    const volatility = stock.volatility || 0.005; // Default volatility or use stock-specific
    const newPrice = generatePriceChange(stock.price, volatility);
    
    // Calculate change and change percentage
    const change = Number((newPrice - stock.price).toFixed(2));
    const changePercentage = Number(((change / stock.price) * 100).toFixed(2));
    
    // Update value based on shares
    const value = Number((newPrice * stock.shares).toFixed(2));
    
    // Update daily data with new price point
    const currentTime = new Date();
    const timeString = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
    
    const dailyData = [...stock.dailyData];
    // If we have more than 14 data points, remove the oldest one
    if (dailyData.length >= 14) {
      dailyData.shift();
    }
    dailyData.push({ time: timeString, price: newPrice });
    
    return {
      ...stock,
      price: newPrice,
      change,
      changePercentage,
      value,
      dailyData,
      lastUpdated: new Date().toISOString()
    };
  });
};

/**
 * Updates market indices with time-based changes
 * @param {Array} indices - Array of market index objects
 * @returns {Array} Updated indices
 */
export const updateMarketIndices = (indices) => {
  return indices.map(index => {
    // Generate new value with random change
    const volatility = 0.0025; // Lower volatility for indices
    const newValue = generatePriceChange(index.value, volatility);
    
    // Calculate change and change percentage
    const change = Number((newValue - index.value).toFixed(2));
    const changePercentage = Number(((change / index.value) * 100).toFixed(2));
    
    return {
      ...index,
      value: newValue,
      change,
      changePercentage,
      lastUpdated: new Date().toISOString()
    };
  });
};

/**
 * Updates portfolio summary based on updated stocks
 * @param {Array} stocks - Array of updated stock objects
 * @param {Object} currentSummary - Current portfolio summary
 * @returns {Object} Updated portfolio summary
 */
export const updatePortfolioSummary = (stocks, currentSummary) => {
  // Calculate total value from stocks
  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
  
  // Calculate daily change
  const dailyChange = Number((totalValue - currentSummary.totalValue).toFixed(2));
  const dailyChangePercentage = Number(((dailyChange / currentSummary.totalValue) * 100).toFixed(2));
  
  // Keep monthly and yearly changes, but adjust them slightly
  const monthlyChangeAdjustment = getRandomNumber(-0.1, 0.1, 2);
  const yearlyChangeAdjustment = getRandomNumber(-0.2, 0.2, 2);
  
  const monthlyChange = Number((currentSummary.monthlyChange + monthlyChangeAdjustment).toFixed(2));
  const monthlyChangePercentage = Number(((monthlyChange / totalValue) * 100).toFixed(2));
  
  const yearlyChange = Number((currentSummary.yearlyChange + yearlyChangeAdjustment).toFixed(2));
  const yearlyChangePercentage = Number(((yearlyChange / totalValue) * 100).toFixed(2));
  
  return {
    totalValue,
    dailyChange,
    dailyChangePercentage,
    monthlyChange,
    monthlyChangePercentage,
    yearlyChange,
    yearlyChangePercentage,
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Formats a date object to a readable time string
 * @param {Date} date - Date object
 * @returns {string} Formatted time string
 */
export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) {
    return 'just now';
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};
