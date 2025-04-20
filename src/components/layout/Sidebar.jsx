import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useColorScheme } from '../../context/ColorSchemeContext';

const Sidebar = ({ isMobileMenuOpen, closeMobileMenu }) => {
  const { isDarkMode, themeColors, getSchemeClasses } = useTheme();
  const { colorScheme, colorSchemes } = useColorScheme();
  const currentScheme = colorSchemes[colorScheme];
  const schemeClasses = getSchemeClasses(colorScheme);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'grid-alt' },
    { path: '/portfolio', label: 'Portfolio', icon: 'pie-chart-alt-2' },
    { path: '/market', label: 'Market', icon: 'trending-up' },
    { path: '/transactions', label: 'Transactions', icon: 'receipt' },
    { path: '/notifications', label: 'Notifications', icon: 'bell' },
    { path: '/data', label: 'Live Data', icon: 'line-chart' },
    { path: '/settings', label: 'Settings', icon: 'cog' },
  ];

  const sidebarClasses = `
    fixed top-0 left-0 z-40 h-screen transition-transform
    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 w-64
    ${isDarkMode ? themeColors.background.primary : 'bg-white'} ${isDarkMode ? themeColors.text.primary : 'text-gray-800'}
    border-r ${isDarkMode ? themeColors.border.primary : 'border-gray-200'}
  `;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="h-full px-3 py-4 flex flex-col">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center mb-8 px-2 py-4 hover:opacity-80 transition-opacity">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold"
            >
              <span className={currentScheme.textClass}>Trade</span>
              <span className={`ml-1 text-${currentScheme.secondary}-500`}>Riser</span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <ul className="space-y-2 flex-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-lg group transition-all duration-200
                    ${isActive
                      ? isDarkMode
                        ? schemeClasses.light
                        : `bg-${currentScheme.primary}-100 text-${currentScheme.primary}-700`
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => {
                    if (isMobileMenuOpen) closeMobileMenu();
                  }}
                >
                  <i className={`bx bx-${item.icon} text-xl mr-3`}></i>
                  <span>{item.label}</span>

                  {/* Active indicator */}
                  {({ isActive }) => isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute left-0 w-1 h-8 ${schemeClasses.primary} rounded-r-md`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* User profile */}
          <Link
            to="/profile"
            className={`mt-auto p-3 rounded-lg enhanced-glass ${isDarkMode ? themeColors.background.hover : 'hover:bg-gray-200'} transition-colors`}
          >
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">Alex Johnson</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Premium Plan</div>
              </div>
              <i className={`bx bx-chevron-right ml-auto ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}></i>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
