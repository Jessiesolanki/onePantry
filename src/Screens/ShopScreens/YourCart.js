import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BackComponent from '../../Components/BackComponent'
import { IMAGE, COLORS } from '../../Constant/Images'
import YourCartComponent from '../../Components/YourCartComponent'
import Button from '../../Components/Button'
import { useNavigation } from '@react-navigation/native'
import { wp } from '../../Components/Config'
import { ShopContext } from '../../Providers/ShopProvidre'
import { Image_URL } from '../../Providers'
import { useIsFocused } from '@react-navigation/native';
const YourCart = () => {
  const [count, setcount] = useState(1)
  const navigation = useNavigation();
  const { API_Shop, YourCartListData } = useContext(ShopContext);
  const YourCartList = useLoadingFn(API_Shop.YourCartList);
  const CheckOutDetail = useLoadingFn(API_Shop.CheckOutDetail);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
    YourCartList({ params: {}, onSuccess: () => { }, })
    }
  }, [isFocused])
  const OnCheckout =()=>{
    CheckOutDetail({ params: {}, onSuccess: () => {navigation.navigate('CheckOut') }, })
  }

  const data  = YourCartListData || []
console.log(YourCartListData,'YourCartListDataYourCartListData')

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <BackComponent text={'Your Cart'} />
     {YourCartListData.length == 0 ? <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <Text style={{color:'grey',fontSize:15}}>{'No Item In Your Cart List'}</Text>
      </View> : <View style={{ padding: 20 }}>
        {data?.map((item,index) => {

          if(index==data?.length-1)  return null
        console.log(item,'63ef592b74ddd3fc5c34da61')
          return <YourCartComponent image={{uri:Image_URL+item?.productDetail?.product_img[0].image}} textone={item?.productDetail?.category_id?.category_name} texttwo={item?.productDetail?.name} textthree={item?.productDetail?.selling_price} count={count} setcount={setcount} />
      
          
        }

        )
        }
        <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000B2', textAlign: 'right', marginRight: 20 }}>Total: <Text style={{ fontWeight: '600', fontSize: 20, color: '#56AB2F' }}>{`$ ${data[data?.length-1]?.finalPrice}`}</Text></Text>
        <Button title={'Checkout'} style={{ marginTop: 35, backgroundColor: COLORS.Green, borderRadius: 15, alignSelf: 'center', marginBottom: 10, width: wp(45) }} color={{ color: '#fff' }} onpress={OnCheckout} />
      </View>}
    </View>
  )
}

export default YourCart