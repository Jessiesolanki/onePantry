import { View, Text,Image, } from 'react-native'
import React from 'react'
import { hp, wp } from './Config'
//height:110,width:110,right:138,top:80
const LoginHeader = () => {
  return (
    <View style={{}}>
    <Image source={require('../Constant/Images/loginBg.png')} style={{width:wp(100),height:hp(27)}}  />
    <View style={{height:hp(30),width:wp(100),position:'absolute',justifyContent:'center',alignItems:'center'}}>
    <Image source={require('../Constant/Images/Logo.png')}  style={{height:110,width:110,marginTop:30}}  />

    </View>
  </View>
  )
}

export default LoginHeader