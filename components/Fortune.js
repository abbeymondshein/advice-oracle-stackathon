import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export default class Fortune extends Component {
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => this.props.onPress()}>
            <Image source={require('../assets/images/lucy-advice-booth.jpg')} />
          </TouchableOpacity>
        {/* <Text style={styles.title}> {this.props.fortune} </Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0,
    borderColor: '#d6d7da',
    padding: 15
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
  },
  activeTitle: {
    color: 'red',
  },
})
