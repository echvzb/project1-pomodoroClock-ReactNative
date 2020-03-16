import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default props => {
  let minText = "";
  let secText = "";
  props.minPlaceholder < 10 ? (minText = "0") : (minText = "");
  props.secPlaceholder < 10 ? (secText = "0") : (secText = "");

  minText += props.minPlaceholder;
  secText += props.secPlaceholder;

  const key = props.mode;
  let objSec = {};
  let objMin = {};

  const findNumber = value => {
    let size = value.length;
    let exp = 0;
    let number = 0;
    for (let i = size - 1; i >= 0; i--) {
      let char = value.codePointAt(i) - 48;
      number += char * Math.pow(10, exp);
      exp++;
    }
    return number;
  };
  const createObj = (number, type, key) => {
    switch (type) {
      case "minutes": {
        return {
          [key]: {
            text: props.text,
            time: {
              minutes: number,
              seconds: props.secPlaceholder
            }
          }
        };
      }
      case "seconds": {
        let neutral = 0;
        if (number / 60 >= 1) {
          while (true) {
            neutral++;
            number -= 60;
            if (number / 60 < 1) {
              break;
            }
          }
        }
        return {
          [key]: {
            text: props.text,
            time: {
              minutes: props.minPlaceholder + neutral,
              seconds: number
            }
          }
        };
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <Text style={styles.text}>Min:</Text>
      <TextInput
        style={styles.input}
        placeholder={minText}
        keyboardType={"numeric"}
        onChangeText={value => {
          let number = findNumber(value);
          objMin = createObj(number, "minutes", key);
        }}
        onSubmitEditing={() => {
          props.onChangeTime(objMin);
        }}
      />
      <Text style={styles.text}>Secs:</Text>
      <TextInput
        style={styles.input}
        placeholder={secText}
        keyboardType={"numeric"}
        onChangeText={value => {
          let number = findNumber(value);
          objSec = createObj(number, "seconds", key);
        }}
        onSubmitEditing={() => {
          props.onChangeTime(objSec);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 6
  },
  text: {
    fontSize: 18,
    color: "#011627"
  },
  input: {
    height: "100%",
    borderColor: "#001970",
    borderWidth: 2,
    width: 30,
    textAlign: "center"
  }
});
