import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, Dimensions, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import BackComponent from '../../Components/BackComponent'
import CheckoutCard from '../../Components/CheckoutCard'
import { IMAGE, COLORS, TEXT } from '../../Constant/Images'
import CheckBox from '../../Components/CheckBox'
import ItemInRowComponent from '../../Components/ItemInRowComponent'
import Button from '../../Components/Button'
import InputText, { CardInputText } from '../../Components/InputText'
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { hp, wp } from '../../Components/Config'
import useLoadingFn from '../../Hook/useLoadingFn'
import { HomeContext } from '../../Providers/HomeProvider'
import { ShopContext } from '../../Providers/ShopProvidre'
import { Image_URL } from '../../Providers'
import { Alert } from 'react-native/Libraries/Alert/Alert'
const { width, height } = Dimensions.get('window');
const CheckOut = () => {
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const navigation = useNavigation();
  const [check, setcheck] = useState(null)
  const [active, setactive] = useState(false)
  const [card, setcard] = useState('')
  const [numCVV, setnumCVV] = useState('')
  const [date, setdate] = useState('')
  const { API_HOME } = useContext(HomeContext);
  const { API_Shop, CheckoutDetail} = useContext(ShopContext);
  // const AddressSearching = useLoadingFn(API_HOME.AddressSearching)
  const AddressSearching = useLoadingFn(API_HOME.AddressSearching);
  const ShippingAddressDetail = useLoadingFn(API_Shop.ShippingAddressDetail);
  const CountryDetail = useLoadingFn(API_Shop.CountryDetail)
  const CartDelete = useLoadingFn(API_Shop.DeleteItemCart)
  


  const handleCheckbox = (value) => {
    value == 1 && setactive(true)
    setcheck(value);
  };
  // const { API_Shop, YourCartListData } = useContext(ShopContext);
  // const YourCartList = useLoadingFn(API_Shop.YourCartList);
  const onSearch =() => {
    AddressSearching({ params: {}, onSuccess: () => { }, })
  }
  
  const showDetail = () => {
    ShippingAddressDetail({ params: {}, onSuccess: () => { }, })
  }
  useEffect(() => {
    CountryDetail({ params: {}, onSuccess: () => { }, })

  }, [])

  const Yourcartdelete =(item)=>{
    console.log(item,'product_cart_idproduct_cart_id')
    CartDelete({ params: {product_cart_id : item}, onSuccess: () => { }, })

    // CartDelete({ params: {product_cart_id:item}, onSuccess: () => {},screenName:'delete'})
  }
  
  const data  = CheckoutDetail?.data||[]

  console.log("data recieved here____" , data.result)
//    
  return (
    <View style={styles.container}>
      <BackComponent text={'Checkout'} />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={styles.itemsText}>{'3 Items'}</Text>
{    data?.result?.map((item,index)=>{
  console.log("item recieved" , item)
   if(index == data?.length-1)  return null
   
 return <CheckoutCard delete_id={item?._id} onpress={()=>Yourcartdelete(item?._id)} textone={item?.productDetail?.name} texttwo={item?.productDetail?.category_id?.category_name} textthree={item?.productDetail?.selling_price} image={item?.productDetail?.product_img[0].image} instock={item?.productDetail?.in_stock}/>})
}         

          <View elevation={1} style={styles.addressView}>
            <TouchableOpacity 
            onPress={showDetail}
              style={styles.changeView}>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#56AB2F' }}>{'Change'}</Text>
            </TouchableOpacity>
            <Text style={styles.titleLightGrey}>{'Shipping Address'}</Text>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#242424' }}>{'250 High Rd, United Kingdom'}</Text>
          </View>
          <View elevation={1} style={styles.addressView}>
            <Text style={styles.titleLightGrey}>{'Payment Method'}</Text>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox check={check == 1} setcheck={() => handleCheckbox(1)} title={'Credit Card'} />
              <CheckBox check={check == 2} setcheck={() => handleCheckbox(2)} title={'Cash on Delivery'} style={{ marginLeft: 25 }} />
            </View>
          </View>
          <View style={[styles.outline, { height: 10, marginBottom: 7 }]}></View>
          <Text style={{ color: '#424347', fontWeight: '500', fontSize: 18, marginLeft: -2 }}>{'Order Summary'}</Text>
          <ItemInRowComponent title={'Order'} styleTitle={{ fontWeight: '400', fontSize: 15, color: '#3E3E3E' }} titletwo={'$ 65.00'} styleView={{ alignItem: 'center' }} styleTitletwo={{ color: '#3E3E3E', fontWeight: '400', fontSize: 15 }} />
          <ItemInRowComponent title={'Delivery Charges'} styleTitle={{ fontWeight: '400', fontSize: 15, color: '#3E3E3E' }} titletwo={'$ 10.00'} styleView={{ alignItem: 'center' }} styleTitletwo={{ color: '#3E3E3E', fontWeight: '400', fontSize: 15 }} />
          <ItemInRowComponent title={'Total Amount:'} styleTitle={{ fontWeight: '500', fontSize: 18, color: '#424347' }} titletwo={'$ 75.00'} styleView={{ alignItem: 'center' }} styleTitletwo={{ color: '#56AB2F', fontWeight: '500', fontSize: 18 }} />
          <Button title={'Confirm'} style={{ marginTop: 30, backgroundColor: COLORS.Green, borderRadius: 15, alignSelf: 'center', marginBottom: 10, width: wp(45) }} color={{ color: '#fff' }} onpress={()=>navigation.navigate('OrderConfirm')} />
        </View>
        <ModaFn modal={active} setmodal={setactive} card={card} setcard={setcard} date={date} setdate={setdate} numCVV={numCVV} setnumCVV={setnumCVV} />

      </ScrollView>

    </View>
  )
}

export default CheckOut
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffBfB'
  },
  itemsText: {
    fontWeight: '600',
    fontSize: 19,
    color: '#000000CC',
    marginLeft: 3
  },
  changeView: {
    height: 30,
    width: 60,
    position: 'absolute',
    right: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressView: {
    height: hp(10),
    width: wp(90),
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 13,
    marginBottom: 20,

  },
  titleLightGrey: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 8
  },
  outline: {
    borderBottomWidth: 1,
    borderColor: '#535763',
    height: hp(10),
    width: wp(90),
    alignSelf: 'center',
    marginTop: 20,
    opacity: .1
  },
  darkgrey: {
    fontWeight: '500',
    fontSize: 16,
    color: '#3A3C3F',
    marginVertical: 4,
    marginLeft: 10
  }
})
const ModaFn = ({ modal, setmodal, card, setcard, date, setdate, numCVV, setnumCVV }) => {
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={() => setmodal(false)}

      animationType="slid">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#00000010" }} >
        <View elevation={2} style={{ width: wp(90), height: hp(55), backgroundColor: '#ffffff', borderRadius: 10, }}>
          <View style={{ width: wp(90), height: hp(6), backgroundColor: COLORS.Green, borderTopLeftRadius: 13, borderTopRightRadius: 13, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ fontWeight: '600', fontSize: 20, color: '#fff' }}>{'Credit Card'}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.darkgrey}>Card number</Text>
            {/* <InputText value={card} onChange={setcard}  placeholder={'5261   4141   0151   8472'} style={{borderWidth:0}} imageLast={IMAGE.Visa} inputstyle={{width:wp(60),marginLeft:0}} circle KeyboardType={'numeric'} /> */}
            <InputText
              label={' card '}
              textInputProps={{ placeholder: '5261   4141   0151   8472', keyboardType: 'numeric', autoCapitalize: 'none', }}
              controllerProps={{
                name: 'card', control, errors,
                rules: { required: true, },
              }}
              style={{ borderWidth: 0 }}
              inputstyle={{ width: wp(60), marginLeft: 10, width: wp(50) }}
              circle
              card
            />
            <Text style={[styles.darkgrey, { marginTop: -5 }]}>Cardholder name</Text>
            <InputText
              label={' Name '}
              textInputProps={{ placeholder: 'Alex Hales', keyboardType: 'default', autoCapitalize: 'none', }}
              controllerProps={{
                name: 'name', control, errors,
                rules: { required: true, },
              }}
              style={{ borderWidth: 0 }}
              inputstyle={{ marginLeft: 13, width: wp(35) }}

            />
            {/* <InputText value={card} onChange={setcard} placeholder={'Alex Hales'} style={{borderWidth:0}} KeyboardType={'default'} inputstyle={{marginLeft:13}} /> */}
            <View style={{ flexDirection: 'row', width: wp(85), justifyContent: 'space-between' }}>
              <View >
                <Text style={styles.darkgrey}>Expiry date</Text>
                <InputText
                  label={'  Expiry Date '}
                  textInputProps={{ placeholder: '06 / 2024', keyboardType: 'numeric', autoCapitalize: 'none', }}
                  controllerProps={{
                    name: 'date', control, errors,
                    rules: { required: true, },
                  }}
                  style={{ borderWidth: 0 }}
                  inputstyle={{ marginLeft: 13, width: Platform.OS === 'ios' ? wp(32) : wp(35) }}

                />

                {/* <InputText value={date} onChange={setdate} placeholder={'06 / 2024'} style={{borderWidth:0}}  inputstyle={{width:wp(35),marginLeft:13}} KeyboardType={'numeric'}  /> */}
              </View>
              <View>
                <Text style={styles.darkgrey}>CVV / CVC</Text>
                <View style={{ height: hp(2.5), width: wp(5.5), backgroundColor: '#d3f6e6', justifyContent: 'center', alignItems: 'center', borderRadius: 15, position: 'absolute', right: 10, marginTop: 5 }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: '#25D485' }}>?</Text>
                </View>
                <InputText
                  label={' Cvv/Cvc '}
                  textInputProps={{ placeholder: '915', keyboardType: 'email-address', autoCapitalize: 'none', maximum: 3 }}
                  controllerProps={{
                    name: 'cvv', control, errors,
                    rules: { required: true, },
                  }}
                  style={{ borderWidth: 0 }}
                  inputstyle={{ marginLeft: 13, width: Platform.OS === 'ios' ? wp(32) : wp(35) }}

                />
                {/* <InputText value={numCVV} onChange={setnumCVV} placeholder={'915'} style={{borderWidth:0}}  inputstyle={{width:wp(35),marginLeft:13}} KeyboardType={'numeric'} /> */}
              </View>
            </View>
            <Text style={{ fontWeight: '400', fontSize: 10, textAlign: 'center', marginLeft: 50, marginRight: 50 }}>{TEXT.creditCardText}</Text>
            <Button title={'Done'} style={{ marginTop: 15, backgroundColor: COLORS.Green, borderRadius: 15, alignSelf: 'center', marginBottom: 10, width: 170 }} color={{ color: '#fff' }} onpress={() => setmodal(false)} />
          </View>
        </View>
      </View>
    </Modal>
  )
}