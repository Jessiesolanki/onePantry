import { View, Text ,StyleSheet,Image,Pressable,TouchableOpacity,Modal} from 'react-native'
import React,{useState,useContext} from 'react'
import LoginHeader from '../../Components/LoginHeader';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import {IMAGE,COLORS, TEXT} from '../../Constant/Images/index'
import CircleIcon from '../../Components/CircleIcon';
import useLoadingFn from '../../Hook/useLoadingFn';
import AuthTextComponent from '../../Components/AuthTextComponent';
import { wp,hp } from '../../Components/Config';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import { ModalFn } from '../../Components/ModalFn';
// import { GoogleSignin ,GoogleSigninButton ,statusCodes } from '@react-native-google-signin/google-signin';
const Login = ({props}) => {
  
   const { control,handleSubmit, formState: {errors}, reset, watch} = useForm();
   //---------------------------states-------------------------//
   const [modal, setmodal] = useState(false)
   const [Active, setActive] = useState(1)
   const navigation = useNavigation();
   const [passwordVisible, setPasswordVisibility] = useState(false);
   const [goggleUserInfoKey, setgoggleUserInfoKey] = useState([{
  googleUserInfo:'',
  email:'',
  social_key:''
}])
   //---------------------Apis functionsand there state ---------------------------//
   const {API_CALL} = useContext(AuthContext);
   const Login = useLoadingFn(API_CALL.Login);
  //  GoogleSignin.configure({
  //   webClientId: 'your-web-client-id',
  //   offlineAccess: true,
  // });
  const  _signIn = async ()=> {
    // try {

    //   await GoogleSignin.hasPlayServices();

    //   const userInfo = await GoogleSignin.signIn();
    //   setgoggleUserInfoKey({ googleUserInfo: userInfo,email:userInfo.user.email,social_key:userInfo.user.id });
    //   onSocialLogin();
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     alert('Google Sign in Failed', 'User cancelled the login flow');
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     alert('Google Sign in Failed', 'operation (f.e. sign in) is in progress already');
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     alert('Google Sign in Failed', 'play services not available or outdated');
    //   } else {
    //     alert('Google Sign in Failed', error);
    //   }
    // }
  }
    const onSubmit = data => {
      Login({ params: {...data, user_type:"user"}, onSuccess: () => {navigation.navigate('DrawerStack',{screen:'Home' , params :{user : Login}})},})
    };
    // const onSocialLogin = data => {Login({ params: {email:goggleUserInfoKey.email, user_type:"user",social_key:goggleUserInfoKey.social_key,social_type:1}, onSuccess: () => {navigation.navigate('DrawerStack',{screen:'Home'})},})};

  return (
    <View style={styles.MainContainer}>
     <LoginHeader/>
     <View style={{padding:10,alignItems:'center'}}>
        <Text style={{textAlign:'center',color:COLORS.Green,fontWeight:'bold',fontSize:35}}>Login</Text>
        <Text style={{textAlign:'center',color:'#000000',fontWeight:'500',fontSize:20,opacity: 0.5,marginBottom:20}}>Welcome back</Text>
        <View style={{padding:20}}>
        <InputText 
        label={' EMAIL '}
        textInputProps={{ placeholder: 'Email', keyboardType: 'email-address', autoCapitalize: 'none',}}
        controllerProps={{name:'email',control, errors,
          rules: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, },
        }}
        image={IMAGE.Email}
      />
        <InputText 
          label={' password '}
          rightIconProps={{name: passwordVisible ? IMAGE.Greenkey : IMAGE.Show, color:'white',onPress: () => setPasswordVisibility(!passwordVisible), }}
          textInputProps={{placeholder: '* * * * * * * *',autoCapitalize: 'none', secureTextEntry: !passwordVisible, }}
          controllerProps={{name:'password',control,errors, rules: {required: true},}}
          imageLast={IMAGE.Show} styleeye={{marginLeft:0,right:15}} 
          image={IMAGE.Password}
      />
 
            <TouchableOpacity onPress={()=>{setmodal(true),setActive(1)}}>
            <Text style={{textAlign:'right',fontSize:12,color:'#000000',opacity:0.5,marginRight:4}}>Forgot Password ?</Text>
            </TouchableOpacity>
        </View>
        <Button title={'LOGIN'} style={{marginTop:20,backgroundColor:COLORS.Green}} color={{color:'#fff'}} onpress={handleSubmit(onSubmit)} />
         <View style={{flexDirection:'row', marginTop:30}}>
         <CircleIcon color={'#3A58BA'} text={'f'}/> 
         <CircleIcon color={'#D6281D'} text={'G'}/>
         </View>
         <View style={{flexDirection:'row',marginTop:30}}>
         <Text style={{fontSize:14,color:'#000000',opacity:.5}}>Don’t have an account?</Text>
         <Pressable onPress={()=>navigation.navigate('Registration')}>
         <Text style={{fontSize:15,color:COLORS.Green,fontWeight:'700'}}> Register</Text>
         </Pressable>
         </View>
       <ModalFn 
       modal ={modal} 
       setmodal={setmodal} 
       active={Active} 
       setactive={setActive} 
       />
     </View>
     
  
    </View>
  )
}
 const styles = StyleSheet.create({
    MainContainer :{
        flex:1, 
        backgroundColor:'#fff'     
    },
 })

 


export default Login
