import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button
} from 'react-native';
import {StackNavigator} from 'react-navigation';


import Camera from 'react-native-camera';

const PicturePath = "";

export default class MyCamera extends Component {

  static navigationOptions = ({ navigation }) => ({});//?
  constructor(props) {
    super(props);
    this.state = {
      cameraType : 'back',
      mirrorMode : false
    }
  }

_switch  = () =>{
  this.props.navigation.navigate('cameraRoll')
}

  static navigationOptions = {
     // headerRight: (
     //   // <Button title="Load Images" onPress={()=>this.props.navigation.navigate('cameraRoll')}
     //
     //   // {this._switch}
     //    // />
     // ),
   }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Button
        title="CameraRoll"
        onPress={()=>this.props.navigation.navigate('cameraRoll')}
      />
       <Camera
           ref={(cam) => { this.camera = cam; }}
           style={styles.preview}
           aspect={Camera.constants.Aspect.fill}
           captureTarget={Camera.constants.CaptureTarget.disk}
           type={this.state.cameraType}
           mirrorImage={this.state.mirrorMode}
           flashMode={Camera.constants.FlashMode.on}
           >
           <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
           <Text style={styles.capture} onPress={this.storePicture.bind(this)}>[UPLOAD]</Text>
           <Text style={styles.capture} onPress={this.changeCameraType.bind(this)}>[SWITCH]</Text>

       </Camera>
      </View>
    );
  }

  changeCameraType() {
    if(this.state.cameraType === 'back') {
      this.setState({
        cameraType : 'front',
        mirrorMode : true
      })
    }
    else {
      this.setState({
        cameraType : 'back',
        mirrorMode : false
      })
    }
  }


  storePicture(){
      // if (PicturePath) {
        // Create the form data object
        var data = new FormData();
      //  data.append('imagefile', {uri: PicturePath, name: 'selfie.jpg',lat:"41.8694" ,long:"-87.65" ,location_id:"1" , text:"" , type: 'image/jpg'});
        data.append("imagefile", {uri: PicturePath, name: 'selfie.jpg', type: 'image/jpg'});
        // data.append("imagefile", PicturePath);
        data.append("lat",41.8694);
        data.append("long",-87.65);
        data.append("location_id",1);
        data.append("text",'hi');

        // Create the config object for the POST
        // typically have an OAuth2 token that you use for authentication
        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           //'Content-Type': 'multipart/form-data;',
           // 'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
         },
         body: data,
        }

        // fetch("https://postman-echo.com/post", config)
        fetch("http://23.96.0.243:3000/api/users/user1/posts", config)
         .then((responseData) => {
             // Log the response form the server
             // Here we get what we sent to Postman back
             console.log(responseData);
         })
         .catch(err => {
           console.log(err);
         })
    // }
  }

  takePicture() {
   this.camera.capture()
     .then((data) => {
         console.log(data);
          PicturePath = data.path;
        // PicturePath = data.uri;
     })
     .catch(err => console.error(err));

     this.storePicture();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    margin: 10
  }
});
