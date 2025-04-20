import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useColorScheme } from '../../context/ColorSchemeContext';

const Card = ({
  children,
  title,
  subtitle,
  icon,
  action,
  className = '',
  padding = 'p-4',
  animate = true,
  delay = 0
}) => {
  const { isDarkMode, getComponentClasses } = useTheme();
  const { colorScheme, colorSchemes } = useColorScheme();
  const currentScheme = colorSchemes[colorScheme];

  // Get card classes based on theme
  const cardClasses = getComponentClasses('card', 'elevated');

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className={`card card-hover ${cardClasses} ${className}`}
    >
      {(title || action) && (
        <div className={`flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} ${padding}`}>
          <div className="flex items-center">
            {icon && (
              <div className={`mr-3 text-xl ${currentScheme.textClass}`}>
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className="font-medium text-base">{title}</h3>}
              {subtitle && <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={padding}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
