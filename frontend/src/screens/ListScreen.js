import React, {Component} from 'react';
import {Platform, AppRegistry, FlatList, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
import axiosMain from '../axios';
import { Button } from 'react-native-elements'

const util = require('util')

export default class ListScreen extends Component{
  static navigationOptions = {
    title: 'List Screen',
  };

  handleDonationButtonPress = () => {
    this.props.navigation.navigate('JgWebviewScreen');
  }

  render(){
    // console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
    // var {params} = this.props.navigation.state;
    return(
      <View>
        <Button onPress={ this.handleDonationButtonPress } title='BUTTON WITH ICON'/>

      </View>
    )

  }
}
