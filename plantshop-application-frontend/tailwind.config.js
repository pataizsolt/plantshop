/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'themetext1': '#EAE7B1',
      'themetext2': '#DDDDDD',
      'themetext3': '#EEEEEE',
      'themetext4': '#ffffff',
      'themebackground1': '#3C6255',
      'themebackground2': '#61876E',
      'themebackground3': '#A6BB8D',
      'themebackground4': '#F5EDCE',
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
