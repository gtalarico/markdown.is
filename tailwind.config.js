const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      // xl: '1440px',
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
