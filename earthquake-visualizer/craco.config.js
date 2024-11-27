// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        vm: require.resolve('vm-browserify'),
        os: require.resolve("os-browserify/browser"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        process: require.resolve("process/browser"),
      },
    },
    plugins: [
      new (require("webpack").ProvidePlugin)({
        process: "process/browser",
      }),
    ],
  },
};
