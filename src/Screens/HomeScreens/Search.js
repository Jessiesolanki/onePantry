import { View, Text ,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList,Dimensions } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import {IMAGE,COLORS, TEXT} from '../../Constant/Images/index'
import { useNavigation } from '@react-navigation/native';
import BackComponent from '../../Components/BackComponent';
import SearchComponent from '../../Components/SearchComponent';
import { useForm } from 'react-hook-form';
import {HomeContext} from '../../Providers/HomeProvider';
import { hp, wp } from '../../Components/Config';
import { Image_URL } from '../../Providers';
const {width, height} = Dimensions.get('window');


const Search = () => {
  const [search, setsearch] = useState('')
  const navigation = useNavigation();
  const { control,handleSubmit,formState: {errors}} = useForm();
    const {API_HOME,searchData ,setsearchData} = useContext(HomeContext);
    const HomeSearching = useLoadingFn(API_HOME.HomeSearching);
    const onSearch =(data)=>{
      console.log(data,'oooooooooooooooooooo')
       HomeSearching({ params: data, onSuccess: () => {console.log("api called__")},}) 
    }
    console.log((searchData),'searchDatasearchDatasearchData')
    const handleSearch = () => {
      handleSubmit(onSearch);
    };
useEffect(() => {
setsearchData("")


}, [])

   
    
    const renderList = ({item})=>{
      console.log("item recieved"  , Image_URL+item.product_img[0].image)
        return(
            <View style={styles.card}>
            <Image source={{uri:Image_URL+item.product_img[0].image}} resizeMode='contain' style={{alignSelf:'center',height:80,width:80}} />
            <Text style={{fontWeight:'500',fontSize:10,color:COLORS.Black,opacity:.5}}>{item.name}</Text>
            <Text style={{fontWeight:'400',fontSize:6,color:COLORS.Black,opacity:.5}}>{'1 Package 500 Ons'}</Text>
            <View>
            <Text style={{fontWeight:'500',fontSize:14,color:COLORS.Green,position:'absolute',bottom:0,right:10}}>{item.price}</Text>
            </View>
        
            </View>
        )
    }
  return (
    <View style={{flex:1}}>
     <BackComponent empty={onSearch} text={'View All Listings'}/>
    <SearchComponent 
      returnKeyType={"search"}
      onSubmitEditing={ handleSubmit(onSearch)}
      textInputProps={{ placeholder: 'Search', keyboardType: 'email-address', autoCapitalize: 'none',}}
      controllerProps={{
      name:'search_key',
      control,
      errors,
      rules: {
        required: false,
      },   }}
      />

                <FlatList
                       numColumns={2}
                       style={{height:hp(100),padding:10,marginLeft:10}}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item)=>renderList(item)}
                        data={searchData == "" ? null : searchData.data.search_data}
                    />
    
   
    </View>
  )
}

export default Search
const styles = StyleSheet.create({
    card:{
        borderWidth:1,
        borderColor:COLORS.Green,
        borderRadius:20,
        height:hp(25),
        width:wp(40),
        padding:10,
        marginRight:16,
        marginLeft:6,
        marginBottom:15
        
    }
})
