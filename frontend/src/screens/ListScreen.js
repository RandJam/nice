import React, {Component} from 'react';
import {Platform, AppRegistry, FlatList, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
import DeedList from '../components/DeedList';
import axiosMain from '../axios';

const util = require('util')

export default class ListScreen extends Component{
  static navigationOptions = {
    title: 'List Screen',
  };



  // api get to collect list of charities
  // axios.get('')

  render(){
    // console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
    // var {params} = this.props.navigation.state;
    return(
      <View>
        <DeedList />
      </View>
    )

  }
}
