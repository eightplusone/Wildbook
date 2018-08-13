import React, { Component } from 'react';
import {Alert, Button, FlatList, ActivityIndicator,View, Text, StyleSheet, Dimensions,Image} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';
import { Header, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator} from 'react-navigation';

export default class ProfileScreenMap extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('settings')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('logIn')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
