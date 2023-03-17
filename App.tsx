/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useContext}from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import RootStack from './src/Navigations/RootStack';
import Providers from './src/Providers/index'
import {LogBox} from "react-native";


const App = () => {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    ])
  return (
    <Providers>
        <NavigationContainer >
          <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
          <RootStack />
        </NavigationContainer>
    </Providers>
    )
}
export default App;
