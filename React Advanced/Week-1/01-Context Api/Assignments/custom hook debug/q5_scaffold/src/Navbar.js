import { getLanguageValue, useLanguageValue } from './languageContext';
import { getThemeValue, useThemeValue } from './themeContext';

export const Navbar = () => {
  const { theme, setTheme } = useThemeValue();
  const { language } = useLanguageValue();

  const changeTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <div className='navbar'>
      <span>Dialecto</span>
      <div className='right'>
        <button onClick={changeTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
        <span>{language}</span>
      </div>
    </div>
  );
};
