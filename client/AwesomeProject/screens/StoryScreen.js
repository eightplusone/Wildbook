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
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    //&&&data
    return fetch('http://34.204.0.81/api/images')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render() {
    return(
      //$$$data
      <View style={{flex: 1, paddingTop:20}}>
      <Header
      placement="left"
      leftComponent={{ icon: 'pets' , onPress: () => {this.props.navigation.navigate('homeTrip');}, color: '#fff'}}
      centerComponent={
        <SearchBar
        showLoading
        platform="android"
        placeholder='Search'
        containerStyle={{width: '200%'}}
        />
      }
      rightComponent={{ icon: 'notifications', color: '#fff' }}
      />

      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          numRows={1}
          renderItem={({item}) =>

          <View>
            <Image source = {{ uri: item.url }} style={{width: 50, height: 50}}/>
          </View>
          }
          keyExtractor={(item, index) => index}
        />
      </View>

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
