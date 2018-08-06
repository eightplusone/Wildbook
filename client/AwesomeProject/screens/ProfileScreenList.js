import React, { Component } from 'react';
import {Alert, Button, FlatList, ActivityIndicator,View, Text, StyleSheet, Dimensions,Image, TouchableOpacity} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';
import { Header, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator} from 'react-navigation';

export default class HomeTripScreen extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, showSoundImg: true,   markers:[]}
  }

  componentDidMount(){
    //&&&data
    // return fetch('http://23.96.0.243:3000/api/users/user1')
    // .then((response) =>23.96.0.243:3000son())
    // .then((responseJson) => {
    //   this.setState({
    //              let posts = [...this.state.posts];
    //              posts = responseJson;
    //              this.setState({ posts });
    //              console.log(responseJson);
    //
    //   }, function(){
    //   });
    // })
    // .catch((error) =>{
    //   console.error(error);
    // });
    //
    // getPosts();
  }

  getPosts(){
    // this.state.posts.map(post => (
    //           fetch('http://23.96.0.243:3000/api/users/user1')
    //           .then((response) => response.json())
    //           .then((responseJson) => {
    //             this.setState({
    //                       isLoading: false,
    //                       dataSource: responseJson,
    //             }, function(){
    //             });
    //           })
    //           .catch((error) =>{
    //             console.error(error);
    //           });
    //
    //               ));
  }

  renderImage() {
    var imgSource = this.state.showSoundImg? require('../assets/Images/liked.png') : require('../assets/Images/like.png');
    return (
      <Image source={ imgSource }
      style={{width: 30, height: 30, marginRight: 10, marginLeft:10,}}/>
    );
  }

  render() {
    return(
      //$$$data
      <View style={{flex: 1, paddingTop:20}}>

    </View>
  );
}
}

const styles = StyleSheet.create({
  canvas: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  }
});
