import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import LineChart from '../charts/LineChart';

const StockCard = ({ stock, index = 0 }) => {
  const { isDarkMode } = useTheme();
  const isPositive = stock.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`rounded-xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stock.name}</p>
          </div>
          <div className="text-right">
            <div className="font-bold">${stock.price.toLocaleString()}</div>
            <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercentage.toFixed(2)}%)
            </div>
          </div>
        </div>

        <div className="h-20 -mx-1 -mb-1">
          <LineChart
            data={stock.dailyData}
            dataKey="price"
            xAxisKey="time"
            color={isPositive ? '#34C759' : '#FF3B30'}
            height={80}
            showGrid={false}
            showTooltip={false}
            showXAxis={false}
            showYAxis={false}
            animate={false}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StockCard;
