import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableHighlight, Image} from 'react-native';
import { Header} from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import User from 'AwesomeProject/User.js';

//JUST USES THE INDIVIDUAL USERS ARRAY

//shows the users that you are following
export default class Following extends Component
{
	//creates a the followingMap which is a hashmap that has a user as the key
	//and the userIcon and userName as the values
	//individualUsers is created to utilize the flatlist and display data
	state = {
		individualUsers: [],
	}

	constructor(props) {
  	super(props);
  }

	//****************************************************************************
	//componentDidMount()
	//gets the following_users array from the database and populates it into the
	//followingMap
	//then passes the User objects to the individualUsers array so that the FlatList
	//can show the users
	componentDidMount(){

		 fetch('http://23.96.0.243:3000/api/users/' + global.currentUser.getUserName() +  '/following_users')
		.then((response) => response.json())
		.then((responseJson) => {

		//initializes the followingMap and the individualUsers array to what it is in the state
		var individualUsers = [...this.state.individualUsers];

		for(var i = 0; i < responseJson[0].following_users.length; i++) {
			var user = new User({userIcon: require('../assets/Images/Female-Avatar.png'),
			userName: responseJson[0].following_users[i]});

			//gives each element in the individualUsers array a user from the
			//follower array in the database
			individualUsers[i] = user;
		}

		//sets the state of the followingMap and individualUsers so that they can
		//be used later
		this.setState({
			isLoading: false,
			individualUsers,
		}, function(){
		});
	 console.log(responseJson);
	})
	.catch((error) =>{
		console.error(error);
	});
	}
	//end componentDidMount()
	//****************************************************************************

	//****************************************************************************
	//componentWillUnmount()
	//deletes all of the stuff that was created before rendering the screen
	//not sure if we need this however, doesn't seem to do anything since we
	//won't be using the things in the state in other screens, may increase
	//efficency
	componentWillUnmount = () => {
		//delete this.state.followingMap;
		delete this.state.individualUsers;
	}
	//end componentWillUnmount()
	//****************************************************************************

	//****************************************************************************
	//render()
	//renders the users that the current user is following
	render() {
		return(
			<View>
				<Header
					centerComponent = {{
						 style: {color: 'white'},
						 text:	'Followings'
					}}
				/>

				<View>
				<FlatList
          data={this.state.individualUsers}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) =>
					<View style = {{flexDirection: 'row', borderBottomWidth: 1, borderColor: 'black'}}>

					<Image source={item.getUserIcon()} style= {styles.userIcon}/>

					<Text style = {styles.usernameStyle}> {item.getUserName()} </Text>

					</View>

          }
          keyExtractor={(item, index) => index.toString()}
        />
				</View>
			</View>
	);
	}
	//end render()
	//****************************************************************************
}

const styles = StyleSheet.create({
	//the userIcon uses this style
	userIcon : {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginLeft: 50,
		marginTop: 20,
	},
	//the username uses this style
	usernameStyle : {
		marginLeft: 10,
		marginTop: 40,
	}
});
