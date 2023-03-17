import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homes from '../Screens/HomeScreens/Homes';
import ViewAllListing from '../Screens/HomeScreens/ViewAllListing';
import ItemDetails from '../Screens/HomeScreens/ItemDetails';
import Search from '../Screens/HomeScreens/Search';
const Homestack= createStackNavigator();

const HomeStack = () => {
  return (
    <Homestack.Navigator>
        
       <Homestack.Screen
          name="Homes"
          component={Homes}
          options={{ headerShown: false }}
        />
            <Homestack.Screen
          name="ViewAllListing"
          component={ViewAllListing}
          options={{ headerShown: false }}
        />
           <Homestack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={{ headerShown: false }}
        />
     
               <Homestack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
    </Homestack.Navigator>
  )
}

export default HomeStack