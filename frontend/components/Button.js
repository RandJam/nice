import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  default: {backgroundColor: 'red'},
  primary: {backgroundColor: 'green'},
})

const Button = (props) =>(
  <TouchableOpacity style={styles[props.type]} onPress={props.onClick}>
    <Text>{props.label}</Text>
  </TouchableOpacity>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'primary']),
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  type: 'default',
}

Button.displayName = 'Nice'

export default Button
