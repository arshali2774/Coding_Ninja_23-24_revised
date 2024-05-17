import { useLanguage } from './languageContext';
import { useTheme } from './themeContext';

export const Navbar = () => {
  // get theme and lanauge contexts here
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  return (
    <div className='navbar'>
      <span>Dialecto</span>
      <div className='right'>
        {/* add eventListerner to it also change the content of the button based on the theme */}
        <button onClick={toggleTheme}>
          {' '}
          {theme === 'light' ? 'dark theme' : 'light theme'}
        </button>
        <span>{language}</span>
      </div>
    </div>
  );
};
