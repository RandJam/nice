import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, Image
} from 'react-native';
import RectangleButton from '../components/RectangleButton';
import axiosMain from '../axios';

export default class AuthScreen extends Component {

  static navigationOptions = {
    header: 'none'
  }

  constructor(){
  super();
  this.state = {
    input: '',
  };
}

componentDidMount() {
  const { result } = this.state
  axiosMain.get('/')
  .then(response => {
    this.setState({
      result: response.data
    }); console.log(response.data)
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error)
  })
};

  handleLogInPress = () => {
    this.props.navigation.navigate('HomeScreen');
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

          <Text> result from index: {this.state.result} </Text>

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
