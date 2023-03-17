import { View } from 'react-native'
import React,{useEffect,useContext} from 'react'
import BackComponent from '../../Components/BackComponent'
import CheckoutCard from '../../Components/CheckoutCard'
import {HomeContext} from '../../Providers/HomeProvider';
import { useIsFocused } from '@react-navigation/native';

const Favorites = () => {
const {API_HOME,Favoritelist} = useContext(HomeContext);
const isFocused = useIsFocused();
const FavoriteList = useLoadingFn(API_HOME.FavoriteList);
const Favorite =()=>{ FavoriteList({ params: {}, onSuccess: () => {},})  }
useEffect(() => {
  Favorite()
}, [])
useEffect(() => {
  if (isFocused) {
    Favorite();
  }
}, [isFocused]);

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <BackComponent text={'Favorites'} />
        <View style={{padding:20}}>
{ Favoritelist?.search_data?.map((item)=> <CheckoutCard id={item.productDetail._id} textone={item.productDetail.name} texttwo={item.productDetail.description} textthree={item.productDetail.selling_price} image={item.productDetail.product_img[0].image} Fav /> )}
    </View>
    </View>
  )
}

export default Favorites