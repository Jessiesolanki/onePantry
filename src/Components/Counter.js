import { View, Text,Image,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { COLORS, IMAGE } from '../Constant/Images'
const Counter = ({style,styleCount,count,setcount,styleimg}) => {
  
  return (
    <View style={[styles.mainView,style]}>
        <TouchableOpacity style={{height:10,width:30,justifyContent:'center',styleimg}} onPress={()=> count == 1 ? setcount(1) : setcount(count-1)}>
        <Image style={{width:20,height:3.4,marginRight:12}} source={IMAGE.Remove} />
        </TouchableOpacity>
        <View style={[styles.countView,styleCount]}>
        <Text style={{fontWeight:'600',fontSize:19,color:'#000'}}>{count}</Text>
    </View>
    <TouchableOpacity onPress={()=> setcount(count+1)}>
    <Image style={{width:20,height:20,marginLeft:12}} source={IMAGE.Add} />
    </TouchableOpacity>

    </View>
  )
}

export default Counter
const styles= StyleSheet.create({
    mainView:{
        flexDirection:'row',
        alignItems:'center',
        width:130,
        justifyContent:'center',
        height:75,
        
    },
    countView:{
        height:50,
        width:50,
        borderWidth:1,
        borderColor:'#E2E2E2',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    }
})