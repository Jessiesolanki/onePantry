import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Share, Modal, Alert,Linking  } from 'react-native'
import React, { useState, useContext } from 'react'
import BackComponent from '../../Components/BackComponent'
import { COLORS, IMAGE, TEXT } from '../../Constant/Images'
import ItemInRowComponent from '../../Components/ItemInRowComponent'
import AuthTextComponent from '../../Components/AuthTextComponent'
import Counter from '../../Components/Counter'
import Button from '../../Components/Button'
import { useNavigation } from '@react-navigation/native'
import { HomeContext } from '../../Providers/HomeProvider';
import { Image_URL } from '../../Providers';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { hp, wp } from '../../Components/Config'

const ItemDetails = ({ route }) => {

  const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4]);
  const [count, setcount] = useState(1)
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [modal, setmodal] = useState(false)
  const [like, setlike] = useState(false)

  //---------------APIs variables/values-------------------------------------//
  const { ProductDtl, API_HOME, FavoriteData } = useContext(HomeContext);
  const AddToCart = useLoadingFn(API_HOME.AddToCart);
  console.log(ProductDtl.avgRating, 'avgRatingavgRating')

  //------------------Functions-----------------------------------------//
  const AddCartData = () => {
    AddToCart({ params: { product_id: ProductDtl._id, quantity: count }, onSuccess: () => { Alert.alert('ADD PRODUCT', 'Product Added to your cart Succesfully'), console.log('successs add to card') }, })
  }
  const OnImageSlider = () => {
    console.log('kkkkk')
    // setmodal(true)
  }
  const onShare = async () => {
    try {
      const url = await Linking.getInitialURL();
      const params = new URLSearchParams({ /* add any query params here */ });
      const deepLink = Linking.createURL('../../Providers/HomeProvider/ItemDetails', { /* add any path params here */ });
      const shareUrl = `${url}${deepLink}?${params.toString()}`;
      const result = await Share.share({
        message: 'Check out this link!',
        url:shareUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  
  //---------------------components/Cards---------------------------------------//
  const ratingValue = parseInt(ProductDtl.avgRating);
  const array = Array.from({ length: ratingValue }, (_, index) => index + 1);
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {array.map((item, key) => {
          return (
            <TouchableOpacity
              style={{ marginRight: 5 }}
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image style={{ width: 15, height: 15, }} source={IMAGE.Rating} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => OnImageSlider()}>
        <Image style={{ width: 130, height: 150, }} source={{ uri: Image_URL + item.image }} />
      </TouchableOpacity>
    )
  }
  const pagination = () => {
    return (
      <Pagination
        dotsLength={ProductDtl.product.length}
        activeDotIndex={activeSlide}
        dotContainerStyle={{ height: 5, width: 5, marginTop: -40 }}
        containerStyle={{ backgroundColor: '#fff', width: wp(100), height: hp(3), marginBottom: -7 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: COLORS.Green
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.9}
        inactiveDotStyle={{ backgroundColor: 'grey' }}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <BackComponent text={'Details'} image={IMAGE.Share} onPress={onShare} />
        <View style={{ height: hp(25), width: wp(100), backgroundColor: '#56AB2F0D', alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginBottom: 40 }}>
          <TouchableOpacity style={{ height: 18, width: 75, backgroundColor: '#FD7E7E33', borderRadius: 5, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginRight: 18, marginTop: 15 }}>
            <Text style={{ fontWeight: '500', fontSize: 10, color: '#FD7E7E' }}>{ProductDtl.category_id.category_name}</Text>
          </TouchableOpacity>
          <View style={{ height: hp(30), width: wp(50), alignItems: 'center', position: 'absolute', top: hp(3) }}>
            <Carousel
              data={ProductDtl.product}
              renderItem={(item, index) => renderItem(item, index)}
              onSnapToItem={index => setActiveSlide(index)}
              sliderWidth={wp(35)}
              itemWidth={wp(50)}
            />
            {pagination()}
          </View>
          {/* <Image style={{ width: 175, height: 175, }} source={route.params.item.image} /> */}
        </View>

        <ItemInRowComponent title={ProductDtl.name} image like={like} setlike={setlike} product_id={ProductDtl._id} islike={ProductDtl.isLike}  />
        <ItemInRowComponent title={`Product Weight:${ProductDtl.weight+ ProductDtl.weightUnit}`} styleTitle={{ fontWeight: '500', fontSize: 15, color: '#7C7C7CB2', marginTop: 1 }} titletwo={'1.2k Likes'} styleTitletwo={{ marginTop: 1 }} />
        <View style={{ flexDirection: 'row', width: wp(90), alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', marginBottom: -10 }}>
          <Counter style={{}} count={count} setcount={setcount} />
          <Text style={{ fontWeight: '500', fontSize: 24, color: COLORS.Green }}>{'$' + ProductDtl.selling_price}</Text>
        </View>
        <View style={styles.outline}></View>
        <AuthTextComponent style={{ color: '#000000B2' }} styletwo={{ color: '#7C7C7CB2' }} title={'Product Detail'} text={ProductDtl.description} />
        <View style={[styles.outline, { height: 0, marginBottom: 7 }]}></View>
        <ItemInRowComponent title={'Expiration Date'} styleTitle={{ fontWeight: '500', fontSize: 14, color: '#000000B2' }} titletwo={ProductDtl.expire_date} styleView={{ alignItem: 'center' }} styleTitletwo={{ color: '#D6281D', fontWeight: '500', fontSize: 11 }} />
        <View style={[styles.outline, { height: 10, marginBottom: 7 }]}></View>
        <CustomRatingBar />
        <ItemInRowComponent title={'Reviews'} styleTitle={{ fontWeight: '500', fontSize: 14, color: '#000000B2', marginTop: -25 }} titletwo={`${ProductDtl.customer_review} Customer Ratings`} styleView={{ alignItem: 'center' }} styleTitletwo={{ color: '#808080', fontWeight: '500', fontSize: 8 }} />
        <View style={[styles.outline, { height: 10, marginBottom: 7 }]}></View>
        <ItemInRowComponent title={'UPC Code'} styleTitle={{ fontWeight: '500', fontSize: 14, color: '#000000B2' }} titletwo={ProductDtl.upc_code} styleView={{ alignItem: 'center' }} styleTitletwo={{ color: '#808080', fontWeight: '400', fontSize: 11 }} />
        <View style={[styles.outline, { height: 10, marginBottom: 7 }]}></View>
        <ItemInRowComponent title={'Shipping Origin Address'} styleTitle={{ fontWeight: '500', fontSize: 14, color: '#000000B2' }} titletwo={' Dandridge, TN 37725, United States Time to Deliver: 24-48 Hours'} styleView={{ alignItem: 'center' }} styleTitletwo={{ color: '#808080', fontWeight: '400', fontSize: 11 }} />
        <Button title={'Add to Cart'} style={{ marginTop: 20, backgroundColor: COLORS.Green, borderRadius: 15, alignSelf: 'center', marginBottom: 10, width: wp(45) }} color={{ color: '#fff' }} onpress={AddCartData} />
        <Modal
          visible={modal}
          transparent={true}
          onRequestClose={() => setmodal(false)}
          animationType="slid">
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#00000080" }} >
            <View style={styles.modal}>
              <Carousel
                data={ProductDtl.product}
                renderItem={(item, index) => renderItem(item, index)}
                onSnapToItem={index => setActiveSlide(index)}
                sliderWidth={wp(35)}
                itemWidth={wp(50)}
              />
              {pagination()}
            </View>
          </View>

        </Modal>

      </ScrollView>
    </View>
  )
}

export default ItemDetails
const styles = StyleSheet.create({
  outline: {
    borderBottomWidth: 1,
    borderColor: '#E2E2E2C2',
    height: 20,
    width: 360,
    alignSelf: 'center'
  },
  customRatingBarStyle: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
    marginRight: 10

  },
  modal: {
    height: hp(50),
    width: wp(90),
    borderRadius: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
})