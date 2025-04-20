import React from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import DataUpdateControls from '../components/ui/DataUpdateControls';
import { useTheme } from '../context/ThemeContext';
import { useMarketData } from '../context/MarketDataContext';
import { portfolioAllocation } from '../data/stocksData';

const Portfolio = () => {
  const { isDarkMode } = useTheme();
  const { stocksData } = useMarketData();

  // Calculate total portfolio value
  const totalValue = stocksData.reduce((sum, stock) => sum + stock.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 mb-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold"
        >
          Portfolio
        </motion.h1>

        <DataUpdateControls showTimeRange={false} />
      </div>

      {/* Portfolio overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Holdings"
          className="lg:col-span-2"
          padding="p-5"
          delay={1}
        >
          <div className="overflow-x-auto">
            <table className={`w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <thead>
                <tr className={`${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-b`}>
                  <th className="text-left py-3 font-medium">Symbol</th>
                  <th className="text-left py-3 font-medium">Name</th>
                  <th className="text-right py-3 font-medium">Price</th>
                  <th className="text-right py-3 font-medium">Change</th>
                  <th className="text-right py-3 font-medium">Shares</th>
                  <th className="text-right py-3 font-medium">Value</th>
                  <th className="text-right py-3 font-medium">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {stocksData.map((stock) => {
                  const allocation = ((stock.value / totalValue) * 100).toFixed(2);
                  const isPositive = stock.change >= 0;

                  return (
                    <tr
                      key={stock.id}
                      className={`${isDarkMode ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}
                    >
                      <td className="py-3 font-medium">{stock.symbol}</td>
                      <td className="py-3">{stock.name}</td>
                      <td className="py-3 text-right">${stock.price.toLocaleString()}</td>
                      <td className={`py-3 text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercentage.toFixed(2)}%)
                      </td>
                      <td className="py-3 text-right">{stock.shares}</td>
                      <td className="py-3 text-right font-medium">${stock.value.toLocaleString()}</td>
                      <td className="py-3 text-right">{allocation}%</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className={`font-bold ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <td colSpan={5} className="py-3 text-right">Total</td>
                  <td className="py-3 text-right">${totalValue.toLocaleString()}</td>
                  <td className="py-3 text-right">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        <Card
          title="Allocation"
          padding="p-5"
          delay={2}
        >
          <div className="h-80">
            <PieChart
              data={portfolioAllocation}
              height={320}
            />
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-medium mb-3">Allocation Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioAllocation.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors overflow-hidden`}
                >
                  <div className="flex items-center min-w-0 flex-1 mr-3">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 mr-3" style={{ backgroundColor: item.color }}></div>
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} truncate`}>{item.name}</span>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="font-medium whitespace-nowrap">{item.value}%</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">${((item.value / 100) * totalValue).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Stock performance */}
      <Card
        title="Stock Performance"
        padding="p-5"
        delay={3}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stocksData.slice(0, 4).map((stock, index) => (
            <div key={stock.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{stock.symbol}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stock.name}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">${stock.price.toLocaleString()}</div>
                  <div className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercentage.toFixed(2)}%)
                  </div>
                </div>
              </div>

              <div className="h-40">
                <LineChart
                  data={stock.history}
                  dataKey="price"
                  xAxisKey="date"
                  color={stock.color}
                  height={160}
                  showGrid={true}
                  showTooltip={true}
                  showXAxis={true}
                  showYAxis={true}
                  animate={false}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Portfolio;
