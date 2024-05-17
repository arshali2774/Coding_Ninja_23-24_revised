import './styles.css';
import { useContext, useState } from 'react';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { ThemeContext, ThemeProvider, useTheme } from './themeContext';
import { LanguageProvider } from './languageContext';

// get theme and language contexts here
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <Home />
    </div>
  );
};
