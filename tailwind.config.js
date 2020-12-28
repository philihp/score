const typography = require('@tailwindcss/typography')

module.exports = {
  plugins: [typography],
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#0000ff',
              '&:hover': {
                color: '#ff0000',
              },
              '&:visited': {
                color: '#7f007f',
              },
            },
          },
        },
      },
    },
  },
}
