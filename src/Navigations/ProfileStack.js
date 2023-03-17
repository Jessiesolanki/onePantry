import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profiles from '../Screens/ProfileScreen/Profiles';
const Profilestack= createStackNavigator();

const ProfileStack = () => {
  return (
    <Profilestack.Navigator>
        
       <Profilestack.Screen
          name="Profiles"
          component={Profiles}
          options={{ headerShown: false }}
        />
           
    
    </Profilestack.Navigator>
  )
}

export default ProfileStack