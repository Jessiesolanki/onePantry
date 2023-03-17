import { View, Text,Image,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import BackComponent from '../../Components/BackComponent'
import { COLORS, IMAGE, TEXT } from '../../Constant/Images'
import Button from '../../Components/Button'
import { useNavigation } from '@react-navigation/native';
const OrderConfirm = () => {
  const navigation = useNavigation();
  return (
    <View>
      <BackComponent text={'Order Confirmed'} />
      <Image style={{width:310,height:280,alignSelf:'center',marginTop:20}} source={IMAGE.OrderConfirm} />
      <Text style={{textAlign:'center',fontWeight:'500',fontSize:18,color:COLORS.Green,marginTop:40}}>Order Confirmed!</Text>
      <Text style={{textAlign:'center',fontWeight:'400',fontSize:14,color:'#7A7A7A',padding:55,marginTop:-40}}>{TEXT.orderConfirm}</Text>
      <Button title={'Done'} style={{backgroundColor:COLORS.Green,borderRadius:15,alignSelf:'center',width:170}} color={{color:'#fff'}} onpress={()=>navigation.navigate('Homes')} />

    </View>
  )
}

export default OrderConfirm