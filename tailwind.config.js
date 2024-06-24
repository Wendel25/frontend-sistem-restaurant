module.exports = {
  mode: "jit",
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        'dark900': '#1F222B',
        'dark700': '#343741',
        'darkGreen': '#248EA6',
        'backgroundGreenPrice': '#d9f99d',
        'textGreenPrice': '#166535',
        'textRedPrice': '#a32824',
        'gray': '#ccc',
      },
      maxHeight: {
        '128': '43rem',
      }
    }
  }
};
