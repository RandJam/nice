import React, {Component} from 'react';
import {Text, View } from 'react-native';
import Button from '../components/Button'

const util = require('util')

export default class ButtonScreen extends Component {
  render(){
      return (
      <View>
        <Text> ButtonScreen </Text>
        <Button />
      </View>
    )

  }
}
