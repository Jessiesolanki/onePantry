import { View, Text ,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList,Dimensions} from 'react-native'
import React from 'react'
const {width, height} = Dimensions.get('window');
import {IMAGE,COLORS, TEXT} from '../Constant/Images/index'
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from './Config';
//marginTop:23,left:310
const BackComponent = ({text,image,onPress , empty,setedit}) => {
  console.log("empty data recieved" , empty)
    const navigation = useNavigation();
    const navigateBack =()=>{
      navigation.goBack()
      if(empty){
        console.log("empty function recieved" , empty)
      }
    }
  return (
    <View style={styles.mainView}>
        <TouchableOpacity onPress={navigateBack}>
        <Image source={IMAGE.Back} resizeMode='contain' style={{width:20,height:22,marginTop:20}}  />
        </TouchableOpacity>
   <View style={styles.textView}>
   <Text style={[styles.text,{marginRight:image ? 20:35}]}>{text}</Text>
   </View>
   { image &&  <TouchableOpacity onPress={onPress} >
        <Image source={image} resizeMode='contain' style={{width:20,height:22,marginTop:20,marginLeft:-30}}  />
        </TouchableOpacity>}
   </View>
  )
}

export default BackComponent
const styles = StyleSheet.create({
    mainView:{
        height:hp(12),
        alignItems:'center',
        flexDirection:'row',
          padding:20,
          justifyContent:'space-between'
    },
    textView:{
         width:wp(80),
         marginTop:20,
        alignItems:'center',
        alignSelf:'center'
        
    },
    text:{
    fontWeight:'600',
    fontSize:18,
    color:COLORS.Green,
    }
})