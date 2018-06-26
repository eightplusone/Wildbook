import React, { Component } from 'react';
import {Alert, View, Text, StyleSheet, Dimensions} from 'react-native';
import { Header } from 'react-native-elements';

export default class Following extends Component
{
	render() {
		return(
		<Header
	        centerComponent = {{text: 'Followings'}}
    />

		)
	}
}
