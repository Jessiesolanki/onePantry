import { View, Text, Image ,StyleSheet} from 'react-native'
import React,{useEffect,useContext} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Providers/AuthProvider';
import { changeStack ,ROUTES, } from '../Navigations/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
    const navigation = useNavigation();
  // const  {redirect}  = useContext(AuthContext)
  // useEffect(() => { 
  //   setTimeout(redirect(), 1500)
  // }, [])
  useEffect(() => {
    setTimeout(() => {
      redirect()
      // navigation.navigate('AuthStack',{screen:'WalkThroughsscreens'})
  
    }, 1000);
  }, [])
  const redirect = async () => {
  
    const cachedUserData = await AsyncStorage.getItem('token')
    await AsyncStorage.getItem('FirstTime').then(result => {
        
        if (result !=="true") {
          // changeStack(ROUTES.AUTH.WALKTHROUGH)
           navigation.navigate('AuthStack',{screen:'WalkThroughsscreens'})
        }else {
          
            if (cachedUserData) {
           // changeStack(ROUTES.DASHBOARD.HOME)
              navigation.navigate('DrawerStack',{screen:'Home'})
            }else  
            navigation.navigate('AuthStack',{screen:'Login'})
            // changeStack(ROUTES.AUTH.LOGIN)
            
        }
})

}
  return (
<LinearGradient colors={['#56AB2F', '#A8E063', '#A8E063']} style={styles.linearGradient}>
  <Image source={require('../Constant/Images/Logo.png')} style={{height:170,width:170}}/>
    {/* <Button title={'GET STARTED'} style={{top:200}} color={{color:'#56AB2F'}} onpress={()=>navigation.navigate('AuthStack',{screen:'WalkThroughsscreens'})} /> */}
</LinearGradient>
  )
}
const styles = StyleSheet.create({
  linearGradient: {   
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },

});
export default Splash