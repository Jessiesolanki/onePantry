import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../Screens/FavoriteScreens/Favorites';
const Favoritestack= createStackNavigator();

const FavoriteStack = () => {
  return (
    <Favoritestack.Navigator>
        
       <Favoritestack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
           
    
    </Favoritestack.Navigator>
  )
}

export default FavoriteStack
