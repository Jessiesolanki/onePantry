import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

const CircleIcon = ({color,text,onPress}) => {
  return (
    
    <TouchableOpacity onPress={onPress} style={[styles.CircleView,{marginRight:5, backgroundColor:color,}]}>
    <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>


  )
}
 const styles = StyleSheet.create({

    CircleView:{
        height:40,
        width:40,
        borderRadius:50,
        justifyContent:'center'
    },
    text:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center'
    }
 })
export default CircleIcon