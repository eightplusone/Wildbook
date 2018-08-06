import React, { Component } from 'react';

//this class is what the follower and following screens use to get and set
//values of the user such as the userIcon, userName, and followingValue
export default class User extends Component {

	//creates the User object that has a userIcon, a userName, and a followingValue
	//passes in an object because javascript does not allow overloading of functions
	//checks to see whether each value is undefined or not, if it is then it skips that
	//initialization
	constructor(obj) {
		super();
		if(obj.userIcon !== undefined) {
			this.userIcon = obj.userIcon;
		}
		if(obj.userName !== undefined) {
			this.userName = obj.userName;
		}
		if(obj.followingValue !== undefined) {
			this.followingValue = obj.followingValue;
		}
		if(obj.password !== undefined) {
			this.password = obj.password;
		}
	}


	//gets the instances userIcon
	getUserIcon() {
		return this.userIcon;
	}

	//gets the instances userName
	getUserName() {
		return this.userName;
	}

	//gets the instances following value
	getFollowingValue() {
		return this.followingValue;
	}

	//gets the instances password
	getPassword() {
		return this.password;
	}

	//sets the instances userIcon
	setUserIcon(userIcon) {
		this.userIcon = userIcon;
	}

	//sets the instances userName
  setUserName(userName) {
		this.userName = userName;
	}

	//sets the instances following value
	setFollowingValue(followingValue) {
		this.followingValue = followingValue;
	}

	//sets the instances password
	setPassword(newPassword) {
		this.password = newPassword;
	}
}
