import React, {Component} from 'react';
import {Text, View } from 'react-native';
import Button from '../components/Button'

const util = require('util')

export default class HomeScreen extends Component {

  handleNiceButtonPress = () => {
    this.props.navigation.navigate('ListScreen');
  }

  render(){
      return (
      <View>
        <Text> HomeScreen </Text>
        <Button  onClick={ this.handleNiceButtonPress }/>
      </View>
    )

  }
}
