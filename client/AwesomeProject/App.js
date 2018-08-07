import React, { Component } from 'react';
import {Alert, FlatList, ActivityIndicator,View, Text, StyleSheet, Dimensions} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';
import { Header, SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import HomeSocialScreen from './screens/HomeSocialScreen';
import HomeTripScreen from './screens/HomeTripScreen';
import HomeSocialScreen from './screens/HomeSocialScreen'; //did not have this before so I added it
import MainTabNavigator from './Navigation/MainTabNavigator';
import CameraScreen from './screens/CameraScreen';
import SwitchHomeScreen from './screens/SwitchHomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import AuthScreen from './screens/AuthScreen';
import CameraRollScreen from './screens/CameraRollScreen';
import StoryScreen from './screens/StoryScreen';
import FollowerScreen from './screens/FollowerScreen';
import FollowingScreen from './screens/FollowingScreen';


////warning ignoring
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'The StackNavigator', 'Warning:']);
///
// export default Project = StackNavigator(
// {
//   Home: { screen: Home },
//   Camera: { screen: Camera },
// });

const App = StackNavigator(
   {
     homeTrip: { screen: HomeTripScreen},
<<<<<<< HEAD
     homeSocial: {screen: HomeSocialScreen},
=======
     homeSocial: { screen: HomeSocialScreen},
>>>>>>> Other
     camera: { screen: CameraScreen },
     switchHome: {screen: SwitchHomeScreen},
     auth: {screen: AuthScreen},
     signIn: {screen: SignInScreen},
     signUp: {screen: SignUpScreen},
     mainTabNavigator: {screen: MainTabNavigator},
     cameraRoll: {screen: CameraRollScreen},
     story: {screen: StoryScreen},
     follower: {screen: FollowerScreen},
     following: {screen: FollowingScreen},
   },
   {
     initialRouteName: 'homeTrip',
   },
  // { headerMode: 'screen' }
 );


 export default class Main extends Component {
  render() {
    return <App />;
  }
}
// //classss
// export default class HelloWorldApp extends Component {
//
//   constructor(props){
//       super(props);
//       // this.state ={ isLoading: true}
//     }
//
//  state = {
//  		mapRegion: null,
//  		lastLat: null,
//  		lastLong: null,
//  	}
//   //***Camera
// takePicture() {
//  this.camera.capture()
//     .then((data) => console.log(data))
//     .catch(err => console.error(err));
// }
// //
//
// _onPressButton = () =>
// {
//    this.props.navigation.navigate('CameraScreen');
//
// }
//  //      _onPressButton() {
//  //    // Alert.alert('You tapped the button!')
//  //
//  // this.props.navigation.navigate('Camera');
//  //    //     return (
//  //    //       <Camera
//  //    //    ref={(cam) => {
//  //    //        this.camera = cam;
//  //    //     }}
//  //    //     style={styles.preview}
//  //    //     aspect={Camera.constants.Aspect.fill}>
//  //    //        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
//  //    //           [CAPTURE]
//  //    //        </Text>
//  //    // </Camera>
//  //        // );
//  //  }
//
//  componentDidMount(){
//
//    this.watchID = navigator.geolocation.watchPosition((position) => {
//    // Create the object to update this.state.mapRegion through the onRegionChange function
//      let region = {
//        latitude:       position.coords.latitude,
//        longitude:      position.coords.longitude,
//        latitudeDelta:  0.00922*1.5,
//        longitudeDelta: 0.00421*1.5
//      }
//      this.onRegionChange(region, region.latitude, region.longitude);
//    });
//
//    //&&&data
//    // return fetch('https://facebook.github.io/react-native/movies.json')
//   // return fetch('http://34.204.0.81/api/users')
//   //
//   //    .then((response) => response.json())
//   //    .then((responseJson) => {
//   //
//   //      this.setState({
//   //        isLoading: false,
//   //        dataSource: responseJson,
//   //      }, function(){
//   //
//   //      });
//   //
//   //    })
//   //    .catch((error) =>{
//   //      console.error(error);
//   //    });
//  }
//
//  onRegionChange(region, lastLat, lastLong) {
//  		this.setState({
//  			mapRegion: region,
//  			// If there are no new values set the current ones
//  			lastLat: lastLat || this.state.lastLat,
//  			lastLong: lastLong || this.state.lastLong
//  		});
//  	}
//
//   _handleMapRegionChange = mapRegion => {
//     // this.setState({ mapRegion });
//   };
//
//  componentWillUnmount() {
// 		navigator.geolocation.clearWatch(this.watchID);
// 	}
//
//
//   render() {
//
//     if(this.state.isLoading){
//       return(
//         <View style={{flex: 1, padding: 20}}>
//           <ActivityIndicator/>
//         </View>
//       )
//     }
//
//     return(
// <View style ={styles.container}>
// <Header
// placement="left"
// leftComponent={{ icon: 'pets' , color: '#fff'}}
// centerComponent={{ text: 'Wildbook', style: { color: '#fff' } }}
// rightComponent={{ icon: 'notifications', color: '#fff' }}
// />
//     <MapView
//       style={styles.map}
//       region = { this.state.mapRegion }
//       showsUserLocation={true}
//       followUserLocation={true}
//       onRegionChange={this._handleMapRegionChange}
//     >
//     </MapView>
//
//
//     <SearchBar
//       showLoading
//       platform="android"
//       cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
//       placeholder='Search' />
//
//     <Button
//      // color="#841584"
//           onPress={
//             this._onPressButton}
//           title="Camera"
//           icon={{name: 'photo-camera'}}
//         />
//
//
// </View>
//
//
//       //$$$data
//       // <View style={{flex: 1, paddingTop:20}}>
//       //   <FlatList
//       //     data={this.state.dataSource}
//       //     renderItem={({item}) => <Text>{item.username}, {item.password}, {item.fname}, {item.lname}</Text>}
//       //     keyExtractor={(item, index) => index}
//       //   />
//       // </View>
//     );
//
//
//
//   //  ***camera
//     //     return (
//     //       <Camera
//     //    ref={(cam) => {
//     //        this.camera = cam;
//     //     }}
//     //     style={styles.preview}
//     //     aspect={Camera.constants.Aspect.fill}>
//     //        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
//     //           [CAPTURE]
//     //        </Text>
//     // </Camera>
//     //
//     //     );
//
//
//     //%%%map
// //     const { region } = this.props;
// // console.log(region);
// //
// // return (
// //   <View style ={styles.container}>
// //     <MapView
// //       style={styles.map}
// //       region={{
// //         latitude: 37.78825,
// //         longitude: -122.4324,
// //         latitudeDelta: 0.015,
// //         longitudeDelta: 0.0121,
// //       }}
// //     >
// //     </MapView>
// //   </View>
// // );
// //***camera
// //     return (
// //       <Camera
// //    ref={(cam) => {
// //        this.camera = cam;
// //     }}
// //     style={styles.preview}
// //     aspect={Camera.constants.Aspect.fill}>
// //        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
// //           [CAPTURE]
// //        </Text>
// // </Camera>
// //
// //     );
//   }
// }
// //classs

//***camera
// const styles = StyleSheet.create({
//   preview: {
//      flex: 1,
//      justifyContent: 'flex-end',
//      alignItems: 'center',
//      height: Dimensions.get('window').height,
//      width: Dimensions.get('window').width
//   },
//   capture: {
//      flex: 0,
//      backgroundColor: '#fff',
//      borderRadius: 5,
//      color: '#000',
//      padding: 10,
//      margin: 40
//   },
// });

//%%%map
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   map: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//     preview: {
//        flex: 1,
//        justifyContent: 'flex-end',
//        alignItems: 'center',
//        height: Dimensions.get('window').height,
//        width: Dimensions.get('window').width
//     },
//     capture: {
//        flex: 0,
//        backgroundColor: '#fff',
//        borderRadius: 5,
//        color: '#000',
//        padding: 10,
//        margin: 40
//     }
// });
