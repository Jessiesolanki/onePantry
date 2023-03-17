import { View, Text,Image,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { COLORS, IMAGE } from '../Constant/Images'
import { hp, wp } from './Config';
const RatingCard = () => {
    const [defaultRating, setDefaultRating] = useState(2);
    // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const CustomRatingBar = () => {
        return (
          <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                style={{marginRight:5}}
                  activeOpacity={0.7}
                  key={item}
                  onPress={() => setDefaultRating(item)}>
                  <Image style={{width:20,height:20,}} source={IMAGE.Rating} />
                </TouchableOpacity>
              );
            })}
          </View>
        );
      };
  return (
    <View style={styles.mainView}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={styles.textTitle}>Profile Ratings</Text>
    <Text style={styles.textTitle}>40 Customer Ratings</Text>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
   <CustomRatingBar />
   <Text style={styles.textrating}>4.8 out of 5</Text>
   </View>
</View>
  )
}

export default RatingCard
const styles = StyleSheet.create({
    mainView:{
        width:wp(90),
        backgroundColor:'#fff',
        height:hp(9),
        alignSelf:'center',
        borderRadius:5,
        padding:19,
        justifyContent:'center',
        marginTop:10,
        elevation:2
    },
    textTitle:{
      fontWeight:'400',
      fontSize:12,
      color:'#808080'
  },
  customRatingBarStyle: {
    
    flexDirection: 'row',
    marginTop: 10,
    
  },
  textrating:{
    fontSize:14,
    fontWeight:'400',
    color:COLORS.Green,
    marginTop:7
  }
})