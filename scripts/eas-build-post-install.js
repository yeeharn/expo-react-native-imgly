const fs = require("fs");
const path = require("path");

const env = process.env || {};

if (env.EAS_BUILD_PLATFORM === "android") {
  // imgly
  const imglyResSourcePath = path.resolve(__dirname, path.join("..", "./assets/imgly/imgly_icon_save.xml"));
  const resDrawableDir = path.resolve(__dirname, "../android/app/src/main/res/drawable");
  const resDrawablePath = path.join(resDrawableDir, "imgly_icon_save.xml");

  try {
    if (fs.existsSync(resDrawableDir)) {
      fs.copyFile(imglyResSourcePath, resDrawablePath, (err) => {
        if (err) throw err;
        console.log("Successfully clone imgly resource file.");
      });
    } else {
      throw Error(`directory '${resDrawableDir}' not found.`);
    }
  } catch (err) {
    console.warn("Failed to clone imgly resource file. Error: " + err.message);
  }
}
