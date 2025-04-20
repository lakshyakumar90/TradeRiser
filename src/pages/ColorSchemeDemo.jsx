import React from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import ColorSchemeSelector from '../components/ui/ColorSchemeSelector';
import { useTheme } from '../context/ThemeContext';
import { useColorScheme } from '../context/ColorSchemeContext';

const ColorSchemeDemo = () => {
  const { isDarkMode } = useTheme();
  const { colorScheme, colorSchemes } = useColorScheme();
  const currentScheme = colorSchemes[colorScheme];

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6"
      >
        Color Scheme Demo
      </motion.h1>
      
      <Card 
        title="Color Scheme Selector" 
        padding="p-5"
        delay={1}
      >
        <div className="space-y-6">
          <p className="mb-4">
            Select a color scheme to customize the appearance of the application:
          </p>
          
          <ColorSchemeSelector />
          
          <div className="mt-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Current color scheme: <span className="font-medium capitalize">{colorScheme}</span>
            </p>
          </div>
        </div>
      </Card>
      
      <Card 
        title="Color Palette" 
        padding="p-5"
        delay={2}
      >
        <div className="space-y-6">
          <p className="mb-4">
            The current color scheme uses the following colors:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`h-16 rounded-lg mb-2 bg-${currentScheme.primary}-500`}></div>
              <p className="font-medium">Primary Color</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentScheme.primary}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`h-16 rounded-lg mb-2 bg-${currentScheme.secondary}-500`}></div>
              <p className="font-medium">Secondary Color</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentScheme.secondary}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`h-16 rounded-lg mb-2 bg-${currentScheme.accent}-500`}></div>
              <p className="font-medium">Accent Color</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentScheme.accent}
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card 
        title="UI Elements" 
        padding="p-5"
        delay={3}
      >
        <div className="space-y-6">
          <p className="mb-4">
            Here's how UI elements look with the current color scheme:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Buttons</h3>
              
              <div className="flex flex-wrap gap-3">
                <button className={`px-4 py-2 rounded-lg bg-${currentScheme.primary}-500 text-white hover:bg-${currentScheme.primary}-600 transition-colors`}>
                  Primary Button
                </button>
                
                <button className={`px-4 py-2 rounded-lg bg-${currentScheme.secondary}-500 text-white hover:bg-${currentScheme.secondary}-600 transition-colors`}>
                  Secondary Button
                </button>
                
                <button className={`px-4 py-2 rounded-lg border ${currentScheme.borderClass} ${currentScheme.textClass} hover:bg-${currentScheme.primary}-50 transition-colors`}>
                  Outline Button
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Form Elements</h3>
              
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Input field"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-${currentScheme.primary}-500 focus:border-${currentScheme.primary}-500`}
                />
                
                <select className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-${currentScheme.primary}-500 focus:border-${currentScheme.primary}-500`}>
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="checkbox-demo"
                    className={`w-4 h-4 text-${currentScheme.primary}-600 rounded focus:ring-${currentScheme.primary}-500`}
                  />
                  <label htmlFor="checkbox-demo" className="ml-2">Checkbox</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-medium mb-3">Text Elements</h3>
            
            <div className="space-y-2">
              <p className={`text-lg font-medium ${currentScheme.textClass}`}>
                This is primary colored text
              </p>
              
              <p className={`text-${currentScheme.secondary}-500`}>
                This is secondary colored text
              </p>
              
              <p>
                This is a paragraph with a <a href="#" className={`${currentScheme.textClass} underline`}>colored link</a> inside.
              </p>
              
              <div className={`p-3 bg-${currentScheme.primary}-100 text-${currentScheme.primary}-800 rounded-lg`}>
                This is an alert box with the primary color.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ColorSchemeDemo;
