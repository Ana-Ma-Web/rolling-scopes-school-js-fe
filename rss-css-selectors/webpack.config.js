const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    hashFunction: 'sha256',
  },
  devServer: {
    static: "./dist",
    port: 8080,
    open: {
      app: {
        name: "chrome",
      },
    },
    // devMiddleware: {
    //   writeToDisk: true,
    // },
  },
  resolve: {
    alias: {
      "@img": path.resolve(__dirname, "src", "assets", "img"),
    },
    extensions: ['.ts', '.js', '.json', '.wasm'],
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: path.resolve(__dirname, "src", "assets", "img", "favicon.ico"),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { test: /\.ts$/i, use: 'ts-loader' },,
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
      },
      {
        // test: /\.(png|jpe?g|gif)$/i,
        // use: [
        //   {
        //     loader: "file-loader",
        //   },
        // ],
      },
    ],
  },
};