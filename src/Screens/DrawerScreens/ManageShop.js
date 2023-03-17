import { View, Text } from 'react-native'
import React from 'react'
import BackComponent from '../../Components/BackComponent'

const ManageShop = () => {
  return (
    <View style={{flex:1}}>
      <BackComponent text={'ManageShop'}/>
      <View style={{flex:1,justifyContent:'center'}}>
      <Text style={{fontSize:20,color:'#56AB2F',fontWeight:'500',textAlign:'center',marginTop:5 }}>IN PROGRESS</Text>
      </View>
</View>
  )
}

export default ManageShop