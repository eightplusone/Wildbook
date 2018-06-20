
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  CameraRoll,
  ScrollView,
  Image
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import CameraRollPicker from 'react-native-camera-roll-picker';


export default class CameraRollProject extends Component {

  static navigationOptions = ({ navigation }) => ({});//?

  render() {
    const { navigate } = this.props.navigation;
      // if (!this.state.isCameraLoaded) {
      //   return (
      //     <View>
      //       <Text>Loading ...</Text>
      //     </View>
      //     );
      // }
      // return (
      //   <ScrollView style={styles.container}>
      //     <View style={styles.imageGrid}>
      //       { this.state.images.map((image) => <Image style={styles.image} source={{ uri: image.uri }} />) }
      //     </View>
      //   </ScrollView>
      // );


      return(
<View style={styles.container}>

<Button
  title="Upload"
  onPress={()=>this.props.navigation.navigate('')}
  style={styles.b}
/>

        <CameraRollPicker
          callback={this.getSelectedImages} />


</View>
      );
  }

}

const styles = StyleSheet.create({
  // image:{
  //
  // },
  // container:{},
  // imageGrid:{},
  //

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  b:{
    marginTop:200,
  },

 //  preview: {
 //   flex: 1,
 //   justifyContent: 'flex-end',
 //   alignItems: 'center',
 //   height: Dimensions.get('window').height,
 //   width: Dimensions.get('window').width
 // },
 //  capture: {
 //    flex: 0,
 //    backgroundColor: '#fff',
 //    borderRadius: 5,
 //    color: '#000',
 //    padding: 10,
 //    margin: 40
 //  }
});

// export default CameraRollProject;
