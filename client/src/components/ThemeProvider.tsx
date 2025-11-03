import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage after component mounts
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || saved === "light") {
          setTheme(saved);
        }
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save theme and update DOM when theme changes
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("theme", theme);
      }
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
    
    try {
      if (typeof document !== "undefined" && document.documentElement) {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    } catch (error) {
      console.warn("Failed to update theme class:", error);
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
