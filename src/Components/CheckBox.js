import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

const CheckBox = ({check,setcheck,title,style,setcheckref,checkref}) => {
  return (
  <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={()=>setcheck(check)} style={[styles.mainView,style]}>
    {check  &&  <View style={styles.innerView}></View>}
    </TouchableOpacity>
    <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default CheckBox
const styles = StyleSheet.create({
    mainView:{
        height:27,
        width:27,
        borderWidth:1,
        borderColor:"#07527C80",
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:2
    },
    innerView:{
        height:10,
        width:10,
        borderRadius:20,
        backgroundColor:'#07527C',
        
        
    },
    text:{
      fontSize:14,
      fontWeight:'400',
      color:'#242424',
        marginLeft:10,
        marginTop:2
        
    }
})