import React, { Component } from 'react';
import {Alert, Button, FlatList, ActivityIndicator,View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigator} from 'react-navigation';

export default class CameraScreen extends Component {

static navigationOptions = ({ navigation }) => ({});//?

  render() {
    const { navigate } = this.props.navigation;//?
        return (
          <View>

          <Image source={require('../assets/Images/wild-logo.png')} style={{ width: 200, height: 200 , justifyContent: 'center', alignItems: 'center'}}/>
          <Button
         title="Log In"
         onPress={()=>this.props.navigation.navigate('signIn')}
       />
       <Button
         title="Sign Up"
         onPress={()=>this.props.navigation.navigate('signUp')}
       />
       <Button
         title="To Follower Screen"
         onPress={()=>this.props.navigation.navigate('follower')}
       />
       <Button
        title="To Following Screen"
        onPress={()=>this.props.navigation.navigate('following')}
      />
     </View>
        );
  }
}

const styles = StyleSheet.create({
    preview: {
    },
});
