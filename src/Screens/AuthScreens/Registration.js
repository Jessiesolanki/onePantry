import { View, Text ,StyleSheet,Pressable,ScrollView, Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import LoginHeader from '../../Components/LoginHeader';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import {IMAGE} from '../../Constant/Images/index'
import CircleIcon from '../../Components/CircleIcon';
import {useForm} from 'react-hook-form';
import { hp,wp } from '../../Components/Config';
import { AuthContext } from '../../Providers/AuthProvider';
import useLoadingFn from '../../Hook/useLoadingFn';

const Registration = () => {
  const { control,handleSubmit,formState: {errors}, reset, watch} = useForm();
  // --------------states-------------------//
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const navigation = useNavigation();
   //---------------------Apis functionsand there state ---------------------------//
   const {API_CALL} = useContext(AuthContext);
   const Registration = useLoadingFn(API_CALL.Registration);

  const onSubmit = data => {
    console.log('data +++++' , data)
    if(data.confirm_password === data.password){
      Registration({ params: {...data,type:'user'}, onSuccess: () => {navigation.navigate('AuthStack',{screen:'Login'})},})
    }
   else{
    Alert.alert("Password Mismatch")
   }
  };

  return (
    <View style={styles.MainContainer}>
    <ScrollView showsVerticalScrollIndicator={false}>
     <LoginHeader/>
        <View style={{padding:10,alignItems:'center'}}>
        <Text style={{textAlign:'center',color:'#56AB2F',fontWeight:'bold',fontSize:35}}>Register</Text>
        <Text style={{textAlign:'center',color:'#000000',fontWeight:'500',fontSize:20,opacity: 0.5,marginBottom:20}}>Create Account</Text>
        <View style={{padding:20}}>
        <InputText 
        label={' First Name '}
        textInputProps={{ placeholder: 'First_Name', keyboardType: 'email-address', autoCapitalize: 'none',}}
        controllerProps={{name:'first_name',control, errors,rules: {required: true, min:2} }}
        image={IMAGE.User}
      />
      <InputText 
        label={' Last Name '}
        textInputProps={{ placeholder: 'Last_Name', keyboardType: 'email-address', autoCapitalize: 'none',}}
        controllerProps={{name:'last_name',control, errors, rules: {required: true}}}
        image={IMAGE.User}
      />
     <InputText 
        label={' EMAIL '}
        textInputProps={{ placeholder: 'Email', keyboardType: 'email-address', autoCapitalize: 'none',}}
        controllerProps={{name:'email',control, errors, rules: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, },}}
        image={IMAGE.Email}
      />
        <InputText 
          label={' Password '}
          rightIconProps={{name: passwordVisible ? 'eye' : 'eye-off', color:'white',onPress: () => setPasswordVisibility(!passwordVisible), }}
          textInputProps={{placeholder: '* * * * * * * *',autoCapitalize: 'none', }}
          controllerProps={{name:'password',control,errors, rules: {required: true},}}
          imageLast={IMAGE.Show} styleeye={{marginLeft:0,right:15,height:hp(2),width:wp(5)}}
          image={IMAGE.Password}
      />

       <InputText 
          label={' Confirm Password '}
          rightIconProps={{name: passwordVisible ? 'eye' : 'eye-off', color:'white',onPress: () => setPasswordVisibility(!passwordVisible), }}
          textInputProps={{placeholder: '* * * * * * * *',autoCapitalize: 'none',  }}
          controllerProps={{name:'confirm_password',control,errors, rules: {required: true},}}
           imageLast={IMAGE.Show} styleeye={{marginLeft:0,right:15,height:hp(2),width:wp(5)}} 
          image={IMAGE.Password}
      />
           
         </View>
         <Button title={'REGISTER'} style={{marginTop:10,backgroundColor:'#56AB2F'}} color={{color:'#fff'}} onpress={handleSubmit(onSubmit)} />
         <View style={{flexDirection:'row', marginTop:30}}>
         <CircleIcon color={'#3A58BA'} text={'f'}/>
         <CircleIcon color={'#D6281D'} text={'G'}/>
         </View>
         <View style={{flexDirection:'row',marginTop:20}}>
         <Text style={{fontSize:14,color:'#000000',opacity:.5}}>Already have an account?</Text>
         <Pressable onPress={()=>navigation.navigate('Login')}>
         <Text style={{fontSize:15,color:'#56AB2F',fontWeight:'700'}}> Login</Text>
         </Pressable>
         </View>
     </View>
     </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    MainContainer :{
        flex:1, 
        backgroundColor:'#fff'
         
    }
 })
export default Registration