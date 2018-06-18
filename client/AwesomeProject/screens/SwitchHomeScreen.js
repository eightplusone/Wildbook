import React, { Component } from 'react';
import {Alert, Button, FlatList, AsyncStorage, ActivityIndicator,View, Text, StyleSheet, Dimensions} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigator} from 'react-navigation';

export default class CameraScreen extends Component {//?????

  async authenticateOrReroute(){

    const authToken = await AsyncStorage.getItem('@arcVuuAuthtoken');////????
    console.log(authToken);
    if (authToken == null){
      this.props.navigation.navigate('auth');
    } else {
      this.props.navigation.navigate('homeSocial');
    }
  }

  componentDidMount(){
    this.authenticateOrReroute();
  }

  render(){

    return(
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      );
  }

}

const styles = StyleSheet.create({

});
