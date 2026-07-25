import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

import PropTypes from "prop-types";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. If user previously selected a theme, use it
    if (localStorage.theme) return localStorage.theme;

    // 2. Otherwise, default strictly to 'dark' (ignore OS preferences completely)
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Apply Tailwind dark class
    root.classList.toggle("dark", theme === "dark");

    // Apply DaisyUI theme attribute
    root.setAttribute("data-theme", theme === "dark" ? "dark" : "light");

    localStorage.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
