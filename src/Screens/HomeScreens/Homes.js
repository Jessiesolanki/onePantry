import { View, Text ,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList, Dimensions, Platform,} from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import {IMAGE,COLORS, TEXT} from '../../Constant/Images/index'
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../../Components/SearchComponent';
import {HomeContext} from '../../Providers/HomeProvider';
import { Image_URL } from '../../Providers';
 import { hp, wp } from '../../Components/Config';
import { AuthContext } from '../../Providers/AuthProvider';
const Home = ({props}) => {
    console.log("data redlfdg" , props)
    const navigation = useNavigation();
    const [search, setsearch] = useState('')

  //---------------APIs variables/values-------------------------------------//
     const {API_HOME,Productlist,CatList} = useContext(HomeContext);
     const {API_CALL} = useContext(AuthContext);
     const loginDetail = useLoadingFn(API_CALL.login);
     const ProductList = useLoadingFn(API_HOME.ProductList);
     const CategoriesList = useLoadingFn(API_HOME.CategoriesList);
     const ProductDetails = useLoadingFn(API_HOME.ProductDetails);

      //------------------Functions-----------------------------------------//
     useEffect(() => {
        ProductList({ params: {}, onSuccess: () => {},})  
        CategoriesList({ params: {}, onSuccess: () => {},})
     }, [])
    const OnProductDetail =(item)=>{
    console.log(item._id,'item._iditem._iditem._iditem._id')
     ProductDetails({ params: {product_id:item._id}, onSuccess: () => { navigation.navigate('ItemDetails',{item})},}) 
 }
 console.log("login detail recieved" , loginDetail)

  //---------------------components/Cards---------------------------------------//
    const renderItems = ({item})=>{
        return(
            <View style={{marginRight:20,alignItems:'center'}}>
           <Image source={{uri:Image_URL+ item.image}} resizeMode='contain' style={{borderRadius:13,height:40,width:40}}  />
          <Text style={{fontWeight:'400',fontSize:8,color:COLORS.Black,marginTop:5}}>{item.category_name ===  "undefined" ? null :item.category_name}</Text> 
            </View>
        )
    }
    const renderList = ({item})=>{
        // {console.log(Image_URL+item.prodImg,'kkkkkkkk')}
        return(
            <TouchableOpacity onPress={()=>OnProductDetail(item)} style={styles.card}>
                <View style={{height:hp(13.5),width:wp(30),alignSelf:'center',justifyContent:'center',borderRadius:12}}>
                <Image source={{uri:Image_URL+item.product_img[0].image}} resizeMode='contain' style={{alignSelf:'center',height:80,width:80}} />
                </View>
            <Text style={{fontWeight:'500',fontSize:10,color:COLORS.Black,opacity:.5}}>{item.name}</Text>
            <Text style={{fontWeight:'400',fontSize:6,color:COLORS.Black,opacity:.5}}>{'1 Package 500 Ons'}</Text>
            <View>
            <Text style={{fontWeight:'500',fontSize:14,color:COLORS.Green,position:'absolute',bottom:0,right:10}}>{'$'+item.selling_price}</Text>
            </View>
    
            </TouchableOpacity>
        )
    }
  return (
    <View style={{flex:1}}>
     <View>
        <Image source={IMAGE.Header} resizeMode='cover' style={{width:wp(100)}} />
        <Image source={IMAGE.Logo} style={{height:45,width:45,position:'absolute',alignSelf:'center',top:45}}  />
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{position:'absolute',left:20,top:60}}>
        <Image source={IMAGE.SideBar} resizeMode='contain' style={{width:30,height:30}} />
        </TouchableOpacity>
     </View>
     <View style={{padding:20}}>
        <Text style={{fontWeight:'400',fontSize:16,color:COLORS.Black,opacity:.5}}>Hello,<Text style={{color:'#FFD401'}}> Alex Hales</Text></Text>
        <Text style={{fontWeight:'700',fontSize:16,color:COLORS.Black,opacity:.5}}>{TEXT.HeaderText}</Text>
       <SearchComponent style={{marginRight:10}} styleView={{marginTop:5 , marginRight:12}} TouchFn   />
       <View style={styles.textFlatlistView}>
            <Text style={styles.title}>Categories</Text>
            <TouchableOpacity>
            <Text style={styles.titleSee}>Show All</Text>
            </TouchableOpacity>
        </View>
                <FlatList
                        style={{marginBottom:15}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item)=>renderItems(item)}
                        data={CatList}
                    />
           <View style={[styles.textFlatlistView,{marginTop:20}]}>
            <Text style={styles.title}>Listings</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('ViewAllListing')}>
            <Text style={styles.titleSee}>View All</Text>
            </TouchableOpacity>
        </View>
        <View style={{height:Platform.OS === 'ios' ? hp(50):   hp(40)}}>
        <FlatList
                       numColumns={2}
                    //   style={{height:hp(100)}}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item)=>renderList(item)}
                        data={Productlist}
                    />
        </View>
    
     </View>
    </View>
  )
}
 const styles = StyleSheet.create({
    MainContainer:{
        flex:1
    },
title:{
    fontWeight:'600',
    fontSize:14,
    color:COLORS.Black,
    opacity:.5,
    marginTop:-17
},
titleSee:{
    fontWeight:'400',
    color:COLORS.Green,
    fontSize:10,
    marginTop:-10
},
textFlatlistView:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
padding:10
},
card:{
    borderWidth:1,
    borderColor:COLORS.Green,
    borderRadius:20,
    height:hp(19),
    width:wp(39),
    padding:10,
    marginRight:6,
    marginLeft:12,
    marginBottom:13
    
}
 })
export default Home


