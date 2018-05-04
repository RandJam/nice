import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ButtonScreen from './src/screens/ButtonScreen'
import LoggedInScreen from './src/screens/LoggedInScreen'


export default class App extends Component {
  render() {
    return (
    <AppNavigator />
    );
  }
}

const AppNavigator = new StackNavigator({
  HomeScreen: { screen: HomeScreen},
  LoggedInScreen: { screen: LoggedInScreen},
  ButtonScreen: { screen: ButtonScreen}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
