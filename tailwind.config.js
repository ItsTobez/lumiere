// tailwind.config.js controls finer details in TailwindCSS
// See https://tailwindcss.com/docs/configuration

const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      gray: {
        100: '#fcfcfd',
        200: '#e6e8ec',
        300: '#bcc2cc',
        400: '#777e90',
        500: '#5d626e',
        600: '#3a3d45',
        700: '#2c2e36',
        800: '#1e1e21',
        900: '#141416',
      },
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: {
        ...colors.blue,
        550: '#3e73ea',
      },
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      fontSize: {
        xs: '0.8rem',
      },
      height: {
        108: '396px',
        editor: 'calc(100vh - 72px)',
      },
      spacing: {
        0.25: '1px',
        5.5: '22px',
        18: '72px',
      },
      animation: {
        tilt: 'tilt 5s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '75%': {
            transform: 'rotate(-1deg)',
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#000',
              fontSize: '3rem',
              fontWeight: 700,
              letterSpacing: '-0.066875rem',
              lineHeight: 1.5,
              margin: 0,
            },
            h2: {
              color: '#000',
              fontSize: '2.25rem',
              fontWeight: 600,
              letterSpacing: '-0.049375rem',
              lineHeight: 1.5,
            },
            p: {
              color: '#000',
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.6,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
