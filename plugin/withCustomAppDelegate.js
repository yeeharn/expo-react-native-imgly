const { withAppDelegate } = require("@expo/config-plugins");

/** Adds the custom configuration in the iOS AppDelegate. */
module.exports = function withCustomAppDelegate(config) {
  return withAppDelegate(config, (config) => {
    config.modResults.contents = addImglyCustomization(config.modResults.contents);
    return config;
  });
};

/**
 * Add customization for IMG.LY modules.
 * @references https://img.ly/docs/vesdk/react-native/guides/user-interface/customize-icons/
 */
function addImglyCustomization(contents) {
  contents = contents.replace(
    `@implementation AppDelegate`,
    `#import <RNPhotoEditorSDK/RNPhotoEditorSDK.h>

    @implementation AppDelegate
    `
  );

  contents = contents.replace(
    `RCTAppSetupPrepareApp(application);`,
    `RCTAppSetupPrepareApp(application);

    [IMGLY setBundleImageBlock:^UIImage * _Nullable(NSString * _Nonnull identifier) {
      if ([identifier isEqualToString:@"imgly_icon_save"]) {
        return [UIImage systemImageNamed:@"checkmark"];
      }
      return nil;
    }];`
  );

  return contents;
}
