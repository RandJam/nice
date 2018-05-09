import React, {Component} from 'react';
import {Platform, AppRegistry, FlatList, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
import axiosMain from '../axios';

const util = require('util')

export default class ListScreen extends Component{
  static navigationOptions = {
    title: 'List Screen',
  };



  // componentDidMount() {
  //    return axiosMain.get('/donate')
  //   .then(response => {console.log(response.data.charityId);
  //     console.log(response.status);
  //     this.setState({
  //       id: response.data.charityId
  //     });
  //   })
  //   .catch(error => {
  //     console.log('Error fetching and parsing data', error)
  //   })
  // };
  //
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   id: null,
  // }
  //
  // }

  // api get to collect list of charities
  // axios.get('')

  handleDonationButtonPress = () => {
    this.props.navigation.navigate('JgWebviewScreen');
  }

  render(){
    // console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
    // var {params} = this.props.navigation.state;
    return(
      <View>
        <Text onPress={ this.handleDonationButtonPress }>
<Image source={ require('../assets/donate-button.png') } alt={"Donate with JustGiving"} />
</Text>
      </View>
    )

  }
}
