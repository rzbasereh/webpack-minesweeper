const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',

  plugins: [new MiniCssExtractPlugin()],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  devServer: {
    static: './dist',
    hot: true,
  },
};
