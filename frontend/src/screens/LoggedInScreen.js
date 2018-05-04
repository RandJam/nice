import React, {Component} from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
const util = require('util')

export default class LoggedIn extends Component {

  handleButtonScreenPress = () => {
     this.props.navigation.navigate("ButtonScreen");
  }

  render(){
      return (
      <View>
        <Text> LoggedIn </Text>
        <TouchableOpacity onPress={this.handleButtonScreenPress}>
          <Text> Go to button </Text>
        </TouchableOpacity>
      </View>
    )

  }
}
