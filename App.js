import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Button, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          region={{
            latitude: 59.32932349999999,
            longitude: 18.06858000000063,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >

          <MapView.Marker
            coordinate={{
              latitude: 59.32932349999999,
              longitude: 18.06858000000063
            }}
            title={'My marker title'}
            description={'My marker description'}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('Details', {
                itemId: 86,
                otherParam: 'anything you want here',
              });
            }}
          />

        </MapView>    
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});