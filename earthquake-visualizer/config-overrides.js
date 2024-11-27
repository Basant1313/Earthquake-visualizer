const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfills for core Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    process: require.resolve('process/browser'),  // Add process polyfill
  };

  // Add the process polyfill globally
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser', // This ensures `process` is available globally
    }),
  ];

  return config;
};
