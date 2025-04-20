import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightThemeColors, darkThemeColors, getThemeClasses, getColorSchemeClasses } from '../utils/themeUtils';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem('theme');
    // Check if user has a system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Return true if saved theme is dark or if no saved theme and system prefers dark
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  const [themeColors, setThemeColors] = useState(
    isDarkMode ? darkThemeColors : lightThemeColors
  );

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Update document class for Tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
      setThemeColors(darkThemeColors);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
      setThemeColors(lightThemeColors);
    }

    // Apply theme colors to CSS variables for global access
    applyThemeColors();
  }, [isDarkMode]);

  // Apply theme colors to CSS variables
  const applyThemeColors = () => {
    const colors = isDarkMode ? darkThemeColors : lightThemeColors;
    const root = document.documentElement;

    // Set background colors
    root.style.setProperty('--bg-primary', isDarkMode ? '#111827' : '#ffffff');
    root.style.setProperty('--bg-secondary', isDarkMode ? '#1f2937' : '#f9fafb');
    root.style.setProperty('--bg-tertiary', isDarkMode ? '#374151' : '#f3f4f6');

    // Set text colors
    root.style.setProperty('--text-primary', isDarkMode ? '#ffffff' : '#111827');
    root.style.setProperty('--text-secondary', isDarkMode ? '#e5e7eb' : '#374151');
    root.style.setProperty('--text-tertiary', isDarkMode ? '#9ca3af' : '#6b7280');

    // Set border colors
    root.style.setProperty('--border-primary', isDarkMode ? '#374151' : '#e5e7eb');
    root.style.setProperty('--border-secondary', isDarkMode ? '#4b5563' : '#d1d5db');
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Get theme classes for a component
  const getComponentClasses = (component, variant = 'default') => {
    return getThemeClasses(isDarkMode, component, variant);
  };

  // Get color scheme classes
  const getSchemeClasses = (colorScheme) => {
    return getColorSchemeClasses(colorScheme, isDarkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        themeColors,
        getComponentClasses,
        getSchemeClasses
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
