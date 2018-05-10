import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, Image, WebView, TouchableOpacity, AsyncStorage, TextInput, TextStylePropTypes
} from 'react-native';
import RectangleButton from '../components/RectangleButton';
import axiosMain from '../axios';

export default class AuthScreen extends Component {

  static navigationOptions = {
    header: 'none'
  }

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''}

  }

  login = () => {
    // post data to backend
    return axiosMain.post('/',
      method: 'post',
      headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},
    data: {
      email: email,
      password: password
    })
    .then((response) => {
       // Handle the  response here
    })
    .catch((error) => {
       // Handle returned errors here
    });

  }

  // componentDidMount() {
  //    return axiosMain.get('/')
  //   .then(response => {console.log(response.data);
  //     console.log(response.status);
  //     this.setState({
  //       term: response.data
  //     });
  //   })
  //   .catch(error => {
  //     console.log('Error fetching and parsing data', error)
  //   })
  // };

  render() {
    const { term } = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>

            <TextInput style={styles.input} onChangeText={(email) => this.setState({email})} value={this.state.email} placeholder='email'>
            </TextInput>

            <TextInput secureTextEntry={true} style={styles.input} onChangeText={(password) => this.setState({password})}
              value={this.state.password} placeholder='password'>
            </TextInput>
          </View>

          <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
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
  },
  content: {
    alignItems: 'center',
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  }
})
