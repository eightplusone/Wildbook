import React, { Component } from 'react';
import {Alert, Button, FlatList, ActivityIndicator,View, Text, StyleSheet, Dimensions} from 'react-native';
import Camera from 'react-native-camera';
import MapView from 'react-native-maps';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigator} from 'react-navigation';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Authentication = t.struct({
  username: t.String,
  password: t.String,
});

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


export default class CameraScreen extends Component {
  constructor(props){
      super(props);

      this.state = {
        authenticating:"false",
      }
    }

static navigationOptions = ({ navigation }) => ({});//?

handleSubmit = () => {//????

  this.setState({
    authenticating:"true"
  })

  this.props.navigation.navigate("homeSocial");

  // const url = 'https://spotholes-casuru.c9users.io/api/v1/auth/token/'
    const url = 'http://34.204.0.81/api/users';
  const value = this._form.getValue();
  console.log(value);
  // return fetch(url, {
  //   method:"POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body:JSON.stringify(value)
  //   }).then((response) => response.json())
  //   .then(async(responseJson) => {
  //    if("token" in responseJson){
  //      await AsyncStorage.setItem("@spotholesAuthToken", responseJson["token"]);
  //       this.props.navigation.navigate("homeSocial");
  //     }
  //     this.setState({
  //       authenticating:"false"
  //     });
  //
  //     console.log(responseJson);
  //   });
}

  render() {
    const { navigate } = this.props.navigation;//?

        return (
          <View style={styles.container}>
            <Form
              ref={c => this._form = c}
              type={Authentication}
            />
            <Button
              title="Sign In"
              onPress={this.handleSubmit}
            />
            <Text>Or</Text>
            <Button
              title="Sign Up"
              onPress={()=>this.props.navigation.navigate('signUp')}
            />
            <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>

          </View>


        );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
