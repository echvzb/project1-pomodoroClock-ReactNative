import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import Header from "./components/Header";
import Clock from "./components/Clock";
import ControlClock from "./components/ControlClock";
import ChangeClock from "./components/ChangeClock";
import vibrate from "./components/vibrate"

const BREAK = 'break'
const WORK = 'work'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      break: {
        text: "Break timer",
        time: {
          seconds: 0,
          minutes: 5,
        }
      },
      work: {
        text: "Work timer",
        time: {
          seconds: 0,
          minutes: 25,
        }
      },
      id: WORK,
      minutes: 25,
      seconds: 0,
      started: false
    };
    this.changeTime = this.changeTime.bind(this)
    this.toggleReset= this.toggleReset.bind(this)
  }
  clockChange() {
    let tempMinutes = this.state.minutes;
    let tempSeconds = this.state.seconds;
    console.log(tempMinutes, tempSeconds);

    if (tempSeconds - 1 < 0) {
      if (tempMinutes == 0) {
        console.log("Minutos = 0");
        vibrate()
        this.clockChoice();
        return;
      } else {
        tempMinutes--;
        tempSeconds = 59;
      }
    } else {
      tempSeconds--;
    }
    this.setState({
      minutes: tempMinutes,
      seconds: tempSeconds
    });
  }
  clockChoice() {
    let tempId = this.state.id;
    if (tempId == BREAK) {
      tempId = WORK;
    } else {
      tempId = BREAK;
    }
    this.setClock(tempId, true);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  setClock(tempId, started) {
    clearInterval(this.interval);
    console.log("Entra: " + tempId);
    this.setState({
      id: tempId,
      minutes: this.state[tempId].time.minutes,
      seconds: this.state[tempId].time.seconds,
      started: started
    });
    this.interval = setInterval(() => this.clockChange(), 1000);
  }
  toggleReset() {
    let tempId = WORK;
    this.setClock(tempId, false);
    clearInterval(this.interval);
  }
  togglePause() {
    clearInterval(this.interval);
    this.setState({
      started: false
    });
  }
  toggleStart() {
    this.interval = setInterval(() => this.clockChange(), 1000);
    this.setState({
      started: true
    });
  }
  changeTime(obj) {
    let key = Object.keys(obj)[0]
    if(key==='work'){
      let temp = {minutes: obj[key].time.minutes, seconds: obj[key].time.seconds}
      temp = Object.assign(temp,obj)
      this.setState(temp)
      return
    }
    this.setState(obj)
  }
  render() {
    let id = this.state.id;
    return (
      <View style={styles.container}>
        <Header text={this.state[id].text} />
        <Clock seconds={this.state.seconds} minutes={this.state.minutes} />
        <ControlClock
          started={this.state.started}
          onReset={() => {
            this.toggleReset();
          }}
          onStart={() => {
            this.toggleStart();
          }}
          onPause={() => {
            this.togglePause();
          }}
        />
        <ChangeClock
          mode={WORK}
          text={this.state.work.text}
          minPlaceholder={this.state.work.time.minutes}
          secPlaceholder={this.state.work.time.seconds}
          onChangeTime={this.changeTime}
          onReset={this.toggleReset}
        />
        <ChangeClock
          mode={BREAK}
          text={this.state.break.text}
          minPlaceholder={this.state.break.time.minutes}
          secPlaceholder={this.state.break.time.seconds}
          onChangeTime={this.changeTime}
          onReset={this.toggleReset}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    paddingTop: Constants.statusBarHeight,
  }
});

export default App;
