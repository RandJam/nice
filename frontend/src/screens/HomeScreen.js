import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Video from 'react-native-video';
import { Video } from 'expo';
import Button from '../components/Button';
const util = require('util')

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'NICE APP',
  };

  handleNiceButtonPress = () => {
    this.props.navigation.navigate('ListScreen');
  }

  render(){
      return (
      <View style={styles.container}>
        <Video
          shouldPlay
          source={require('../assets/Bloom.mp4')}
          resizeMode='cover'
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.container}>
          <Button
            onClick={ this.handleNiceButtonPress }
          />
        </View>
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
