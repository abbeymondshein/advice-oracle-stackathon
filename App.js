import React, { Component } from "react";
import {
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import Expo, {
  AppLoading,
  Asset,
  Font,
  Icon,
  Notifications,
  LinearGradient
} from "expo";
import AppNavigator from "./navigation/AppNavigator";
import Fortune from "./components/Fortune";
import { Button } from "react-native-elements";

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: {},
      fortune: "",
      buttonDisplay: true,
      adviceActive: false
    };
    this._onPressButton = this._onPressButton.bind(this);
    this.toggleActive = this.toggleActive.bind(this)
  }
  _onPressButton() {
    Alert.alert(`${this.state.fortune}`);
    this.loadNewAdvice();
  }
  toggleActive() {
    this.setState(()=> {
      return {adviceActive: true};
    });
  }
  loadNewAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson,
          fortune: responseJson.slip.advice
        });
        console.log(this.state.fortune);
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  componentDidMount() {
    this.loadNewAdvice();
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <LinearGradient colors={["#4A148C", "#880E4F"]} style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            {!this.state.adviceActive ?
          <Button
            onPress={this.toggleActive}
            title="Random Advice"
            color="#841584"
            accessibilityLabel="Access Random Advice"
          />
          :
          <Fortune onPress={this._onPressButton} fortune={this.state.fortune} />
          }
          {/* <TouchableOpacity onPress={() => this._onPressButton()}>
            <Image source={require("./assets/images/lucy-advice-booth.jpg")} />
          </TouchableOpacity> */}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
