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

export default class HomeTripScreen extends Component {

  constructor(props){
      super(props);
      this.state ={ isLoading: true}
    }

 componentDidMount(){
   //&&&data
  // return fetch('https://facebook.github.io/react-native/movies.json')
  // return fetch('http://34.204.0.81/api/users')
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
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) =>
          <View>
            <Text>{item.username}, {item.lat}, {item.long}, {item.timestamp}</Text>
            <Image source = {{ uri: item.url }} style={{width: 50, height: 50}}/>
</View>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
