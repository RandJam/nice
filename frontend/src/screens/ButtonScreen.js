import React, {Component} from 'react';
import {Text, View } from 'react-native';
import Button from '../components/Button'

const util = require('util')

export default class ButtonScreen extends Component {
  static navigationOptions = {
    title: 'Button screen',
  };
  render(){

      console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
      var {navigate} = this.props.navigation;
      return(
      <View>
        <Text> ButtonScreen </Text>
        <Button
          onClick={
            () => navigate("Second", {})
          }
          title = 'Go to list screen'
        />
      </View>
    )

  }
}
