const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  entry: ["@babel/polyfill", "./src/js/app.js"],

  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devtool: "source-map",
  mode: "development",
};
