// import React from 'react';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
// import ProfileScreen from '../screens/ProfileScreenList';
import ProfileNavigator from '../screens/ProfileNavigator';
import HomeSocialScreen from '../screens/HomeSocialScreen'
import MoreScreen from '../screens/MoreScreen';;

// const HomeStack = StackNavigator({
//   Home: { screen: HomeScreen },
//   Details: { screen: DetailsScreen },
// });
//
// const SettingsStack = StackNavigator({
//   Settings: { screen: SettingsScreen },
//   Details: { screen: DetailsScreen },
// });

const MainNavigation = new TabNavigator(
// export default TabNavigator(
  {
    profile: {screen: ProfileNavigator},
    homeSocial: { screen: HomeSocialScreen },
    more: { screen: MoreScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'homeSocial') {
          iconName = `md-home`;
        } else if (routeName === 'more') {
          iconName = `md-menu`;
        }else if (routeName === 'profile') {
          iconName = `md-person`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={50} color={tintColor} />;
      },
    }),
    initialRouteName: 'homeSocial',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: true,
  }
);

export default class MainTabNavigator extends Component {
  render() {
    return <MainNavigation />;
  }
}
