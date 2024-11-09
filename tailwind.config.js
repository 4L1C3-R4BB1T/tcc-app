/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'smh': { 'raw': '(min-height: 650px)' },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
