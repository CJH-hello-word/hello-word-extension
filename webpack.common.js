const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  entry: {
    firebase_config: "./src/popup/firebase_config.js",
    popup: "./src/popup/popup.js",
    main_script: "./src/popup/main-script.js",
    content: "./src/content/content.js",
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "main.html"),
      filename: "main.html",
      chunks: ["main_script"],
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json" },
        { from: "./src/background/background.js" },
        { from: "./src/content/content.js" },
        { from: "./src/icons/*" },
        { from: "./src/css/*" },
      ],
    }),
    new DotenvWebpackPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
