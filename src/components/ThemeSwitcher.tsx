export const ThemeSwitcher = () => {
    const toggleTheme = () => {
        const themes = ['light', 'dark', 'warm'];
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        document.documentElement.setAttribute('data-theme', nextTheme);
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="text-sm font-semibold text-gray-700 hover:text-[var(--brand-color)] px-3 py-1 border rounded-full transition-colors"
        >
            Switch Theme
        </button>
    );
};
