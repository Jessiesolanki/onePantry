import { View, Text,Image,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { IMAGE,COLORS } from '../Constant/Images'
import CounterSmall from '../Components/CounterSmall'
import { hp, wp } from './Config'
const YourCartComponent = ({textone,texttwo,textthree,image,count,setcount}) => {
    
  return (
    <View style={styles.mainView}>
    <View style={styles.innerView}>
    <Image style={{ width: 65, height: 65, }} source={image} />

<View>
  <Text style={{fontWeight:'400',fontSize:11,color:'#B1B1B1'}}>{textone}</Text>
  <Text style={{fontWeight:'500',fontSize:12,color:'#494949'}}>{texttwo}</Text>
  <Text style={{fontWeight:'500',fontSize:15,color:'#56AB2F',marginTop:6}}>{textthree}</Text>
</View>
<CounterSmall count={count} setcount={setcount} />
    </View>
  
  </View>
  )
}

export default YourCartComponent
const styles = StyleSheet.create({
    mainView:{
        width:wp(90),
        height:hp(14),
        backgroundColor:'#F8F8FB',
        alignSelf:'center',
        borderRadius:18,
        flexDirection:'row',
        marginBottom:20
    },
    innerView:{
        flexDirection:'row',
        alignItems:'flex-end',
        height:hp(8),
        width:wp(90),
        justifyContent:'space-around',
        alignSelf:'center'
    },
})