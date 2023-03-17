import 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import BottomStack from './BottomStack';
import PrivacyPolicy from '../Screens/DrawerScreens/PrivacyPolicy';
import ManageShop from '../Screens/DrawerScreens/ManageShop';
import Settings from '../Screens/DrawerScreens/Settings';
import {IMAGE,COLORS, TEXT} from '../Constant/Images/index'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { AuthContext } from '../Providers/AuthProvider';
import useLoadingFn from '../Hook/useLoadingFn';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import { hp, wp } from '../Components/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image_URL } from '../Providers';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const DrawerStack = ({navigation}) => {
  const {API_CALL} = useContext(AuthContext);
const UserDetail = useLoadingFn(API_CALL.UserDetail);
useEffect(() => {
 UserDetail({ params: {}, onSuccess: () => {},})
}, [])
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerStyle: {width:wp(75)}}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageShop"
        component={ManageShop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: 'black',
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute',
    top: -8,
    left: 50,
    alignSelf: 'flex-start',
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
    height: 188,
  },
});
function CustomDrawerContent(props) {
    const [focused, setfocused] = useState(false)
    const navigation = useNavigation();
    const data = [
      {
        name: 'Home Listing',
        logo: IMAGE.HomeNav,
        logoActive: IMAGE.ActiveHome,
        root: 'Home',
        stack: 'HomeStack',
      },
    
      {
        name: 'Profile',
        logo:IMAGE.UserSideBar,
        logoActive: IMAGE.ActiveUser,
        stack: 'ProfileStack',
        root: 'profile',
        right: '1',
      },
      {
        name: 'Manage Shop',
        logo:IMAGE.Manage,
        logoActive: IMAGE.Manage,
        right: '1',
        root: 'ManageShop',
        stack: 'DrawerStack',
      },
      {
        name: 'Settings',
        logo:IMAGE.Setting,
        logoActive: IMAGE.Setting,
        right: '1',
        root: 'Settings',
        stack: 'DrawerStack',
        onpress: '2',
      },
      {
        name: 'Privacy Policy',
        logo:IMAGE.Privacy,
        logoActive: IMAGE.ActivePrivacy,
        root: 'PrivacyPolicy',
        stack: 'DrawerStack',
      },
      {
        name: 'Logout',
        logo:IMAGE.Logout,
        logoActive: IMAGE.Logout,
        root: 'Login',
        stack: 'AuthStack',
        onpress: '3',
      },
     
    ];
    const Logout = props => {
      // props.navigation.toggleDrawer();
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirm',
            onPress: async () => {
              await AsyncStorage.removeItem('token');
              // await AsyncStorage.removeItem('userDetails');
              navigation.replace('AuthStack',{screen:"Login"});
            },
          },
        ],
        {cancelable: false},
      );
    };

    const OnpressFn =(item,index)=>{
      setfocused(index) 
    item.name == 'Logout'? Logout():  navigation.navigate(item.stack, {screen: item.root})
    }
    return (
      <View style={{flex: 1}}>
        <DrawerProfile />
        <DrawerContentScrollView {...props}>
          {data.map((item, index) => (
            <View
              key={index}
              style={{}}>
  
  
                <DrawerItem
                  label={item.name}
                  labelStyle={{color:focused == index ?'#fff': '#535763F2', fontSize: 16, fontWeight: '700',opacity:focused == index ? null:.5}}
                  style={{height: 55,backgroundColor:focused == index ? COLORS.Green:null,borderRadius:12}}
                  icon={({}) => (
                    focused == index ? 
                    <Image style={{ width: 22, height: 22,marginRight: -15, resizeMode: 'contain', marginLeft: 5,  }} source={item.logoActive} />
                   : <Image style={{ width: 22, height: 22,marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={item.logo} />

                    )}
                  onPress={()=>OnpressFn(item,index)}
                //   onPress={() => {
                //     item.onpress == '1'
                //       ? Logout(props)
                //       : item.onpress == '2'? LearnApi(props):item.onpress==3?  navigation.navigate(item.stack, {screen: item.root,params:1}):item.onpress=='4'?SwitchLocation() : navigation.navigate(item.stack, {screen: item.root});
                //   }}
                />
  
              
            </View>
          ))}
        </DrawerContentScrollView>
      </View>
    );
  }
  const DrawerProfile = userData => {
    const {userDetail} = useContext(AuthContext);
    console.log("image recieved user detail" , userDetail)
 
    return (
      <View
        style={{
        }}>

        <Image style={{width:wp(75),height:hp(17) }} source={IMAGE.Header}/>
        <Image style={{width:57,height:57,position:'absolute',bottom:20,left:20,borderRadius:40 }} source={{uri:userDetail && userDetail.result.image}}/>

    <Text style={{fontSize:16,fontWeight:'600',position:'absolute',bottom:48,left:90,color:'#fff'}}>{userDetail && userDetail.result.first_name}</Text>
    <Text style={{fontSize:13,fontWeight:'500',position:'absolute',bottom:28,left:90,color:'#fff'}}>{userDetail && userDetail.result.email}</Text>
        
      </View>
    );
  };
