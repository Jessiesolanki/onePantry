import { View, Text ,StyleSheet,Image } from 'react-native'
import React, { useState ,useContext,useEffect} from 'react'
import { COLORS, IMAGE } from '../Constant/Images'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {HomeContext} from '../Providers/HomeProvider';
import { wp } from './Config'
const ItemInRowComponent = ({title,titletwo,styleView,styleTitle,styleTitletwo,image,like,setlike,product_id,islike}) => {
  const {ProductDtl,API_HOME,FavoriteData} = useContext(HomeContext);
  const AddFavorite = useLoadingFn(API_HOME.AddFavorite);

  const Onlike =()=>{
    AddFavorite({ params: {product_id:product_id}, onSuccess: () => {
      like == 0 ? setlike(1) : setlike(0)
       console.log('successssssss like')},})
  }
  useEffect(() => {
  islike === true && setlike(1)
  }, [])
  
  return (
    <View style={[styles.maunView,styleView]}>
    <Text style={[styles.title,styleTitle]}>{title}</Text>
  {image ? 
  <TouchableOpacity onPress={()=>Onlike()} >
 {like == 0 ? <Image style={{width:25,height:25,marginRight:6}} source={IMAGE.Like}  /> :
  <Image style={{width:22,height:20,marginRight:6}} source={IMAGE.Activelike}  /> }
  </TouchableOpacity>:
  <View style={{width:wp(40),alignItems:'flex-end'}}>
    <Text style={[styles.titletwo,styleTitletwo]}>{titletwo}</Text>
  </View>}


</View>
  )
}

export default ItemInRowComponent
const styles = StyleSheet.create({
    maunView:{
        flexDirection:'row',
        padding:3,
        justifyContent:'space-between',
        width:wp(92),
        alignSelf:'center',
        alignItems:'center'
    },
    title:{
        fontWeight:'600',
        fontSize:18,
        color:'#000000B2'
    },
    titletwo:{
        fontWeight:'400',
        fontSize:10,
        color:'#808080',
        
    }
})