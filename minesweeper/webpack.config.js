const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./index.js",
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
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
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
