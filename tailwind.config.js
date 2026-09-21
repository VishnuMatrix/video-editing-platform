/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "bg-primary": "#090a0e",
        "text-primary": "#f5f5f5",
        accent: "#38bdf8",
      },
    },
  },

  plugins: [],
};
