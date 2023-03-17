import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState,useContext} from 'react'
import { IMAGE,COLORS } from '../Constant/Images'
import CounterSmall from '../Components/CounterSmall'
import { hp, wp } from './Config'
import { HomeContext } from '../Providers/HomeProvider'
import { ShopContext } from '../Providers/ShopProvidre'
import useLoadingFn from '../Hook/useLoadingFn'
import { Image_URL } from '../Providers';
const CheckoutCard = ({textone,texttwo,textthree,image,Fav,id,instock,onpress}) => {
   const {API_HOME} = useContext(HomeContext);
   const { API_Shop} = useContext(ShopContext);
  const AddFavorite = useLoadingFn(API_HOME.AddFavorite);

    const Delete =()=>{
         AddFavorite({ params: {product_id:id}, onSuccess: () => {}})
    }
 
  return (
    <View style={styles.mainView}>
    <View style={styles.innerView}>

  <View>
  <Text style={{fontWeight:'500',fontSize:17,color:'#494949'   }}>{textone}</Text>
  <Text style={{fontWeight:'400',fontSize:13,color:'#B1B1B1'}}>{texttwo}</Text>
  <Text style={{fontWeight:'500',fontSize:13,color:'#56AB2F',marginTop:6}}>{`$ ${textthree}`}</Text>
  <View style={{flexDirection:'row',position:'absolute',bottom:0,left:80,width:95,justifyContent:'space-between'}}>
 {Fav ?<>
  <TouchableOpacity onPress={Delete}>
  <Text style={{fontWeight:'500',fontSize:11,color:'#D94928',marginTop:6}}>{'Delete'}</Text>
  </TouchableOpacity>
 
  </> :
  <><Text style={{fontWeight:'500',fontSize:11,color:'#046102',marginTop:6,marginRight:15}}>{instock == true ? 'In stock':'Out of stock'}</Text>
   <TouchableOpacity onPress={onpress}>
  <Text style={{fontWeight:'500',fontSize:11,color:'#D94928',marginTop:6}}>{'Delete'}</Text>
  </TouchableOpacity>
 </>}

  </View>
</View>
<View elevation={1} style={{height:hp(11),width:wp(24),backgroundColor:'#f8f8f9',justifyContent:'center',alignItems:'center',borderRadius:6}}>
<Image style={{ width: 65, height: 65, }} source={{uri:Image_URL+image}} />
</View>
    </View>
  
  </View>
  )
}

export default CheckoutCard
const styles = StyleSheet.create({
    mainView:{
        width:wp(90),
        height:hp(15),
      
        alignSelf:'center',
        flexDirection:'row',
        marginBottom:3,
        padding:20
    
    },
      innerView:{
        flexDirection:'row',
        height:hp(10),
        width:wp(85),
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center',
      
  
    },
})