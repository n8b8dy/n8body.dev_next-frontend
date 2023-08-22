/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '8.5xl': '104px',
      },
      backgroundColor: {
        material: '#121212',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pointDown: 'pointDown 4s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pointDown: {
          '0%, 30%': { transform: 'translate(0, 0)' },
          '15%': { transform: 'translate(0, 8px)' },
        },
      },
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [],
}
