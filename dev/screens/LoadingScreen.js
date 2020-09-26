import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  text: {
    textAlign: "center",
  },
});
