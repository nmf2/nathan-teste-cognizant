const merge = require("webpack-merge").default;
const common = require("./webpack.common.js");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  name: "server",
  mode: "development",
  watch: true,
  watchOptions: {
    poll: 1000,
  },
  devtool: "source-map",
  externals: [nodeExternals({})],
  plugins: [
    new NodemonPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        "./node_modules/swagger-ui-dist/",
      ],
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
});
