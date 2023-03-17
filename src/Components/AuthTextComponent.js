import { View, Text ,StyleSheet } from 'react-native'
import React from 'react'
import {IMAGE,COLORS, TEXT} from '../Constant/Images/index'
const AuthTextComponent = ({title,text,style,styletwo}) => {
  return (
    <View style={{padding:18}}>
    <Text style={[styles.text,style]}>{title}</Text>
    <Text style={[styles.texttwo,styletwo]}>{text}</Text>
  </View>
  )
}

export default AuthTextComponent
const styles = StyleSheet.create({
  text:{
    fontWeight:'700',
    fontSize:18,
    color:COLORS.Green,
    marginBottom:8,
 
  },
  texttwo:{
    fontWeight:'400',
    fontSize:13,
    color:COLORS.Black,
    opacity:.6
  }
})