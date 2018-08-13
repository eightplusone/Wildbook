import React, { Component } from 'react';
import {AppRegistry, Button, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator, TabBar } from 'react-navigation'; // Version can be specified in package.json
import {SearchBar, Header} from 'react-native-elements';
import HomeTripScreen from './HomeTripScreen';
import RecentScreen from './RecentScreen';
import AnimalScreen from './AnimalScreen';
import PeopleScreen from './PeopleScreen';
import LocationScreen from './LocationScreen';
import SearchScreenHeader from './SearchScreenHeader';

const GParentScene = TabNavigator({
      recent: {screen: RecentScreen},
      animal: { screen: AnimalScreen},
      people: { screen: PeopleScreen},
      location: {screen: LocationScreen},
});

export default class SearchScreenNavigator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SimpleApp/>
    );
  }
}
const SimpleApp = StackNavigator({
  Home: {screen: GParentScene, navigationOptions: {
    title: 'Search',
    header: <SearchScreenHeader/>,
  }},
});
