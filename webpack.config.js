const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  mode: argv.mode || 'production',
  mode: argv.mode || "production",
  output: {
    filename: '[name].js?t=' + new Date().getTime(),
    chunkFilename: '[name]-chunk.js?t=' + new Date().getTime(),
    publicPath: '',
    filename: "[name].js?t=" + new Date().getTime(),
    chunkFilename: "[name]-chunk.js?t=" + new Date().getTime(),
    publicPath: "/",
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 5900,
    historyApiFallback: true,

    watchFiles: ['src/**/*'],
    port: 5900,
    historyApiFallback: {
      rewrites: [{ from: /^\/.*$/, to: "/index.html" }],
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
        type: "asset/inline",
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      favicon: 'public/favicon.ico',
      template: "./src/index.html",
      favicon: "public/favicon.ico",
    }),
    new Dotenv(),
  ],
});