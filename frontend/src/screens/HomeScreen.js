import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button'

const util = require('util')

export default class HomeScreen extends Component {


  handleNiceButtonPress = () => {
    this.props.navigation.navigate('ListScreen');
  }

  render(){
      return (
      <View style={styles.container}>

        <Button  onClick={ this.handleNiceButtonPress }/>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
