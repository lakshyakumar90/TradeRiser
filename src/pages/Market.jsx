import React from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import LineChart from '../components/charts/LineChart';
import DataUpdateControls from '../components/ui/DataUpdateControls';
import { useTheme } from '../context/ThemeContext';
import { useMarketData } from '../context/MarketDataContext';
import { watchlistData } from '../data/stocksData';

const Market = () => {
  const { isDarkMode } = useTheme();
  const { marketIndices } = useMarketData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 mb-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold"
        >
          Market Overview
        </motion.h1>

        <DataUpdateControls showTimeRange={false} />
      </div>

      {/* Market indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketIndices.map((index, i) => (
          <Card key={index.id} padding="p-4" delay={i}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{index.name}</h3>
              <div className={index.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.change >= 0 ? '+' : ''}{index.changePercentage.toFixed(2)}%)
              </div>
            </div>
            <div className="text-2xl font-bold mb-3">{index.value.toLocaleString()}</div>
            <div className="h-32">
              <LineChart
                data={index.history}
                dataKey="value"
                xAxisKey="date"
                color={index.change >= 0 ? '#34C759' : '#FF3B30'}
                height={128}
                showGrid={true}
                showTooltip={true}
                showXAxis={true}
                showYAxis={true}
                animate={false}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Market trends */}
      <Card
        title="Market Trends"
        padding="p-5"
        delay={3}
      >
        <div className="h-80">
          <LineChart
            data={marketIndices[0].history.map((item, index) => ({
              date: item.date,
              'S&P 500': marketIndices[0].history[index].value,
              'NASDAQ': marketIndices[1].history[index].value / 3.2, // Scaled for visualization
              'Dow Jones': marketIndices[2].history[index].value / 7.7, // Scaled for visualization
            }))}
            dataKey="S&P 500"
            xAxisKey="date"
            color="#5856D6"
            height={320}
          />
        </div>
      </Card>

      {/* Watchlist */}
      <Card
        title="Watchlist"
        subtitle="Stocks you're monitoring"
        padding="p-5"
        delay={4}
        action={
          <button className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
            <i className='bx bx-plus mr-1'></i>
            Add
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className={`w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <thead>
              <tr className={`${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-b`}>
                <th className="text-left py-3 font-medium">Symbol</th>
                <th className="text-left py-3 font-medium">Name</th>
                <th className="text-right py-3 font-medium">Price</th>
                <th className="text-right py-3 font-medium">Change</th>
                <th className="text-right py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlistData.map((stock) => {
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
                    <td className="py-3 text-right">
                      <button className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} transition-colors mr-2`}>
                        Buy
                      </button>
                      <button className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                        <i className='bx bx-x'></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Market news */}
      <Card
        title="Market News"
        padding="p-5"
        delay={5}
      >
        <div className="space-y-4">
          {[
            {
              title: "Fed Signals Potential Rate Cut in Coming Months",
              source: "Financial Times",
              time: "2 hours ago",
              image: "https://placehold.co/100x60?text=News"
            },
            {
              title: "Tech Stocks Rally as Inflation Concerns Ease",
              source: "Wall Street Journal",
              time: "4 hours ago",
              image: "https://placehold.co/100x60?text=News"
            },
            {
              title: "Global Markets React to Economic Data Release",
              source: "Bloomberg",
              time: "6 hours ago",
              image: "https://placehold.co/100x60?text=News"
            }
          ].map((news, index) => (
            <div key={index} className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
              <img src={news.image} alt={news.title} className="w-[100px] h-[60px] rounded object-cover mr-4" />
              <div>
                <h3 className="font-medium">{news.title}</h3>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {news.source} • {news.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Market;
