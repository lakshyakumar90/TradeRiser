/**
 * Theme utility functions and constants for enhanced dark and light modes
 */

// Enhanced color palette for light mode
export const lightThemeColors = {
  // Background colors
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    tertiary: 'bg-gray-100',
    elevated: 'bg-white shadow-sm',
    card: 'bg-white',
    input: 'bg-white',
    hover: 'hover:bg-gray-50',
    active: 'active:bg-gray-100',
    selected: 'bg-gray-100',
  },

  // Text colors
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    tertiary: 'text-gray-500',
    quaternary: 'text-gray-400',
    disabled: 'text-gray-300',
    inverse: 'text-white',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  },

  // Border colors
  border: {
    primary: 'border-gray-200',
    secondary: 'border-gray-300',
    tertiary: 'border-gray-100',
    focus: 'focus:border-blue-500',
    error: 'border-red-300',
    success: 'border-green-300',
  },

  // Shadow styles
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-md',
    xl: 'shadow-lg',
    inner: 'shadow-inner',
    none: 'shadow-none',
    highlight: 'shadow-[0_0_0_2px_rgba(59,130,246,0.3)]',
  },

  // Ring styles for focus states
  ring: {
    focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    error: 'focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
    success: 'focus:ring-2 focus:ring-green-500 focus:ring-opacity-50',
  },
};

// Enhanced color palette for dark mode
export const darkThemeColors = {
  // Background colors
  background: {
    primary: 'bg-gray-950',
    secondary: 'bg-gray-900',
    tertiary: 'bg-gray-800',
    elevated: 'bg-gray-900 shadow-md shadow-black/30',
    card: 'bg-gray-900',
    input: 'bg-gray-800',
    hover: 'hover:bg-gray-800',
    active: 'active:bg-gray-700',
    selected: 'bg-gray-800',
  },

  // Text colors
  text: {
    primary: 'text-gray-50',
    secondary: 'text-gray-200',
    tertiary: 'text-gray-300',
    quaternary: 'text-gray-400',
    disabled: 'text-gray-500',
    inverse: 'text-gray-900',
    error: 'text-red-300',
    success: 'text-green-300',
    warning: 'text-amber-300',
    info: 'text-blue-300',
  },

  // Border colors
  border: {
    primary: 'border-gray-800',
    secondary: 'border-gray-700',
    tertiary: 'border-gray-900',
    focus: 'focus:border-blue-400',
    error: 'border-red-800',
    success: 'border-green-800',
  },

  // Shadow styles
  shadow: {
    sm: 'shadow-sm shadow-black/40',
    md: 'shadow shadow-black/40',
    lg: 'shadow-md shadow-black/40',
    xl: 'shadow-lg shadow-black/40',
    inner: 'shadow-inner shadow-black/20',
    none: 'shadow-none',
    highlight: 'shadow-[0_0_0_2px_rgba(96,165,250,0.6)]',
  },

  // Ring styles for focus states
  ring: {
    focus: 'focus:ring-2 focus:ring-blue-400 focus:ring-opacity-80',
    error: 'focus:ring-2 focus:ring-red-400 focus:ring-opacity-80',
    success: 'focus:ring-2 focus:ring-green-400 focus:ring-opacity-80',
  },
};

/**
 * Get theme classes based on the current theme mode
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @param {string} component - The component type to get classes for
 * @param {string} variant - The variant of the component
 * @returns {string} The appropriate classes for the current theme
 */
export const getThemeClasses = (isDarkMode, component, variant = 'default') => {
  const themeColors = isDarkMode ? darkThemeColors : lightThemeColors;

  // Component-specific theme classes
  const componentClasses = {
    // Card component
    card: {
      default: `${themeColors.background.card} ${themeColors.border.primary} border rounded-lg`,
      elevated: `${themeColors.background.card} ${themeColors.shadow.md} rounded-lg`,
      flat: `${themeColors.background.secondary} rounded-lg`,
    },

    // Button component
    button: {
      primary: `${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`,
      secondary: `${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`,
      outline: `border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`,
      danger: `${isDarkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'} text-white`,
      success: `${isDarkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white`,
    },

    // Input component
    input: {
      default: `${themeColors.background.input} ${themeColors.border.secondary} ${themeColors.text.primary} ${themeColors.ring.focus} border rounded-lg`,
      error: `${themeColors.background.input} ${themeColors.border.error} ${themeColors.text.primary} ${themeColors.ring.error} border rounded-lg`,
      success: `${themeColors.background.input} ${themeColors.border.success} ${themeColors.text.primary} ${themeColors.ring.success} border rounded-lg`,
    },

    // Table component
    table: {
      header: `${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`,
      row: `${isDarkMode ? 'border-gray-800 hover:bg-gray-900' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`,
      cell: `${isDarkMode ? 'text-gray-200' : 'text-gray-700'} py-3`,
    },

    // Navigation component
    nav: {
      active: `${isDarkMode ? 'bg-gray-900 text-blue-300' : 'bg-blue-50 text-blue-700'}`,
      inactive: `${isDarkMode ? 'text-gray-200 hover:bg-gray-900' : 'text-gray-700 hover:bg-gray-100'}`,
    },

    // Section component
    section: {
      default: `${themeColors.background.primary} p-6 rounded-lg`,
      bordered: `${themeColors.background.primary} ${themeColors.border.primary} border p-6 rounded-lg`,
    },
  };

  return componentClasses[component]?.[variant] || '';
};

/**
 * Get color classes for a specific color scheme
 * @param {string} colorScheme - The color scheme name
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {Object} Color classes for the specified scheme
 */
export const getColorSchemeClasses = (colorScheme, isDarkMode) => {
  const colorSchemes = {
    blue: {
      primary: isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white',
      light: isDarkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-700',
      border: isDarkMode ? 'border-blue-600' : 'border-blue-200',
      hover: isDarkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-600',
      text: isDarkMode ? 'text-blue-300' : 'text-blue-600',
      focus: isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500',
    },
    green: {
      primary: isDarkMode ? 'bg-green-500 text-white' : 'bg-green-500 text-white',
      light: isDarkMode ? 'bg-green-900/40 text-green-300' : 'bg-green-50 text-green-700',
      border: isDarkMode ? 'border-green-600' : 'border-green-200',
      hover: isDarkMode ? 'hover:bg-green-600' : 'hover:bg-green-600',
      text: isDarkMode ? 'text-green-300' : 'text-green-600',
      focus: isDarkMode ? 'focus:ring-green-400' : 'focus:ring-green-500',
    },
    red: {
      primary: isDarkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white',
      light: isDarkMode ? 'bg-red-900/40 text-red-300' : 'bg-red-50 text-red-700',
      border: isDarkMode ? 'border-red-600' : 'border-red-200',
      hover: isDarkMode ? 'hover:bg-red-600' : 'hover:bg-red-600',
      text: isDarkMode ? 'text-red-300' : 'text-red-600',
      focus: isDarkMode ? 'focus:ring-red-400' : 'focus:ring-red-500',
    },
    purple: {
      primary: isDarkMode ? 'bg-purple-500 text-white' : 'bg-purple-500 text-white',
      light: isDarkMode ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-50 text-purple-700',
      border: isDarkMode ? 'border-purple-600' : 'border-purple-200',
      hover: isDarkMode ? 'hover:bg-purple-600' : 'hover:bg-purple-600',
      text: isDarkMode ? 'text-purple-300' : 'text-purple-600',
      focus: isDarkMode ? 'focus:ring-purple-400' : 'focus:ring-purple-500',
    },
    orange: {
      primary: isDarkMode ? 'bg-orange-500 text-white' : 'bg-orange-500 text-white',
      light: isDarkMode ? 'bg-orange-900/40 text-orange-300' : 'bg-orange-50 text-orange-700',
      border: isDarkMode ? 'border-orange-600' : 'border-orange-200',
      hover: isDarkMode ? 'hover:bg-orange-600' : 'hover:bg-orange-600',
      text: isDarkMode ? 'text-orange-300' : 'text-orange-600',
      focus: isDarkMode ? 'focus:ring-orange-400' : 'focus:ring-orange-500',
    },
  };

  return colorSchemes[colorScheme] || colorSchemes.blue;
};
