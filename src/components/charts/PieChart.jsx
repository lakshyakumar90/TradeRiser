import React, { useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useColorScheme } from '../../context/ColorSchemeContext';

const PieChart = ({ data, dataKey = 'value', nameKey = 'name', height = 300, animate = true, showLegend = true }) => {
  const { isDarkMode } = useTheme();
  const { colorScheme, colorSchemes } = useColorScheme();
  const [activeIndex, setActiveIndex] = useState(-1);

  const textColor = isDarkMode ? '#A0AEC0' : '#4A5568';
  const currentScheme = colorSchemes[colorScheme];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} max-w-[200px]`}>
          <p className="font-medium text-base mb-1 truncate" title={payload[0].name}>{payload[0].name}</p>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full flex-shrink-0 mr-2" style={{ backgroundColor: payload[0].color }}></div>
            <p className="text-sm">
              <span className="font-medium whitespace-nowrap">
                {payload[0].value}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderActiveShape = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={isDarkMode ? "#E2E8F0" : "#4A5568"} fontSize={14} fontWeight="bold">
          {`${payload.name.length > 12 ? payload.name.substring(0, 12) + '...' : payload.name}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={isDarkMode ? "#A0AEC0" : "#718096"} fontSize={12}>
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.95 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height }}
      className="relative"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            outerRadius={80}
            innerRadius={30}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            animationDuration={1500}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={isDarkMode ? '#1A202C' : '#FFFFFF'}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconSize={10}
              iconType="circle"
              formatter={(value) => {
                // Truncate long names in the legend
                const displayValue = value.length > 15 ? `${value.substring(0, 15)}...` : value;
                return (
                  <span
                    style={{ color: textColor, fontSize: '0.875rem' }}
                    title={value} // Show full name on hover
                  >
                    {displayValue}
                  </span>
                );
              }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PieChart;
