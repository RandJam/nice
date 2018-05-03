import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button'
import BasicFlatList from './src/components/BasicFlatList'
import { StackNavigator } from 'react-navigation';

import ButtonScreen from './src/screens/ButtonScreen'
import ListScreen from './src/screens/ListScreen'

const Navigation = StackNavigator({
  First: {screen: ButtonScreen},
  Second: {screen: ListScreen}
})

export default Navigation;
