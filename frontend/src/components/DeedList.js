import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import axiosMain from '../axios';

export default class DeedList extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    return axiosMain.get('/deeds')
    .then(response => {
      console.log(response.data),
      console.warn(response.data),
      this.setState({ data: response.data})
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    })
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
    return (
      <View style={{flex: 1, marginTop: 22}}>
        <FlatList
          data={[this.state.data]}
          keyExtractor={(x, i) => i }
          renderItem={({item}) => {
          //   // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`)
          //   return (
          //     <FlatListItem item={item}>
          //
          //     </FlatListItem>)
          <Text>{item.name}</Text>
          }}

        />



      </View>
    )
  }
}

class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        // backgroundColor: this.state.index % 2 == 0 ? 'chocolate': 'tomato'
      }}>
        <Text style={styles.flatListItem}>{this.state.item.name}</Text>
        <Text style={styles.flatListItem}>{this.state.item.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  }
})
