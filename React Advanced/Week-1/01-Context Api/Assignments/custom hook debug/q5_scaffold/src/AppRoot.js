import App from "./App";
import { LanguageContextProvider } from "./languageContext";
import { ThemeContextProvider } from "./themeContext";

const AppRoot = () => (
  <ThemeContextProvider>
    <LanguageContextProvider>
      <App />
    </LanguageContextProvider>
  </ThemeContextProvider>
);

export default AppRoot;
