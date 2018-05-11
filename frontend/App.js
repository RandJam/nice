import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import JgWebviewScreen from './src/screens/JgWebviewScreen';


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
  JgWebviewScreen: { screen: JgWebviewScreen },
});
