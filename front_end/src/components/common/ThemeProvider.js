import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeProvider = () => {
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'
    const lightTheme = {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        // ... other properties specific to your application's styling
      };
      
      const darkTheme = {
        backgroundColor: '#000000',
        textColor: '#ffffff',
        // ... other properties specific to your application's styling
      };
      
    // Your theme-related logic goes here
  
    return (
      <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    );
  };
export default ThemeProvider