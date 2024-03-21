import { useState, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext.js';

import './Theme.scss';

const Theme = () => {

    const { theme, saveTheme } = useContext(ThemeContext);
    const [selectedTheme, setSelectedTheme] = useState(theme);

    const handleThemeChange = (e) => {
        const theme = e.target.className;
        setSelectedTheme(theme);
        saveTheme(theme);
    }

    return (
            <form className="theme">
                <legend className="visually-hidden">Pick a Theme</legend>
    
                <label htmlFor="default" className="visually-hidden">default</label>
                <input name="theme" type="radio" id="default"
                    className="default" 
                    checked={selectedTheme === 'default'}
                    onChange={handleThemeChange}
                />
    
                <label htmlFor="orange" className="visually-hidden">orange</label>
                <input name="theme" type="radio" id="orange"
                    className="orange"
                    checked={selectedTheme === 'orange'}
                    onChange={handleThemeChange}
                />
    
                <label htmlFor="green" className="visually-hidden">green</label>
                <input name="theme" type="radio" id="green"
                    className="green"
                    checked={selectedTheme === 'green'}
                    onChange={handleThemeChange}
                />
    
            </form>
        );
}

export default Theme;