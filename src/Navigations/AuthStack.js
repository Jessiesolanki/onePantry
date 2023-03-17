import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/AuthScreens/Login';
import Registration from '../Screens/AuthScreens/Registration';
import WalkThroughsscreens from '../Screens/AuthScreens/WalkThroughsscreens';
const Authstack= createStackNavigator();

const AuthStack = () => {
  return (
    <Authstack.Navigator>
    
        
       <Authstack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
          <Authstack.Screen
          name="WalkThroughsscreens"
          component={WalkThroughsscreens}
          options={{ headerShown: false }}
        />
           <Authstack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
    </Authstack.Navigator>
  )
}

export default AuthStack