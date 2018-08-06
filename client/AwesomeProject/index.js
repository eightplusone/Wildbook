import { AppRegistry } from 'react-native';
import App from './App';
import Global from './global.js'; //need this so that you don't have to import the global user into every screen

AppRegistry.registerComponent('AwesomeProject', () => App);
