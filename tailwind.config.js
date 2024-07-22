import figmaVariables from './figmaVariables.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx,css}",
  ],
  theme: {
    fontFamily: {
      sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", "Helvetica Neue", sans-serif'
    },
    ...(figmaVariables && figmaVariables),
  },
  plugins: [],
}

