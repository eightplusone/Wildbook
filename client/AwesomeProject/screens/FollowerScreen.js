import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableHighlight, Image} from 'react-native';
import { Header} from 'react-native-elements';

export default class Follower extends Component
{
	constructor(props){
		super(props);
		this.state ={ isLoading: true}
	}
	componentDidMount(){
		//&&&data
		return fetch('http://34.204.0.81/api/users/user5/followers')
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
						 text:	'Followers'
					}}
				/>
				<View>
				<FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          numRows={1}
          renderItem={({item}) =>
          <View style = {{ flexDirection: 'row'}}>
						<Image source={require('../assets/Images/Female-Avatar.png')} style={{width: 50, height: 50, borderRadius: 50, marginLeft: 20, marginTop: 30}}/>
						<Text style = {{marginLeft: 20, marginTop: 30, color: 'blue', textDecorationLine: 'underline', flexDirection: 'row'}}>
						{item.followers}
						</Text>

						<View>
					  <TouchableHighlight
         			style= {{width: 100, height: 50, marginLeft: 170, marginTop: 30, backgroundColor: 'gray'}}
        		>

						<Text> Following </Text>
        		</TouchableHighlight>
						</View>
          </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
				</View>
			</View>
	);
	}
}
