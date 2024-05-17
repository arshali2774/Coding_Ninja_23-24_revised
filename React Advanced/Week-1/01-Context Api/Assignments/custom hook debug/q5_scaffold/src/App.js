import './styles.css';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { useThemeValue } from './themeContext';

export default function App() {
  const { theme } = useThemeValue();

  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <Home />
    </div>
  );
}
