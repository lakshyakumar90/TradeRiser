import React, { createContext, useContext, useState, useEffect } from 'react';

// Available color schemes
export const colorSchemes = {
  blue: {
    name: 'Blue',
    primary: 'blue',
    secondary: 'indigo',
    accent: 'sky',
    bgClass: 'bg-blue-500',
    textClass: 'text-blue-500',
    hoverBgClass: 'hover:bg-blue-600',
    focusRingClass: 'focus:ring-blue-500',
    borderClass: 'border-blue-500',
  },
  purple: {
    name: 'Purple',
    primary: 'purple',
    secondary: 'violet',
    accent: 'fuchsia',
    bgClass: 'bg-purple-500',
    textClass: 'text-purple-500',
    hoverBgClass: 'hover:bg-purple-600',
    focusRingClass: 'focus:ring-purple-500',
    borderClass: 'border-purple-500',
  },
  green: {
    name: 'Green',
    primary: 'green',
    secondary: 'emerald',
    accent: 'lime',
    bgClass: 'bg-green-500',
    textClass: 'text-green-500',
    hoverBgClass: 'hover:bg-green-600',
    focusRingClass: 'focus:ring-green-500',
    borderClass: 'border-green-500',
  },
  orange: {
    name: 'Orange',
    primary: 'orange',
    secondary: 'amber',
    accent: 'yellow',
    bgClass: 'bg-orange-500',
    textClass: 'text-orange-500',
    hoverBgClass: 'hover:bg-orange-600',
    focusRingClass: 'focus:ring-orange-500',
    borderClass: 'border-orange-500',
  },
  red: {
    name: 'Red',
    primary: 'red',
    secondary: 'rose',
    accent: 'pink',
    bgClass: 'bg-red-500',
    textClass: 'text-red-500',
    hoverBgClass: 'hover:bg-red-600',
    focusRingClass: 'focus:ring-red-500',
    borderClass: 'border-red-500',
  },
};

const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(() => {
    // Check if user has previously set a color scheme preference
    const savedColorScheme = localStorage.getItem('colorScheme');
    // Return saved color scheme or default to blue
    return savedColorScheme && colorSchemes[savedColorScheme] 
      ? savedColorScheme 
      : 'blue';
  });

  useEffect(() => {
    // Update localStorage when color scheme changes
    localStorage.setItem('colorScheme', colorScheme);
    
    // Update CSS variables for the color scheme
    const root = document.documentElement;
    const scheme = colorSchemes[colorScheme];
    
    // Set CSS variables for the color scheme
    root.style.setProperty('--color-primary', colorScheme);
    root.style.setProperty('--color-secondary', scheme.secondary);
    root.style.setProperty('--color-accent', scheme.accent);
    
    // Add a data attribute to the html element for CSS selectors
    root.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  const changeColorScheme = (newColorScheme) => {
    if (colorSchemes[newColorScheme]) {
      setColorScheme(newColorScheme);
    }
  };

  return (
    <ColorSchemeContext.Provider value={{ 
      colorScheme, 
      changeColorScheme,
      colorSchemes
    }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
};
