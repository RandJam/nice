import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

export default class RectangleButton extends Component {
  render() {
    const { text, color, backgroundColor, handleOnPress } = this.props;
    return (
      <TouchableHighlight
        style={[{backgroundColor}, styles.wrapper]}
        onPress={handleOnPress}
      >
        <Text style={[{color}, styles.buttonText]}>{text}</Text>
      </TouchableHighlight>
    )
  }
}

RectangleButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'yellow',
  },
  buttonText: {
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
  }
})
