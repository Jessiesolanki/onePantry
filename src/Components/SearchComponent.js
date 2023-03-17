import { View ,StyleSheet,Image,Dimensions, Text,TouchableOpacity} from 'react-native'
import React,{useState,useContext} from 'react'
import {IMAGE,COLORS, TEXT} from '../Constant/Images/index'
import InputText from '../Components/InputText'
import { useForm } from 'react-hook-form';
import { hp, wp } from './Config';
import { useNavigation } from '@react-navigation/native';
import {HomeContext} from '../Providers/HomeProvider';
const {width, height} = Dimensions.get('window');
const SearchComponent = ({style,styleView,TouchFn,returnKeyType,onSubmitEditing,textInputProps,controllerProps}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.mainView,styleView]}>
      {TouchFn ? 
  <TouchableOpacity onPress={()=>navigation.navigate('Search')} style={[styles.touchStyyle]}>
   <Image source={IMAGE.Search} style={{height:20,width:20,marginHorizontal:10}} />
  <Text style={{marginLeft:wp(1)}}>{'Search'}</Text>
  </TouchableOpacity>

:
      <InputText 
          label={' Search '}
          textInputProps={textInputProps}
          controllerProps={controllerProps}
        image={IMAGE.Search}
        style={[styles.inputStyle,style]}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
      }
       {/* <TextInput value={search} onChange={setsearch} placeholder={'Search'} image={IMAGE.Search} style={[styles.inputStyle,style]} KeyboardType={'default'} /> */}
       <Image source={IMAGE.Filter} resizeMode='contain' style={{width:37,height:37}}  />
       </View>
  )
}

export default SearchComponent
const styles = StyleSheet.create({
    mainView:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:8,
        width:width/1.1,
        alignSelf:'center'
    },
   inputStyle:{
    borderColor:COLORS.Green,
    borderRadius:13,
    height:hp(5),
    width:wp(72),
   
    
   },
   touchStyyle:{
    borderColor:COLORS.Green,
    borderRadius:13,
    height:hp(5),
    width:wp(72),
    borderWidth:1,
    // justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10

   }
 
})