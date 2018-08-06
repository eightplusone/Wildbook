import React, { Component } from 'react';
import {Alert, Button, FlatList, ActivityIndicator,View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Camera from 'react-native-camera';
import MapView , {Marker} from 'react-native-maps';
import { Header, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator} from 'react-navigation';

export default class HomeTripScreen extends Component {

  //
  //
  // constructor(props){
  //     super(props);
  //    this.state ={ isLoading: true}
  //   }

 state = {
 		mapRegion: null,
 		lastLat: null,
 		lastLong: null,

    markers:[],
 	}

_onPressButton = () =>
{
   console.log(global.currentUser.getUserName());
   this.props.navigation.navigate('camera');
}

 componentDidMount(){

   this.watchID = navigator.geolocation.watchPosition((position) => {
   // Create the object to update this.state.mapRegion through the onRegionChange function
     let region = {
       latitude:       position.coords.latitude,
       longitude:      position.coords.longitude,
       latitudeDelta:  0.00922*1.5,
       longitudeDelta: 0.00421*1.5
     }
     this.onRegionChange(region, region.latitude, region.longitude);
   });

//data
      return fetch('http://23.96.0.243:3000/api/images')
       .then((response) => response.json())
       .then((responseJson) => {

         let markers = [...this.state.markers];
         markers = responseJson;
         this.setState({ markers });


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

 constructor(props) {
 super(props);

 // this.state ={ isLoading: true}

 // this.state = {
 // markers: [
 // {
 // // latlng: { latitude: marker.lat, longitude: marker.long}
 // }
 // ]
 // }
 }

 onRegionChange(region, lastLat, lastLong) {
 		this.setState({
 			mapRegion: region,
 			// If there are no new values set the current ones
 			lastLat: lastLat || this.state.lastLat,
 			lastLong: lastLong || this.state.lastLong
 		});
 	}

  _handleMapRegionChange = mapRegion => {
    // this.setState({ mapRegion });
  };

 componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
<View style ={styles.container}>
<Header
placement="left"
leftComponent={{ icon: 'pets' , onPress: () => {this.props.navigation.navigate('switchHome');}, color: '#fff'}}
centerComponent={{ text: 'Wildbook', onPress: () => {this.props.navigation.navigate('story');}, style: { color: '#fff' } }}
rightComponent={{ icon: 'notifications', onPress: () => {this.props.navigation.navigate('mainTabNavigator');}, color: '#fff' }}
/>
    <MapView
      style={styles.map}
      region = { this.state.mapRegion }
      showsUserLocation={true}
      followUserLocation={true}
      onRegionChange={this._handleMapRegionChange}
    >
    {this.state.markers.map(marker => (
                    <MapView.Marker key={marker.id}
                      coordinate={{
                        latitude: marker.lat,
                        longitude:marker.long,
                      }}
                      title={"marker.title"}
                      description={"marker.description"}
                       anchor={{ x: 0.20, y: 0.5 }}
                       // image={ <Image source = {{ uri: marker.url }}/>}
                    >
                      <Image source={{ uri: marker.url }} onLoad={() => this.forceUpdate()} style={{ width: 30, height: 30 }}  />
                    </MapView.Marker>
                  ))}
    </MapView>

    <SearchBar
  showLoading
  platform="android"
  placeholder='Search'/>

    <Button
          onPress={
            this._onPressButton}
          title="Camera"
        />

    </View>



// const data={this.state.dataSource};


//  data.items.map((item) => (
//
//   <MapView.Marker
//                coordinate={{
//                 latitude: item.lat,
//                 longitude:item.long,
//               }}
//               image={ <Image source = {{ uri: item.url }} style={{width: 10, height: 10}}/>}
//               >
//               <View>
//                 <Text style={{color: '#000'}}>
//                  {/* { this.state.lastLong } / { this.state.lastLat } */}
//                 </Text>
//               </View>
//             </MapView.Marker>
//
// ))

      //$$$data
      // <View style={{flex: 1, paddingTop:20}}>
      //   <FlatList
      //     data={this.state.dataSource}
      //     renderItem={({item}) => <Text>{item.username}, {item.password}, {item.fname}, {item.lname}</Text>}
      //     keyExtractor={(item, index) => index}
      //   />
      // </View>
    );

    //%%%map
//     const { region } = this.props;
// console.log(region);
//
// return (
//   <View style ={styles.container}>
//     <MapView
//       style={styles.map}
//       region={{
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }}
//     >
//     </MapView>
//   </View>
// );
//***camera
//     return (
//       <Camera
//    ref={(cam) => {
//        this.camera = cam;
//     }}
//     style={styles.preview}
//     aspect={Camera.constants.Aspect.fill}>
//        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
//           [CAPTURE]
//        </Text>
// </Camera>
//
//     );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    preview: {
       flex: 1,
       justifyContent: 'flex-end',
       alignItems: 'center',
       height: Dimensions.get('window').height,
       width: Dimensions.get('window').width
    },
    capture: {
       flex: 0,
       backgroundColor: '#fff',
       borderRadius: 5,
       color: '#000',
       padding: 10,
       margin: 40
    }
});
