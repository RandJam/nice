import React, {Component} from 'react';
import {Platform, AppRegistry, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
import BasicFlatList from '../components/BasicFlatList';
import axiosMain from '../axios';

const util = require('util')

export default class ListScreen extends Component{
  static navigationOptions = {
    title: 'List Screen',
  };

  // api get to collect list of charities
  // axios.get('')

  render(){
    console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
    var {params} = this.props.navigation.state;
    return(
      <View>
        <BasicFlatList />
        <Text> ListScreen </Text>
        <Text onPress={() => Linking.openURL('https://link.justgiving.com/v1/charity/donate/charityId/247383?amount=10.00&currency=GBP&reference=test&exitUrl=http%3A%2F%2Fwww.ddregalo.com%3FjgDonationId%3DJUSTGIVING-DONATION-ID&message=test')}>
        <Image source={ require('../assets/donate-button.png') } alt={"Donate with JustGiving"} />
        </Text>
      </View>
    )

  }
}
