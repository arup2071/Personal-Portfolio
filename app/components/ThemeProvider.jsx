"use client";
import Swal from "sweetalert2";
import React, { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    // Default: match system
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 