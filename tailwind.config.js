/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./index.html"
  ],
  theme: {
    extend: {
      colors:{
        'div':{
          light: '#a7b0ca',
          dark:'#151515'
        },
        'page': {
          light:'#d5dcf9',
          dark:'#0a0908'
        },
        'textcol': {
          light:'#151515',
          dark:'#a7b0ca'
        },
        'textcut':{
          light:'#0a0908',
          dark:'#fde047'
        },
        'bordercol':{
          light:'#151515',
          dark:'#fde047'
        }
      }
    },
    fontFamily:{
      'montserrat': ['Montserrat', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
      'outfit': ['Outfit', 'sans-serif']
    }
  },
  plugins: [],
  darkMode:'class'
}


// html[data-theme='light'] {
//   --yellow: crimson;
//   --pagebg: #bbb;
//   --divbg: #eee;
//   --textcl: #333;
//   --textcutthru: #eab308;
// }

// html[data-theme="dark"] {
//   --yellow: #eab308;
//   --pagebg: #333;
//   --divbg: #222;
//   --textcl: #bbb;
//   --textcutthru: crimson;
// }


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", "./index.html"
//   ],
//   theme: {
//     extend: {},
//     colors:{
//       'div':{
//         light: '#eee',
//         dark:'#222'
//       },
//       'page': {
//         light:'#bbb',
//         dark:'#333'
//       },
//       'textcol': {
//         light:'#333',
//         dark:'#bbb'
//       },
//       'textcut':{
//         light:'#eab308',
//         dark:'#dc143c'
//       },
//       'bordercol':{
//         light:'#dc143c',
//         dark:'#eab308'
//       }
//     },
//     fontFamily:{
//       'montserrat': ['Montserrat'],
//       'miracle': ['Miracle']
//     }
//   },
//   plugins: [],
//   darkMode:'class'
// }
