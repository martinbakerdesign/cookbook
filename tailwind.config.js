import figmaVariables from './figmaVariables.js';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx,css}",
  ],
  darkMode: 'selector', // or 'media'
  theme: {
    fontFamily: {
      sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", "Helvetica Neue", sans-serif'
    },
    ...(figmaVariables && figmaVariables),
  },
  plugins: [],
}

export default tailwindConfig;

