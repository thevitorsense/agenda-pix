/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FD3A73',
        secondary: '#FF655B',
        accent: '#FD3A73',
        'accent-dark': '#E31B23',
        'accent-light': '#FF655B',
        dark: {
          100: '#4A4A4A',
          200: '#3D3D3D',
          300: '#2D2D2D',
          400: '#1C1C1C',
          500: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
