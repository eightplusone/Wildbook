import React, { Component } from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {TouchableOpacity, Text, View} from 'react-native';

export default class SearchScreenHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {searchText: ''};
    // this.updateSearch = this.updateSearch.bind(this);
  }

  // updateSearch = (text) => {
  //   console.log(this.state.search);
  //    this.setState({search: text});
  //    console.log(this.state.search);
  // }

  // _onPress = () => {
  //   console.log(this.state.searchText);
  // }

  render() {

    var filtered

    return (

      <View>

        <SearchBar
          showLoading
          lightTheme
          cancelButtonTitle="Cancel"
          platform="android"
          placeholder='Search'

          value = {this.state.searchText}
          onChangeText = {(text) => this.setState({searchText: text})}
        />

      </View>

    );
  }
}
