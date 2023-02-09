/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {

      //Electronics webshop

      'themetext1': '#E9E8E8', //navigation
      'themetext2': '#E9E8E8', //headings
      'themetext3': '#E9E8E8', //page body
      'themetext4': '#000000',

      'themebackground1': '#20262E',
      'themebackground2': '#913175',
      'themebackground3': '#CD5888',
      'themebackground4': '#E5B8F4',

      'themesvg1': '#433040',
      'themesvg2': '#663A52',
      'themesvg3': '#894464',
      //'themesvg4': '#AC4E76',
      /* */

      //Indoor Gardeners
      /*
            'themetext1': '#E9E8E8',
            'themetext2': '#E9E8E8',
            'themetext3': '#000000',
            'themetext4': '#000000',
            'themebackground1': '#3C6255',
            'themebackground2': '#61876E',
            'themebackground3': '#F5EDCE',
            'themebackground4': '#A6BB8D',
            'themesvg1': '#6A8573',
            'themesvg2': '#98A891',
            'themesvg3': '#C6CBAF',
             */

    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
