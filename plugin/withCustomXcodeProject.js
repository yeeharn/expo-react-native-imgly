const { withXcodeProject } = require("@expo/config-plugins");

/** Adds the custom configuration in the iOS XcodeProject file. */
module.exports = function withCustomXcodeProject(config) {
  return withXcodeProject(config, (config) => {
    addImglyConfiguration(config.modResults);
    return config;
  });
};

/**
 * Add compiler flags to support IMG.LY library.
 * @references https://img.ly/docs/vesdk/react-native/guides/user-interface/customize-icons/
 */
function addImglyConfiguration(modResults) {
  modResults.addToBuildSettings;

  const configurations = nonComments(
    modResults.pbxXCBuildConfigurationSection()
  );

  for (let config in configurations) {
    let buildSettings = configurations[config].buildSettings;

    // add compiler flags for c++
    const OTHER_CPLUSPLUSFLAGS = "OTHER_CPLUSPLUSFLAGS";
    const OTHER_CPLUSPLUSFLAGS_INITIAL = [
      '"$(OTHER_CFLAGS)"',
      '"-DFOLLY_NO_CONFIG"',
      '"-DFOLLY_MOBILE=1"',
      '"-DFOLLY_USE_LIBCPP=1"',
    ];
    if (!buildSettings[OTHER_CPLUSPLUSFLAGS]) {
      buildSettings[OTHER_CPLUSPLUSFLAGS] = OTHER_CPLUSPLUSFLAGS_INITIAL;
    }

    if (unquote(buildSettings["PRODUCT_NAME"]) != modResults.productName)
      continue;

    // add compiler flags to allow non modular includes
    buildSettings["CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES"] =
      "YES";
      buildSettings[OTHER_CPLUSPLUSFLAGS].push('"-fcxx-modules"');
      buildSettings[OTHER_CPLUSPLUSFLAGS].push('"-fmodules"');
  }
}

function unquote(str) {
  if (str) return str.replace(/^"(.*)"$/, "$1");
}

const COMMENT_KEY = /_comment$/;
function nonComments(obj) {
  var keys = Object.keys(obj),
    newObj = {},
    i = 0;

  for (i; i < keys.length; i++) {
    if (!COMMENT_KEY.test(keys[i])) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }

  return newObj;
}
