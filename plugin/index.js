const { withPlugins } = require("@expo/config-plugins");

const withCustomAppDelegate = require("./withCustomAppDelegate");
const withCustomXcodeProject = require("./withCustomXcodeProject");

module.exports = function withCustomPlugin(config) {
  return withPlugins(config, [withCustomAppDelegate, withCustomXcodeProject]);
};
