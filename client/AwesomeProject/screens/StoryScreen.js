import React, { Component } from 'react';
import {Alert, Button, FlatList, ActivityIndicator,View, Text, StyleSheet, Dimensions,Image, TouchableOpacity, ScrollView} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';
import { Header, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigator} from 'react-navigation';

export default class HomeTripScreen extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, storyImages:[]}
  }

  componentDidMount(){
    return fetch('http://23.96.0.243:3000/api/images')
     .then((response) => response.json())
     .then((responseJson) => {

       let markers = [...this.state.storyImages];
       storyImages = responseJson;
       this.setState({ storyImages });
       console.log(responseJson);

       // this.setState({
       //   isLoading: false,
       //   marker: responseJson.data,
       // }, function(){
       // });

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
      leftComponent={{ icon: 'arrow-back' , onPress: () => {this.props.navigation.navigate('homeSocial');}, color: '#fff'}}
      centerComponent={
          <View style={{flexDirection: 'row'}} >
          <Image source={require('../assets/Images/Female-Avatar.png')} style={{width: 50, height: 50, borderRadius: 50,}}/>
<View style={{flexDirection: 'column'}} >
      <Text style={{ color: '#fff'}}> Username </Text>
      <Text style={{ color: '#fff'}}> location </Text>
      </View>
        </View>
      }
      rightComponent={{ icon: 'edit', color: '#fff' }}
      />

      <View style={{flex: 1, paddingTop:20 }}>
  <ScrollView horizontal={true}>

      {this.state.storyImages.map(storyImage => (
                        <Image style={styles.storyImage} key={storyImage.id} source={{ uri: storyImage.url }} onLoad={() => this.forceUpdate()} />

                    ))}
  </ScrollView>
      </View>

      <Text> Species Found In This Story  </Text>

    <View>
    <ScrollView horizontal={true}>
        <Image style={styles.animalImage} source={require('../assets/Images/1.jpg')} />
        <Image style={styles.animalImage} source={require('../assets/Images/2.jpg')} />
        <Image style={styles.animalImage} source={require('../assets/Images/3.jpg')} />
        <Image style={styles.animalImage} source={require('../assets/Images/3.jpg')} />
    </ScrollView>
</View>

    </View>
  );
}
}

const styles = StyleSheet.create({
  canvas: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  storyImage:{
marginRight:10,
marginLeft:10,
width: Dimensions.get('window').width/3,
height: 400
  },
  animalImage:{
marginRight:10,
marginLeft:10,
marginBottom: 10,
width: Dimensions.get('window').width/4,
height: 200
  },
});
