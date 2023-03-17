import 'react-native-gesture-handler';
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Splash from '../Screens/Splash';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';
const Stack = createStackNavigator();
//...TransitionPresets.ModalSlideFromBottomIOS stack navigator props for ios HeaderTabStack
const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{  headerShown: false, }} >
      <Stack.Screen name="Splash" component={Splash}  />
      <Stack.Screen name={'AuthStack'} component={AuthStack} />
      <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
    </Stack.Navigator>
  )
}

export default RootStack