import React, { Component } from 'react';
import {Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class AnimalScreen extends Component
{
  render() {
    return (
      <View>
        <Text> This is where the animals will be shown </Text>
      </View>
    );
  }
}
