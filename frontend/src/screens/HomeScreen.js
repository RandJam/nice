import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, Image
} from 'react-native';
import RectangleButton from '../components/RectangleButton'

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: 'none'
  }

  handleLogInPress = () => {
    this.props.navigation.navigate('LoggedInScreen');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.helloWrapper}>
          <Image
            source={require('../assets/ammar-home.png')}
            style={styles.ammar}
          />
          <Text style={styles.helloText}>Hello</Text>
          <RectangleButton
            text="Sign in with Google"
            color={'indigo'}
            backgroundColor={'blue'}
            handleOnPress={this.handleLogInPress}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
  },
  helloWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 30,
  },
  ammar: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  helloText: {
    fontSize: 30,
    color: 'orange',
    fontWeight: '300',
    marginBottom: 40
  }
})
