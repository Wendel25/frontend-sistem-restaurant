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
      },
    }
  }
};
