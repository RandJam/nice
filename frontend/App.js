import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Click this button to feel good...</Text>
        <Button
          onPress={() => {
            alert("NICE!");
          }}
          title="NICE"
          colour='#841584'
          accessibilityLabel='click to choose nice options'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
