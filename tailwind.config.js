/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-dynamic': 'calc(var(--vh) * 100)', // Custom dynamic height class
        'screen-dynamic-350': 'calc(var(--vh) * 100 - 350)', // Custom dynamic height class
      },
    },
  },
  plugins: [],
}
