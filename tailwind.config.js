/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'rwanda-green': '#1a5f3c',
        'rwanda-gold': '#f4c430',
        'rwanda-blue': '#0066cc',
        'rwanda-red': '#ce1126',
      }
    },
  },
  plugins: [],
} 