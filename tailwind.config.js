/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Noto Naskh Arabic', 'serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '6rem',
      },
    },
    extend: {
      colors: {
        'primary-blue': '#1976d2',
        'light-blue': '#039be5',
        'dark-blue': '#1157b2',
      },
    },
  },
  plugins: [],
}

