module.exports = {
  purge: {
    enabled: true,
    content: ['./public/**/*.html',
               './public/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FFF3CC",
        secondary: "#FF9E8F"
      },
      fontFamily: {
        ubuntu : "Ubuntu, sans-serif"
      },
    },
  },
  variants: {
    backgroundColor: ['hover','focus','active','checked'],
    borderColor: ['hover','focus','active','checked'],
    borderWidth: ['hover','focus','active','checked'],
    extend: {},
  },
  plugins: [
  ],
}
