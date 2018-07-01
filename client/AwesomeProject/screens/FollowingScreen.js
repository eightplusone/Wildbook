import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableHighlight, Image} from 'react-native';
import { Header} from 'react-native-elements';

export default class Follower extends Component
{
	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			followingArray: [],
		}
	}

	componentDidMount(){
		return fetch('http://34.204.0.81/api/users/user1/following_users')
		.then((response) => response.json())
		.then((responseJson) => {

			this.setState({
				isLoading: false,
				dataSource: responseJson,
			}, function(){
			});
		})
		.catch((error) =>{
			console.error(error);
		});
	}

	render() {
		return(

			<View>
				<Header
					centerComponent = {{
						 style: {color: 'white'},
						 text:	'Following'
					}}
				/>

				<View>
				<FlatList
					{...this.state.followingArray.map(followingArray2 => (followingArray2 = {followingArray.following_users}))}
          data={this.state.dataSource}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          numRows={1}
          renderItem={({item}) =>
          <View style = {{ flexDirection: 'row'}}>

						<Image source={require('../assets/Images/Female-Avatar.png')} style={{width: 50, height: 50, borderRadius: 50, marginLeft: 20, marginTop: 30}}/>

						<Text style = {{marginLeft: 20, marginTop: 30, color: 'blue', textDecorationLine: 'underline', textDecorationColor: 'blue'}}>
						{followingArray2.following_users}
						</Text>
          </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
				</View>
			</View>
	);
	}
}
