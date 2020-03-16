import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default props => {
  return (
    <View style={styles.container}>
      {props.started === true ? (
        <TouchableOpacity style={styles.button} onPress={props.onPause}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={props.onStart}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={props.onReset}>
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#666ad1"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: "#001970"
  },
  text: {
    color: "#ffffff",
    fontSize: 18
  }
});
