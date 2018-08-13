// import React from 'react';
import React, { Component } from 'react';
import {AppRegistry, Button, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator, TabBar } from 'react-navigation'; // Version can be specified in package.json
import ProfileScreenMap from './ProfileScreenMap';
import ProfileScreenList from './ProfileScreenList';
import ProfileScreenGrid from './ProfileScreenGrid';


// const HomeStack = StackNavigator({
//   Home: { screen: HomeScreen },
//   Details: { screen: DetailsScreen },
// });
//
// const SettingsStack = StackNavigator({
//   Settings: { screen: SettingsScreen },
//   Details: { screen: DetailsScreen },
// });

class ChildScene1 extends React.Component {
  render(){
    return(
      <View>
         <Text> this is content of Child Tab1 </Text>
      </View>
    )
  }
}

class ChildScene2 extends React.Component {
   render(){
     return(
       <View>
         <Text> this is content of Child Tab2 </Text>
       </View>
     )
   }
}



class ChildScene3 extends React.Component {
    render(){
      return(
        <View>
           <Text> this is content of Child Tab3 </Text>
        </View>
      )
    }
}

class ChildScene4 extends React.Component {
    render(){
      return(
        <View>
           <Text> this is content of Child Tab4 </Text>
        </View>
      )
    }
}

// const ParentScene1 = TabNavigator ({
//   Tab1: { screen: ChildScene1 },
//   Tab2: { screen: ChildScene2 }
// });
//
// const ParentScene2 = TabNavigator ({
//   Tab1: { screen: ChildScene3 },
//   Tab2: { screen: ChildScene4 }
// });

const GParentScene = TabNavigator({
  // A: { screen: ChildScene1 },
  // B: { screen: ChildScene2 },
      map: {screen: ProfileScreenMap},
      list: { screen: ProfileScreenList},
      // grid: { screen: ProfileScreenGrid},

});

// const GParentScene = TabNavigator({
//   A: { screen: ParentScene1 },
//   B: { screen: ParentScene2 },
// });

// const mainnav = new TabNavigator(
// // export default TabNavigator(
//   {
//     map: {screen: ProfileScreen},
//     list: { screen: ProfileScreen0},
//     grid: { screen: ProfileScreen1},
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         if (routeName === 'map') {
//           iconName = `md-home`;
//         } else if (routeName === 'list') {
//           iconName = `md-menu`;
//         }else if (routeName === 'grid') {
//           iconName = `md-person`;
//         }
//
//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//         return <Ionicons name={iconName} size={25} color={tintColor} />;
//       },
//     }),
//     initialRouteName: 'map',
//     tabBarComponent: TabBar,
//     // tabBar Position: 'right',
//     tabBarOptions: { style: { position: 'absolute', right: 400 } },
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//     swipeEnabled: true,
// lazyLoad: true,
// animationEnabled: false,
//   }
// );
//
export default class nav extends Component {
  render() {
    return (

      // <View>
      //  <Text> this is content of Child 777 </Text>
       <SimpleApp />
      // </View>

    );
  }
}
const SimpleApp = StackNavigator({
  Home: { screen: GParentScene, navigationOptions:{ title:'Profile',  //creates the title of the page
   // header:{ visible:false }
 } },
});

// AppRegistry.registerComponent('testtabs', () => SimpleApp);
