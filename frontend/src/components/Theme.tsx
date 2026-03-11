import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProps {
    children: ReactNode;
}

export function Theme({ children }: ThemeProps) {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored) setTheme(stored as Theme);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a Theme provider");
    return context;
};