import React, { Component } from 'react';
import {Alert, Button, View, Text, StyleSheet, Dimensions} from 'react-native';
import { Header } from 'react-native-elements';

export default class Follower extends Component
{
	render() {
		return(
			<View>
				<Header
					centerComponent = {{text: 'Followers'}}
				/>
				<Button
	        title="Follow"
	      />
	      <Button
	        title="Following"
	      />
			</View>
	);
	}
}
