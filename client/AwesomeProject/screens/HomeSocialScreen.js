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
    this.state ={ isLoading: true, showSoundImg: true}
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

    // return fetch('http://34.204.0.81/api/images')
    //  .then((response) => response.json())
    //  .then((responseJson) => {
    //    this.setState({
    //      isLoading: false,
    //      dataSource: responseJson,
    //    }, function(){
    //    });
    //  })
    //  .catch((error) =>{
    //    console.error(error);
    //  });

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
      <FlatList
      data={this.state.dataSource}
      ItemSeparatorComponent = {this.FlatListItemSeparator}
      renderItem={({item}) =>
      <View>

      <View style={{flexDirection: "row"}}>
      <Image source={require('../assets/Images/Female-Avatar.png')} style={{width: 50, height: 50, borderRadius: 50,}}/>
      <View style={{flexDirection: "column"}}>
      <Text>{item.username}</Text>
      <Text> {item.lat}, {item.long}</Text>
      </View>
      </View>

      <Image source = {{ uri: item.url }}
      style={styles.canvas}/>

      <View style={{flexDirection: "row" , justifyContent: 'space-between',}}>
      <View style={{flexDirection: "row"}}>
      <View>
           <TouchableOpacity onPress={()=>this.setState({showSoundImg:!this.state.showSoundImg})}>
           {this.renderImage()}
           </TouchableOpacity>
           </View>
      <Image source={require('../assets/Images/comment.png')} style={{width: 30, height: 30,}}/>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate('story') }>
      <Image source={require('../assets/Images/wild-logo.png')} style={{width: 30, height: 30,}}/>
</TouchableOpacity>
      </View>

      <Text style={{marginRight: 10}}>{item.timestamp}</Text>
      </View>



      </View>
    }
    keyExtractor={(item, index) => index}
    />
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
