/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: '#D97706',
                    50: '#FEF3C7',
                    100: '#FDE68A',
                    light: '#FBBF24',
                },
                ink: {
                    DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
                    light: 'rgb(var(--color-ink-light) / <alpha-value>)',
                },
                inkLight: 'rgb(var(--color-ink-light) / <alpha-value>)',
                canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                borderSubtle: 'rgb(var(--color-border-subtle) / <alpha-value>)',
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #F59E0B, #D97706)',
                'gold-glow': 'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.1) 0%, transparent 70%)',
            },
        },
    },
    plugins: [],
}
