import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import axios from 'axios';

const serverUrl = 'http://localhost:5000';
const http = axios.create({
  baseURL: serverUrl,
});

export default class App extends Component {
  render() {
    return (
    <AppNavigator />
    );
  }
}

const AppNavigator = new StackNavigator({
  AuthScreen: { screen: AuthScreen },
  HomeScreen: { screen: HomeScreen },
  ListScreen: { screen: ListScreen }
});
