import React, { useState } from "react";
import { motion } from "motion/react";
import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import StockCard from "../components/ui/StockCard";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import DataUpdateControls from "../components/ui/DataUpdateControls";
import { useTheme } from "../context/ThemeContext";
import { useMarketData } from "../context/MarketDataContext";
import { portfolioAllocation } from "../data/stocksData";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const {
    stocksData,
    marketIndices,
    portfolioSummary
  } = useMarketData();

  const [timeRange, setTimeRange] = useState('1y');

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold"
        >
          Financial Dashboard
        </motion.h1>

        <DataUpdateControls />

        <div className="flex items-center">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="1d">1 Day</option>
            <option value="1w">1 Week</option>
            <option value="1m">1 Month</option>
            <option value="3m">3 Months</option>
            <option value="1y">1 Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Value"
          value={`$${portfolioSummary.totalValue.toLocaleString()}`}
          change={portfolioSummary.dailyChange}
          changePercentage={portfolioSummary.dailyChangePercentage}
          icon={<i className="bx bx-wallet text-xl"></i>}
          color="blue"
          index={0}
        />
        <StatCard
          title="Daily Change"
          value={`$${portfolioSummary.dailyChange.toLocaleString()}`}
          change={portfolioSummary.dailyChange}
          changePercentage={portfolioSummary.dailyChangePercentage}
          icon={<i className="bx bx-line-chart text-xl"></i>}
          color="green"
          index={1}
        />
        <StatCard
          title="Monthly Change"
          value={`$${portfolioSummary.monthlyChange.toLocaleString()}`}
          change={portfolioSummary.monthlyChange}
          changePercentage={portfolioSummary.monthlyChangePercentage}
          icon={<i className="bx bx-calendar text-xl"></i>}
          color="purple"
          index={2}
        />
        <StatCard
          title="Yearly Change"
          value={`$${portfolioSummary.yearlyChange.toLocaleString()}`}
          change={portfolioSummary.yearlyChange}
          changePercentage={portfolioSummary.yearlyChangePercentage}
          icon={<i className="bx bx-trending-up text-xl"></i>}
          color="orange"
          index={3}
        />
      </div>

      {/* Main chart and allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Portfolio Performance"
          className="lg:col-span-2"
          padding="p-5"
          delay={1}
        >
          <div className="h-80">
            <LineChart
              data={stocksData[0].history}
              dataKey="price"
              xAxisKey="date"
              color="#5856D6"
              height={320}
            />
          </div>
        </Card>

        <Card title="Portfolio Allocation" padding="p-5" delay={2}>
          <div className="h-80">
            <PieChart data={portfolioAllocation} height={320} />
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {portfolioAllocation.map((item) => (
              <div
                key={item.name}
                className={`flex items-center p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} overflow-hidden`}
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0 mr-2" style={{ backgroundColor: item.color }}></div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs truncate">{item.name}</span>
                  <span className="font-medium text-sm">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top stocks */}
      <Card
        title="Top Stocks"
        subtitle="Your best performing assets"
        padding="p-5"
        delay={3}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocksData.slice(0, 3).map((stock, index) => (
            <StockCard key={stock.id} stock={stock} index={index} />
          ))}
        </div>
      </Card>

      {/* Market indices */}
      <Card title="Market Indices" padding="p-5" delay={4}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketIndices.map((index) => (
            <div
              key={index.id}
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{index.name}</h3>
                <div
                  className={
                    index.change >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {index.change >= 0 ? "+" : ""}
                  {index.change.toFixed(2)} ({index.change >= 0 ? "+" : ""}
                  {index.changePercentage.toFixed(2)}%)
                </div>
              </div>
              <div className="text-2xl font-bold mb-3">
                {index.value.toLocaleString()}
              </div>
              <div className="h-20 -mx-1">
                <LineChart
                  data={index.history}
                  dataKey="value"
                  xAxisKey="date"
                  color={index.change >= 0 ? "#34C759" : "#FF3B30"}
                  height={80}
                  showGrid={false}
                  showTooltip={false}
                  showXAxis={false}
                  showYAxis={false}
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

export default Dashboard;
