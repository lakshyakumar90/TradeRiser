import React, { useState } from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { transactionsData } from '../data/stocksData';

const Transactions = () => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState('all'); // 'all', 'buy', 'sell'
  
  const filteredTransactions = filter === 'all' 
    ? transactionsData 
    : transactionsData.filter(transaction => transaction.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold"
        >
          Transactions
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex space-x-2"
        >
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' 
                ? isDarkMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-600 text-white'
                : isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('buy')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'buy' 
                ? isDarkMode 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-600 text-white'
                : isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Buy
          </button>
          <button 
            onClick={() => setFilter('sell')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'sell' 
                ? isDarkMode 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-600 text-white'
                : isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sell
          </button>
        </motion.div>
      </div>
      
      <Card padding="p-5" delay={1}>
        <div className="overflow-x-auto">
          <table className={`w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <thead>
              <tr className={`${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-b`}>
                <th className="text-left py-3 font-medium">Date</th>
                <th className="text-left py-3 font-medium">Type</th>
                <th className="text-left py-3 font-medium">Symbol</th>
                <th className="text-left py-3 font-medium">Name</th>
                <th className="text-right py-3 font-medium">Price</th>
                <th className="text-right py-3 font-medium">Shares</th>
                <th className="text-right py-3 font-medium">Total</th>
                <th className="text-right py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <motion.tr 
                  key={transaction.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${isDarkMode ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}
                >
                  <td className="py-3">{transaction.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'buy' 
                        ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                        : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type === 'buy' ? 'Buy' : 'Sell'}
                    </span>
                  </td>
                  <td className="py-3 font-medium">{transaction.symbol}</td>
                  <td className="py-3">{transaction.name}</td>
                  <td className="py-3 text-right">${transaction.price.toFixed(2)}</td>
                  <td className="py-3 text-right">{transaction.shares}</td>
                  <td className="py-3 text-right font-medium">${transaction.total.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="py-8 text-center">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No transactions found.</p>
          </div>
        )}
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          title="Transaction Summary" 
          padding="p-5"
          delay={2}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Transactions</span>
              <span className="font-medium">{transactionsData.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Buy Transactions</span>
              <span className="font-medium">{transactionsData.filter(t => t.type === 'buy').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sell Transactions</span>
              <span className="font-medium">{transactionsData.filter(t => t.type === 'sell').length}</span>
            </div>
            <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} pt-4`}>
              <div className="flex justify-between items-center">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Buy Amount</span>
                <span className="font-medium">
                  ${transactionsData
                    .filter(t => t.type === 'buy')
                    .reduce((sum, t) => sum + t.total, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Sell Amount</span>
                <span className="font-medium">
                  ${transactionsData
                    .filter(t => t.type === 'sell')
                    .reduce((sum, t) => sum + t.total, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card 
          title="Recent Activity" 
          padding="p-5"
          delay={3}
        >
          <div className="space-y-4">
            {transactionsData.slice(0, 4).map((transaction) => (
              <div 
                key={transaction.id} 
                className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <div className={`p-3 rounded-full mr-3 ${
                  transaction.type === 'buy' 
                    ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                    : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                }`}>
                  <i className={`bx ${transaction.type === 'buy' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} text-xl`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.symbol}
                    </span>
                    <span className="font-medium">${transaction.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {transaction.shares} shares at ${transaction.price.toFixed(2)}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
