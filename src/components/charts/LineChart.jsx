import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

const LineChart = ({ data, dataKey = 'price', xAxisKey = 'date', color = '#5856D6', height = 300, showGrid = true, showTooltip = true, showXAxis = true, showYAxis = true, animate = true }) => {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? '#A0AEC0' : '#4A5568';
  const gridColor = isDarkMode ? '#2D3748' : '#E2E8F0';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-2 rounded shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="font-medium" style={{ color }}>
              {dataKey === 'price' ? '$' : ''}{payload[0].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />}

          {showXAxis && (
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
            />
          )}

          {showYAxis && (
            <YAxis
              tick={{ fill: textColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => dataKey === 'price' ? `$${value}` : value}
            />
          )}

          {showTooltip && <Tooltip content={<CustomTooltip />} />}

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: isDarkMode ? '#1A202C' : '#FFFFFF' }}
            animationDuration={1500}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LineChart;
