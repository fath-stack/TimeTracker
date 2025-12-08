/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f6ff',
          500: '#2563eb',
        }
      }
    },
  },
  plugins: [],
};
