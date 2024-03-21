import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('default');

    const getTheme = () => {
       return localStorage.getItem('theme');
    }

    const saveTheme = (item) => {
        setTheme(item);
        localStorage.setItem('theme', item)
    }

    return (
        <ThemeContext.Provider value={{theme, getTheme, saveTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}