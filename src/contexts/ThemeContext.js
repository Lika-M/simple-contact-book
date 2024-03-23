import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const activeTheme = localStorage.getItem('theme');

    const [theme, setTheme] = useState(() => {
        return activeTheme || 'default';
    });

    useEffect(() => {
        if (activeTheme) {
            setTheme(activeTheme);
        }
    }, [])

    const saveTheme = (item) => {
        setTheme(item);
        localStorage.setItem('theme', item);
    };

    return (
        <ThemeContext.Provider value={{ theme, saveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}