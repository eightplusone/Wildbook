import React, { Component } from 'react';
import {Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class PeopleScreen extends Component
{
  render() {
    return (
      <View>
        <Text> This is where the people will be shown </Text>
      </View>
    );
  }
}
