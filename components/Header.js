import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default props => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{props.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    margin: 30,
    color: "#ffffff"
  },
  titleContainer: {
    backgroundColor: "#001970"
  }
});
