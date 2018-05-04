import React, {Component} from 'react';
import {Platform, AppRegistry, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native';
import BasicFlatList from '../components/BasicFlatList'
const util = require('util')

export default class ListScreen extends Component{
  static navigationOptions = {
    title: 'List screen',
  };
  render(){
    console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
    var {params} = this.props.navigation.state;
    return(
      <View>
        <BasicFlatList />
        <Text> ListScreen </Text>

      </View>
    )

  }
}
