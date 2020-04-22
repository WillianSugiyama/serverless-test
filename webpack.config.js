const path = require("path");
const slsWebpack = require("serverless-webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: slsWebpack.lib.entries,
  mode: slsWebpack.lib.webpack.isLocal ? "development" : "production",
  target: "node",
  //   externals: [nodeExternals()],
  devtool: "source-map",
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
};
