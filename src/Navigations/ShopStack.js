import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Shops from '../Screens/ShopScreens/Shops';
import OrderConfirm from '../Screens/ShopScreens/OrderConfirm';
import YourCart from '../Screens/ShopScreens/YourCart';
import CheckOut from '../Screens/ShopScreens/CheckOut';
const Shopstack= createStackNavigator();

const ShopStack = () => {
  return (
    <Shopstack.Navigator initialRouteName='YourCart'>
        
      
         
               <Shopstack.Screen
          name="YourCart"
          component={YourCart}
          options={{ headerShown: false }}
        />
          <Shopstack.Screen
          name="Shops"
          component={Shops}
          options={{ headerShown: false }}
        />
          <Shopstack.Screen
          name="OrderConfirm"
          component={OrderConfirm}
          options={{ headerShown: false }}
        />
               <Shopstack.Screen
          name="CheckOut"
          component={CheckOut}
          options={{ headerShown: false }}
        />
           
    </Shopstack.Navigator>
  )
}

export default ShopStack