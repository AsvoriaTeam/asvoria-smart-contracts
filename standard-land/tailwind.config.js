// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    extend: {
      fontFamily: {
        novaBold: ['NovaBold'],
        novaMedium: ['NovaMedium'],
        novaSemi: ['NovaSemi'],
        novaThin: ['NovaThin'],
      },
      colors: {
        primary: "#bababa",
        secondary: "",
        purple500: "#821FFF",
        green500: "#01FEA8",
        blue400: "#00E0FF",
        blue500: "#46A5FF",
        purple400: "#DC1FFF",
        customGreen: '#01FEA8',
        customBlue: '#46A5FF',
        customPurple: '#D632FF',
        colBlack:"#1F1F1F"
      },

      maxWidth: {
        350: "1400px",
        312: "1248px",
        187: "748px",
        150: "600px",
        137: "548px",
        100: "400px",
      },
      
      screens: {
        xsm: { max: '500px' },
        sm: { min: '501px', max: '999px' },
        md: {
          min: '1000px', max: '1200px'
        },
        lg: {
          min: '1201px'
        },
        xl: {
          min: '1450px'
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

