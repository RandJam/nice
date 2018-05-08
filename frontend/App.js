import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';


export default class App extends Component {
  render() {
    return (
    <AppNavigator />
    );
  }
}

const AppNavigator = new StackNavigator({
  // AuthScreen: { screen: AuthScreen },
  HomeScreen: { screen: HomeScreen },
  ListScreen: { screen: ListScreen },

});
