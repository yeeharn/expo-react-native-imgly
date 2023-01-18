const { withPlugins } = require('@expo/config-plugins');

const withCustomAppDelegate = require('./withCustomAppDelegate');

module.exports = function withCustomPlugin(config) {
  return withPlugins(config, [withCustomAppDelegate]);
};
