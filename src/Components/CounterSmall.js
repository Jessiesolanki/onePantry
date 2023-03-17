import { View, Text,Image,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { COLORS, IMAGE } from '../Constant/Images'
import { hp, wp } from './Config'
const CounterSmall = ({style,styleCount,count,setcount,styleimg}) => {
  
  return (
    <View style={[styles.mainView,style]}>
        <TouchableOpacity style={{height:10,width:20,justifyContent:'center',styleimg}} onPress={()=> count == 1 ? setcount(1) : setcount(count-1)}>
        <Image style={{width:14,height:3,marginRight:12}} source={IMAGE.Remove} />
        </TouchableOpacity>
        <View style={[styles.countView,styleCount]}>
        <Text style={{fontWeight:'600',fontSize:13,color:'#000'}}>{count}</Text>
    </View>
    <TouchableOpacity onPress={()=> setcount(count+1)}>
    <Image style={{width:14,height:14,marginLeft:12}} source={IMAGE.Add} />
    </TouchableOpacity>

    </View>
  )
}

export default CounterSmall
const styles= StyleSheet.create({
    mainView:{
        flexDirection:'row',
        alignItems:'center',
        width:wp(25),
        justifyContent:'center',
        height:hp(4.7),
        backgroundColor:'#fff',
        borderRadius:6,
        
        
    },
    countView:{
        height:hp(9),
        width:30,
        justifyContent:'center',
        alignItems:'center'
    }
})