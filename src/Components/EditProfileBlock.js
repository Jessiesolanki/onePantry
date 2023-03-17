import { View, Text,StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { hp, wp } from './Config'
import InputText from './InputText'
import { IMAGE } from '../Constant/Images' 
const EditProfileBlock = ({title,value,name,setname,edit}) => {
  return (
    <View style={styles.mainView}>
  <Text style={[styles.textTitle,{marginBottom:edit== true ?0:7}]}>{title}</Text>
{edit !== true ?   <Text style={styles.textValue}>{value}</Text>
  :<TextInput
        style={{height:hp(5),width:wp(80),fontSize:14,
          color:'#242424',fontWeight:'400',right:5,top:4}}
        onChangeText={setname}
        value={name}
        
      />}
  {/* <InputText 
          label={label}
          // rightIconProps={{name: passwordVisible ? IMAGE.Greenkey : IMAGE.Show, color:'white',onPress: () => setPasswordVisibility(!passwordVisible), }}
          textInputProps={textInputProps}
          controllerProps={controllerProps}
          // imageLast={IMAGE.Show} styleeye={{marginLeft:0,right:15}} 
          // image={IMAGE.Password}
      /> */}
  </View>
  )
}

export default EditProfileBlock
const styles = StyleSheet.create({
    mainView:{
        width:wp(90),
        backgroundColor:'#fff',
        height:hp(9.4),
        alignSelf:'center',
        borderRadius:5,
        padding:19,
        justifyContent:'center',
        marginTop:10,
        elevation:2
    },
    textTitle:{
        fontWeight:'400',
        fontSize:12,
        color:'#808080',
      
    },
    textValue:{
        fontWeight:'400',
        fontSize:14,
        color:'#242424'
    }
})