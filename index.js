/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import Router from './src/navigation/Router';
import {name as appName} from './app.json';


LogBox.ignoreLogs(["EventEmitter.removeListener"]);

AppRegistry.registerComponent(appName, () => Router);
