import { StatusBar, View, Text, Image, TouchableOpacity,StyleSheet, FlatList, I18nManager, ImageBackground, FlatListProps, NativeScrollEvent, Dimensions, ActionSheetIOS, ActivityIndicator, Platform } from 'react-native'
import React, { useState, useRef,useEffect } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS,IMAGE,TEXT} from '../../Constant/Images';
import Button from '../../Components/Button';
import { hp, wp } from '../../Components/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Colors from '../../Constant/Colors/Index'

const { height, width } = Dimensions.get('window')
// const [index, setindex] = useState('')

const WalkThroughsscreens = ({ navigation }) => {
    const slides = [
        {
          key: 1,
          title: 'Order for Food',
          text: TEXT.SlidFirst,
          imageone: IMAGE.OnBoardingSecond,
          imagetwo: IMAGE.Add,
          onpress: 1
        },
        {
          key: 2,
          title: "Easy Payment",
          text: TEXT.SlidSecond,
          imageone:IMAGE.OnBoardingThird,
          imagetwo:  IMAGE.Add,
          onpress: 2
        },
        {
          key: 3,
          title: 'Fast Delivery',
          text: TEXT.SlidThird,
          imageone:IMAGE.OnBoardingFirst,
          imagetwo:  IMAGE.Add,
          onpress: 2
        },
      ];
  const slider = useRef(); 
 const onDone = async () => {
  await AsyncStorage.setItem('FirstTime', "true")
  navigation.navigate('AuthStack',{screen:'Login'}) 
};
  const _renderNextButton = (item) => {
    return (
      <View style={[styles.button]}>
      <Text style={[styles.ButtonText]}>{'Next'}</Text>
    </View>
    );
};
const _renderDoneButton = (item) => {
    return (
      <View style={[styles.button]}>
      <Text style={[styles.ButtonText]}>{'Get Started'}</Text>
    </View>
    );
};



  const VieWItem = ({ item, index }) => {
    return (
      <View style={{padding:20,height:hp(80)}}>
    <TouchableOpacity onPress={()=>{ item.key == 2 ? slider.current.goToSlide(0, true): slider.current.goToSlide(1, true)}} style={{padding:5,marginTop:item.key== 1 ? '15%':'10%',width:70}}>
{   item.key !==1 && <Image source={IMAGE.ArrowBack} style={{height:hp(2.5),width:wp(8)}}  resizeMode='cover'/> 
} 
   </TouchableOpacity>
          <Image source={item.imageone} style={{ alignItems: 'center', height:'70%',width:'100%'}} resizeMode='cover'/>
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', height: '18%', width: '100%',marginTop:'10%'}}>
          <Text style={{ fontSize: 42, fontWeight: 'bold', color: COLORS.Green }}>{item.title}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#000000D9',textAlign:'center' }}>{item.text}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center',backgroundColor:'#fff'}}>
     <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />

      <AppIntroSlider
        data={slides}
        renderItem={VieWItem}
        bottomButton
        dotStyle={{ backgroundColor: 'lightgrey', }}
        activeDotStyle={{ backgroundColor: COLORS.Green,width:wp(10),height:hp(1.2) }}
        dotClickEnabled={false}
        onDone={onDone}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        ref={(ref) => (slider.current = ref)}
      />
    </View>

  )
}

export default WalkThroughsscreens
const styles =  StyleSheet.create({
  button: {
      height:hp(6),
      width:wp(92),
      backgroundColor:COLORS.Green,
      borderRadius:19,
      justifyContent:'center',
      alignItems:'center',
      textAlign: 'center',
      shadowColor: '#000', // IOS
      shadowOffset: { height: 2, width: 1 }, 
      shadowOpacity: 1, // IOS
      shadowRadius: 5,
      elevation: Platform.OS === 'ios' ? 7 : null
    }, 
    ButtonText:{
      fontSize:18,
      fontWeight:'bold',
      color:'#FFF'
     
    }
})