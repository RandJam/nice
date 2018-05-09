import React, {Component} from 'react';
import {Platform, AppRegistry, FlatList, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
import DeedList from '../components/DeedList';
import axiosMain from '../axios';

const util = require('util')

export default class ListScreen extends Component{
  static navigationOptions = {
    title: 'List Screen',
  };



  componentDidMount() {
     return axiosMain.get('/donate')
    .then(response => {console.log(response.data.charityId);
      console.log(response.status);
      this.setState({
        id: response.data.charityId
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    })
  };

  constructor(props) {
    super(props);
    this.state = {
    id: null,
  }

  }

  // api get to collect list of charities
  // axios.get('')

  render(){
    // console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null))
    // var {params} = this.props.navigation.state;
    return(
      <View>
        <Text onPress={() => Linking.openURL(`https://link.justgiving.com/v1/charity/donate/charityId/${this.state.id}?amount=5.00&currency=GBP&reference=be_nice&exitUrl=http%3A%2F%2Flocalhost%3A5000%2Fthanks%3FjgDonationId%3DJUSTGIVING-DONATION-ID&message=Its-good%20be%20be%20bad%20but%20being%20nice%20doesnt%20hurt%20either.`)}>
<Image source={ require('../assets/donate-button.png') } alt={"Donate with JustGiving"} />
</Text>
      </View>
    )

  }
}
