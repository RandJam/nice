import React, { Component } from 'react'
import { WebView } from 'react-native'
import axiosMain from '../axios'

const util = require('util')

export default class JgWebviewScreen extends Component {
  static navigationOptions = {
    title: 'JG  Screen',
  }
  componentDidMount() {
    return axiosMain
      .get('/donate')
      .then(response => {
        console.log(response.data.charityId)
        console.log(response.status)
        this.setState({
          id: response.data.charityId,
        })
      })
      .catch(error => {
        // console.log('Error fetching and parsing data', error)
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
    }
  }

  render() {
    return (
      <WebView
        source={{
          uri: `https://link.justgiving.com/v1/charity/donate/charityId/${
            this.state.id
          }?amount=5.00&currency=GBP&reference=be_nice&exitUrl=https%3A%2F%2Faveryniceapp.herokuapp.com%2Fthanks%3FjgDonationId%3DJUSTGIVING-DONATION-ID&message=Its-good%20be%20be%20bad%20but%20being%20nice%20doesnt%20hurt%20either.`,
        }}
        style={{ marginTop: 20 }}
      />
    )
  }
}
