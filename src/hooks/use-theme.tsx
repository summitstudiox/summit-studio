import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

// Keep in sync with the inline anti-flash script in __root.tsx.
const STORAGE_KEY = "theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always starts as "dark" on both server and the first client render pass —
  // matching the SSR output avoids a hydration mismatch. The real value (set
  // synchronously on <html> by the inline anti-flash script) is read into
  // state after mount, which is a normal post-hydration update, not part of
  // the hydration diff.
  const [theme, setTheme] = useState<Theme>("dark");
  const skipNextPersist = useRef(true);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    // The first run just mirrors what the inline script already applied —
    // skip it so a plain page visit doesn't pin the system preference into
    // localStorage before the user has ever touched the toggle.
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage can throw in private-browsing/blocked-storage contexts — theme just won't persist.
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
