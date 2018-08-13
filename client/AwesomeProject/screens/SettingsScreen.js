import React, { Component } from 'react';
import {Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class SettingsScreen extends Component
{
  render(){
    return (
      <View>
        <Text> Hello There </Text>
      </View>
    );
  }
}

// const SimpleApp = StackNavigator({
//   Home: {navigationOptions: {title: 'Settings'}}
// });
