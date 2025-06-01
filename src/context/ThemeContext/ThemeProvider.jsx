<<<<<<< HEAD
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark-mode');

  // System theme detection on first load
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme');
=======
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark-mode");

  // System theme detection on first load
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
>>>>>>> 14d337447c140543ba27993b3505e7e10dca098f
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
<<<<<<< HEAD
        '(prefers-color-scheme: dark)'
      ).matches;
      const defaultTheme = prefersDark ? 'dark-mode' : 'light-mode';
=======
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDark ? "dark-mode" : "light-mode";
>>>>>>> 14d337447c140543ba27993b3505e7e10dca098f
      setTheme(defaultTheme);
      document.documentElement.classList.add(defaultTheme);
    }
  }, []);

  // Apply theme on change
  useEffect(() => {
    const root = document.documentElement;
<<<<<<< HEAD
    root.classList.remove('light-mode', 'dark-mode', 'red-mode');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  const setRedMode = () => setTheme('red-mode');
=======
    root.classList.remove("light-mode", "dark-mode", "red-mode");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light-mode" ? "dark-mode" : "light-mode"));
  };

  const setRedMode = () => setTheme("red-mode");
>>>>>>> 14d337447c140543ba27993b3505e7e10dca098f

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setRedMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
