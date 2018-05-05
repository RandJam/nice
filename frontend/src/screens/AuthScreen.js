import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, Image
} from 'react-native';
import RectangleButton from '../components/RectangleButton';
import axios from 'axios';

const serverUrl = 'http://10.31.2.119:5000';
const axiosMain = axios.create({
  baseURL: serverUrl
});

export default class AuthScreen extends Component {

  static navigationOptions = {
    header: 'none'
  }

  someMethod() {
    'hello'
  }

  handleLogInPress = () => {
    axiosMain.get('/')
    .then(function (response) { console.log(response.data)
    })
    .catch((err) => console.log(err))
    // this.props.navigation.navigate('HomeScreen');
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
