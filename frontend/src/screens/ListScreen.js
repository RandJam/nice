import React, {Component} from 'react';
import {Platform, AppRegistry, FlatList, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
import axiosMain from '../axios';
import { Button } from 'react-native-elements'

const util = require('util')

export default class ListScreen extends Component{
  static navigationOptions = {
    title: 'NICE OPTIONS',
  };

  handleDonationButtonPress = () => {
    this.props.navigation.navigate('JgWebviewScreen');
  }

  render(){
    // console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
    // var {params} = this.props.navigation.state;
    return(
      <View style={styles.container}>
        <Button
          onPress={ this.handleDonationButtonPress }
          title='RANDOM DONATION'
          backgroundColor='rgba(254, 114, 76, 0.8)'
          textStyle={{
            fontSize: 30,
            textAlign: 'center',
            padding:15,
            fontWeight:'500',
            fontFamily:'Avenir'
          }}
        />

      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})
