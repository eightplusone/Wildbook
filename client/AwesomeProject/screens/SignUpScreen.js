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

const User = t.struct({
  fname: t.String,
  lname: t.maybe(t.String),
  // email: t.String,
  username: t.String,
  password: t.String
});


export default class SignUpScreen extends Component {
  constructor(props){
  super(props);

  this.state = {
    authenticating:false,
  }
}


static navigationOptions = ({ navigation }) => ({});//?
//
// handleSubmit = () => {
//   const value = this._form.getValue(); // use that ref to get the form value
//   console.log('value: ', value);
// }

handleSubmit = () => {///??/??

  this.setState({
    authenticating:true
  })

  // const url = 'https://spotholes-casuru.c9users.io/api/v1/accounts/';
  const url = 'http://23.96.0.243:3000/api/users';
  const value = this._form.getValue();

  console.log(value);

  //sets the username and password of the current user so that you can use the app throughout
  global.currentUser.setUserName(value.username);
  global.currentUser.setPassword(value.password);

  //sets authenticating to false so that the server does not keep on authenticating
  this.setState({
    authenticating:false
  })

  //navigates to the homeSocial screen
  this.props.navigation.navigate("homeSocial");

  //used to post the user to the database so that one can do all of the things in the
  //app
  /*
  return fetch(url, {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(value)
    }).then((response) => response.json())
    .then(async(responseJson) => {
        console.log(responseJson);
      this.setState({
        authenticating:false
      })
    });
    */

}


  render() {
     //const { navigate } = this.props.navigation;//?

    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c} // assign a ref
          type={User}
        />
        <Button
          title="Sign Up"
          onPress={this.handleSubmit}
        />
        <Text>Or</Text>
<Button
  title="Already have an account?"
  onPress={()=>this.props.navigation.navigate('signIn')}
/>
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
