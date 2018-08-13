import React, { Component } from 'react';
import {Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class RecentScreen extends Component
{
  render() {
    return (
      <View>
        <Text> This is where recent searches will be shown </Text>
      </View>
    );
  }
}
