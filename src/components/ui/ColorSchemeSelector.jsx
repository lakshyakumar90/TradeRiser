import React from 'react';
import { motion } from 'motion/react';
import { useColorScheme } from '../../context/ColorSchemeContext';
import { useTheme } from '../../context/ThemeContext';

const ColorSchemeSelector = () => {
  const { colorScheme, changeColorScheme, colorSchemes } = useColorScheme();
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {Object.keys(colorSchemes).map((scheme) => {
          const isActive = colorScheme === scheme;
          const schemeData = colorSchemes[scheme];

          return (
            <motion.button
              key={scheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeColorScheme(scheme)}
              className={`relative flex flex-col items-center space-y-2 p-3 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              aria-label={`Switch to ${schemeData.name} theme`}
            >
              <div className={`w-12 h-12 rounded-full ${schemeData.bgClass} ${isActive ? 'ring-2 ring-offset-2 ' + (isDarkMode ? 'ring-white ring-offset-gray-900' : 'ring-gray-800 ring-offset-white') : ''}`}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-full"
                  >
                    <i className="bx bx-check text-white text-xl"></i>
                  </motion.div>
                )}
              </div>
              <span className={`text-xs font-medium capitalize ${isActive ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                {scheme}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSchemeSelector;
