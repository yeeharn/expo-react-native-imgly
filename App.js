import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { PESDK } from "react-native-photoeditorsdk";
import { VESDK } from "react-native-videoeditorsdk";

export default function App() {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(result);

    if (!result.cancelled) {
      PESDK.openEditor(result.uri);
    }
  };

  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    console.log(result);

    if (!result.cancelled) {
      VESDK.openEditor(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Img.ly</Text>
      <View style={styles.button}>
        <Button title="Pick an image" onPress={pickImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick a video" onPress={pickVideo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
});
