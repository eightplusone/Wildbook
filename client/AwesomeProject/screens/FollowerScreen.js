import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert} from 'react-native';
import { Header} from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import User from 'AwesomeProject/User.js';

<<<<<<< HEAD
//USES FOLLOWER MAP AS WELL AS INDIVIDUALUSERS
=======
//JUST USES INDIVIDUAL USERS
>>>>>>> Other

export default class Follower extends Component
{
	//creates the state for the variables that will be used later in the program
	//the following array gets the array from the database
	//the follower map is the hashmap that has all of the users
	//the individualUsers will be used when showing the different users using the flatlist
	state = {
		followingArray: [],
<<<<<<< HEAD
		followerMap: new Map(),
=======
>>>>>>> Other
		individualUsers: [],
	}

	constructor(props){
		super(props);
	}

	//****************************************************************************
	//componentDidMount()
	//nested the fetches so that the screen always shows the correct text on the
	//follow/following button
	componentDidMount(){

		//fetches the following users array from the database
		 fetch('http://23.96.0.243:3000/api/users/' + global.currentUser.getUserName() + '/following_users')
				.then((response) => response.json())
				.then((responseJson) => {

						//populates the following array in the state with what was in the responseJson
						var followingArray = [...this.state.followingArray];
						followingArray = responseJson[0].following_users;

						//sets the state of the following array
						this.setState({
							followingArray
						}, function(){
						});

						//fetches the follower array from the database
						fetch('http://23.96.0.243:3000/api/users/'+ global.currentUser.getUserName() + '/followers')
						.then((otherResponse) => otherResponse.json())
						.then((otherResponseJson) => {

<<<<<<< HEAD
							//creates a map that has the username as the key and
							//an User object with the userIcon, userName, and following status
							//instantiates the things from the state so that the state changes
							//based on user input
							var followerMap = this.state.followerMap;
							var individualUsers = [...this.state.individualUsers];
							var followingArray = [...this.state.followingArray];
=======
							//instantiates the individualUsers array which will be used in the FlatList
							var individualUsers = [...this.state.individualUsers];
>>>>>>> Other

							for(var i = 0; i < otherResponseJson[0].followers.length; i++) {
								//populates the user object, first userIcon, then userName, then following value
								var user = new User({userIcon: require('../assets/Images/Female-Avatar.png'), userName: otherResponseJson[0].followers[i], followingValue: this.areYouFollowing(otherResponseJson[0].followers[i])});

<<<<<<< HEAD
								//sets the username as the key and the User object as the value
								followerMap.set(otherResponseJson[0].followers[i], user);
							}

							//gets the keys of the hashmap
							var followerMapKeys = followerMap.keys();

							//loops through the hashmap
							for(var i = 0; i < followerMap.size; i++) {
								//puts the User object in an array to access later in the flatlist
								individualUsers[i] = followerMap.get(followerMapKeys.next().value);
							}
							//sets the state of the hashmap and individualUsers array
							this.setState({
								followerMap, individualUsers
=======
								//gives each element in the individualUsers array a user from the
								//follower array in the database
								individualUsers[i] = user;
							}

							//sets the state of the hashmap and individualUsers array
							this.setState({
							 individualUsers
>>>>>>> Other
							}, function(){
							});
							console.log(otherResponseJson);
						})
<<<<<<< HEAD
						.catch((error) =>{
=======
						.catch((error) => {
>>>>>>> Other
							console.error(error);
						});
					//goes with the following array responseJson
						console.log(responseJson);
					})
					.catch((error) =>{
						console.error(error);
					});
	}
	//end componentDidMount()
	//****************************************************************************

	//****************************************************************************
	//areYouFollowing()
	//checks to see if you are following a person in the follower array
	//returns booleans because booleans work when deciding which text to show on the button
	//true equals following, false equals follows
	//takes in the follower Array from the state, compares to following array to see
	//if you are follow or following the user
	areYouFollowing = (followerArrayUser) => {
		for(var i = 0; i < this.state.followingArray.length; i++) {
<<<<<<< HEAD
			console.log('following', this.state.followingArray[i]);
			console.log('user', followerArrayUser);
=======
>>>>>>> Other
			if(this.state.followingArray[i] === followerArrayUser) {
				//if you are following the follower, show following
				return true;
			}
		}
		//show follow if you are not following the follower
		return false;
	}
  //end areYouFollowing()
	//****************************************************************************


	//****************************************************************************
	//_changeToFollowOrFollowing()
	//change from follow to following or vice versa once a user presses the button
	//takes in the specific user in the flatlist and the index that the flatlist is
	//on in the individualUsers Array
	//false = show follow
	//true = show following
	_changeToFollowOrFollowing = (user, index) => {

		//gets the follower hashmap, individualUsers array, and the followingArray
		//from the state
<<<<<<< HEAD
		var followerMap = this.state.followerMap;
		var individualUsers = [...this.state.individualUsers];
		var followingArray = [...this.state.followingArray];
=======
		var individualUsers = [...this.state.individualUsers];
>>>>>>> Other

		//unfollows the follower
		//sets the following value to false because you are not following the user anymore
		//the states followerMap and individualUsers are updated, as well as the user in the
		//flatlist itself
		if(user.getFollowingValue() === true) {
			individualUsers[index].setFollowingValue(false);
<<<<<<< HEAD
			followerMap.set(user.getUserName(), user.setFollowingValue(false));
			user.setFollowingValue(false);
=======
>>>>>>> Other
			this.unfollowUser(user);
		}
		//follows the follower
		//sets the following value to true because you are now following the user
		else {
			individualUsers[index].setFollowingValue(true);
<<<<<<< HEAD
			followerMap.set(user.getUserName(), user.setFollowingValue(true));
			user.setFollowingValue(true);
=======
>>>>>>> Other
			this.followUser(user);
		}

		//sets the state of the follower hashmap, individualUsers and followingArray
		//arrays for later use
<<<<<<< HEAD
		this.setState({followerMap, individualUsers, followingArray});
=======
		this.setState({individualUsers});
>>>>>>> Other
	}
	//end _changeToFollowOrFollowing()
	//****************************************************************************

  //****************************************************************************
	//componentWillUnmount()
	//deletes all of the stuff that was created before rendering the screen
	//not sure if we need this however, doesn't seem to do anything since we
	//won't be using the things in the state in other screens, may increase
	//efficency
	componentWillUnmount = () => {
		delete this.state.followingArray;
<<<<<<< HEAD
		delete this.state.followerMap;
=======
>>>>>>> Other
		delete this.state.individualUsers;
	}
	//end componentWillUnmount()
	//****************************************************************************

	//****************************************************************************
	//render()
	// renders the screen
	//individualUsers is an array that holds each of the User objects
	//utilzes the User object methods, i.e. get and set
	render() {

		return(

			<View>

				<Header
					centerComponent = {{
						 style: {color: 'white'},
						 text:	'Followers'
					}}
				/>

				<FlatList
          data={this.state.individualUsers}
          ItemSeparatorComponent={this.FlatListItemSeparator}
					extraData={this.state}
          renderItem={({item, index}) =>

							<View style = {{flexDirection: 'row', borderBottomWidth: 1, borderColor: 'black'}}>

							<Image source={item.getUserIcon()} style= {styles.userIcon}/>

							<Text style = {styles.usernameStyle}> {item.getUserName()} </Text>

							<TouchableOpacity
										style = {styles.followButton}
										onPress = {() => this._changeToFollowOrFollowing(item, index)}
									>

									<Text style = {{color: 'white'}}> {item.getFollowingValue() === true ? 'following' : 'follow' } </Text>

							</TouchableOpacity>

							</View>

					}
					keyExtractor={item => item.getUserName()}
				/>

			</View>
			);
			}
		//end render()
		//**************************************************************************

		//**************************************************************************
		//followUser()
		//follows user that is passed from the flatlist
		//global.currentUser is the currentUser
		followUser(user) {
			var data = new FormData();
			data.append('follower_id', global.currentUser.getUserName()); //follower is you
			data.append('followee_id', user.getUserName()); //followee is the person who is followed

			//posts it to the database so it will show on the following screen
			const config = {
				method: 'POST',
				body: data,
			}
			var url = 'http://23.96.0.243:3000/api/users/' + global.currentUser.getUserName() + '/following_users/' + user.getUserName()
			fetch(url, config)
			 .then((responseData) => {
					 // Log the response from the server
					 // Here we get what we sent to Postman back
					 console.log(responseData);
			 })
			 .catch(err => {
				 console.log(err);
			 })
		}
		//end followUser()
		//**************************************************************************

		//**************************************************************************
		//unfollowUser()
		//unfollows user that is passed from the flatlist
		//global.currentUser is the currentUser
		unfollowUser(user) {
			var data = new FormData();
			data.append('follower_id', global.currentUser.getUserName()); //follower_id is you
			data.append('followee_id', user.getUserName()); //followee is the person who is followed, not you

			//deletes the user from the following array in the database
			const config = {
				method: 'DELETE',
				body: data,
			}
			var url = 'http://23.96.0.243:3000/api/users/' + global.currentUser.getUserName() + '/following_users/' + user.getUserName()
			fetch(url, config)
			 .then((responseData) => {
					 // Log the response from the server
					 // Here we get what we sent to Postman back
					 console.log(responseData);
			 })
			 .catch(err => {
				 console.log(err);
			 })
		}
		//end unfollowUser()
		//**************************************************************************
}

const styles = StyleSheet.create({
	//used for the userIcon
	userIcon : {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginLeft: 50,
		marginTop: 20,
	},
	//used for the follow button
	followButton : {
		width: 100,
		height: 50,
		backgroundColor: 'deepskyblue',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 100,
		marginTop: 20,
	},
	//used for the userName
	usernameStyle : {
		marginLeft: 10,
		marginTop: 40,
	}
});
