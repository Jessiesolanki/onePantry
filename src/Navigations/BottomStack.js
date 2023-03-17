import 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
// import { createBottomStackNavigator } from '@react-navigation/bottom-tabs';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import FavoriteStack from './FavoriteStack';
import ShopStack from './ShopStack';
import {IMAGE,COLORS, TEXT} from '../Constant/Images/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { color } from 'react-native-reanimated';
import { hp } from '../Components/Config';

const Tab = createBottomTabNavigator();
const BottomStack = () => {
  
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName='HomeStack'
     
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: { height: hp(9), width: '100%', },
        tabBarHideOnKeyboard: true,
       
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
      
        listeners={{
        // tabPress: e => {
        //   getRefreshHome ? navigation.push('HomeScreen'):null
      
        //   },
        } }
        options={{ 
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? COLORS.Green : '#AEAEB2',fontSize:10}}>Home</Text>
          ),
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 23, height: 23, tintColor: focused ? COLORS.Green : '#AEAEB2', resizeMode: 'contain',marginTop:15 }} source={IMAGE.HomeNav} />,
          
        }} />
      <Tab.Screen

        name="FavoriteStack"
        component={FavoriteStack}
        // listeners={{
        //   tabPress: e => {
        //     getRefreshLead  ? navigation.push('LeadScreen'):null
        //   },
        // }}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? COLORS.Green : '#AEAEB2',fontSize:10}}>Favorite</Text>
          ),
          
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 23, height: 23, tintColor: focused ?COLORS.Green : '#AEAEB2', resizeMode: 'contain',marginTop:15 }} source={IMAGE.StarNav} />

        }} />

      <Tab.Screen
        name="ShopStack"
        component={ShopStack}
        // listeners={{
        //   tabPress: e => {
        //      navigation.push('MapScreen')
   
   
        //   },
        // }}
         options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? COLORS.Green : '#AEAEB2',fontSize:10}}>Shop</Text>
          ),
          
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 23, height: 23, tintColor: focused ?COLORS.Green : '#AEAEB2', resizeMode: 'contain',marginTop:15 }} source={IMAGE.ShoppingNav} />

        }} />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? COLORS.Green : '#AEAEB2',fontSize:10}}>Profile</Text>
          ),
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 23, height: 23, tintColor: focused ?COLORS.Green : '#AEAEB2', resizeMode: 'contain' ,marginTop:15}} source={IMAGE.UserNav} />

        }} />


    </Tab.Navigator>
  )
}

export default BottomStack

