import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default props => {
  let digitChange = {
    minutes: "",
    seconds: ""
  };
  props.minutes < 10 ? (digitChange.minutes = "0") : (digitChange.minutes = "");
  props.seconds < 10 ? (digitChange.seconds = "0") : (digitChange.seconds = "");
  return (
    <View style={styles.clockContainer}>
      <Text style={styles.clockText}>
        {digitChange.minutes}
        {props.minutes}:{digitChange.seconds}
        {props.seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clockContainer: {
    backgroundColor: "#303f9f",
    paddingVertical: 40
  },
  clockText: {
    fontSize: 72,
    textAlign: "center",
    color: "#ffffff"
  }
});
