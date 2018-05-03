import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';



const Button = (props) =>(
  <TouchableOpacity onPress={props.onClick}>
    <Image source={require("../assets/nice-logo.png")} style={{width: 400, height: 400}}/>
  </TouchableOpacity>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}

Button.displayName = 'Nice'

export default Button
