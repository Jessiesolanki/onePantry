
import { View, Text ,StyleSheet,Image,Pressable,TouchableOpacity,Modal} from 'react-native'
import React,{useState,useContext} from 'react'
import InputText from './InputText';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import {IMAGE,COLORS, TEXT} from '../Constant/Images/index'
// import CircleIcon from '../../Components/CircleIcon';
 import useLoadingFn from '../Hook/useLoadingFn';
import AuthTextComponent from './AuthTextComponent';
import { wp,hp } from './Config';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProvider';
export const ModalFn =({modal,setmodal,active ,setactive})=>{
 
  const [passwordVisible, setPasswordVisibility] = useState(false);
    const [newpasswordVisible, setNewPasswordVisibility] = useState(false);
    return(
      <Modal
      visible={modal}
      transparent={true}
      onRequestClose={()=>setmodal(false)}
      animationType="slid">
      <View style={{ flex:1,alignItems: 'center', justifyContent: 'flex-end' ,backgroundColor:"#00000010" }} >   
      <View style={{ width:'100%',height:hp(68), backgroundColor: '#ffffff',borderTopLeftRadius:29,borderTopRightRadius:29 ,position:'relative'}}>
      <TouchableOpacity  style={{padding:15,width:wp(15),alignSelf:'flex-end',alignItems:'center'}} onPress={()=>setmodal(false)}>
      <Image source={IMAGE.Delete} style={{height:22,width:22}}/>
      </TouchableOpacity>
      <Component 
      setactiveref ={setactive} 
      activeref={active} 
      modalref={setmodal} 
      passwordVisible={passwordVisible}
      setPasswordVisibility={setPasswordVisibility}
      newpasswordVisible={newpasswordVisible}
      setNewPasswordVisibility={setNewPasswordVisibility}
       />
  
  </View>
      </View>
     </Modal>
    )
  }
  export const Component =({setactiveref,activeref,modalref,setNewPasswordVisibility,newpasswordVisible,setPasswordVisibility,passwordVisible,})=>{
    const navigation = useNavigation();
    const { control,handleSubmit, formState: {errors}, reset, watch} = useForm();
    const {API_CALL,otp} = useContext(AuthContext);
 
  
   
    const ForgotPassword = useLoadingFn(API_CALL.ForgotPassword);
    const OtpVerify = useLoadingFn(API_CALL.OtpVerify);
    const ResetPassword = useLoadingFn(API_CALL.ResetPassword);
    const onSubmit = data => {ForgotPassword({ params: {...data}, onSuccess: () => {setactiveref(2)},}), reset(control)};
    const onVerify = data => {OtpVerify({ params: {...data,email:otp.data.email}, onSuccess: () => {setactiveref(3)},})};
    const onResetPassword = data => {ResetPassword({ params: {...data,email:otp.data.email}, onSuccess: () => {setactiveref(4)},})
  };
   otp && console.log(otp.data.otp)
    switch (activeref) {
      case 1:
        return <>
          <View>
          <Image source={IMAGE.ForgetPassword} style={{alignSelf:'center',height:160,width:80}}/>
         <AuthTextComponent title={'Forgot Password?'} text={TEXT.ForgetText}/>
         <View style={{padding:15}}>
         <Text style={{fontWeight:'400',fontSize:12,color:COLORS.Green,marginVertical:5,marginTop:-15}}>Email Address</Text>
         <InputText 
          label={' EMAIL '}
          textInputProps={{ placeholder: 'Email', keyboardType: 'email-address', autoCapitalize: 'none',}}
          controllerProps={{name:'email',control, errors,rules: {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, }, }}
          image={IMAGE.Greenmessage}
          style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6),width:wp(92)}}
        />
         {/* <InputText value={EmailAdd} onChange={setEmailAdd} placeholder={'Email Address'} image={IMAGE.Greenmessage} style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6),width:wp(92)}} KeyboardType={'default'} /> */}
         <Button title={'Send Instruction'}  style={{marginTop:10,backgroundColor:COLORS.Green,width:'100%',height:hp(6),borderRadius:17}} color={{color:'#fff'}} onpress={handleSubmit(onSubmit)} />
         </View>
          </View>
        </>
       case 2:
    return<>
     <View>
        <Image source={IMAGE.Verification} style={{alignSelf:'center',height:120,width:120}}/>
       <AuthTextComponent title={'Check Your Email'} text={TEXT.verificationText}/>
       <View style={{padding:18}}>
       <Text style={{fontWeight:'400',fontSize:12,color:COLORS.Green,marginVertical:5,marginTop:-10}}>Verification Code</Text>
       <InputText 
          label={' OTP '}
          textInputProps={{ placeholder: 'Otp', keyboardType: 'email-address', autoCapitalize: 'none',}}
          controllerProps={{name:'otp',control, errors,rules: {required: true,}, }}
          image={IMAGE.Greenkey}
          style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6)}}
        />
       {/* <InputText value={vrfyEmail} onChange={setvrfyEmail} placeholder={'Verification Code'} image={IMAGE.Greenkey} style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6)}} KeyboardType={'default'}/> */}
       <Button title={'Continue'} style={{marginTop:10,backgroundColor:COLORS.Green,width:'100%',height:hp(6),borderRadius:17}} color={{color:'#fff'}} onpress={handleSubmit(onVerify)} />
       <Text style={{fontWeight:'400',fontSize:13,color:COLORS.Black,opacity:.6,marginTop:45,textAlign:'center'}}>{'Did not receive the email? Check your spam folder or'}</Text>
       <Text style={{fontWeight:'500',fontSize:13,color:COLORS.Green,textAlign:'center'}}>{'try another Email Address'}</Text>
  
       </View>
        </View>
    </>
    case 3 :
      return <>
        <View>
        <Image source={IMAGE.Reset} style={{alignSelf:'center',width:115,height:115}}/>
       <AuthTextComponent title={'Reset Password'} text={TEXT.resetText}/>
       <View style={{padding:18}}>
       <Text style={{fontWeight:'400',fontSize:12,color:COLORS.Green,marginVertical:5,marginTop:-25}}>New Password</Text>
       <InputText 
            label={' New Password '}
            rightIconProps={{name: passwordVisible ?  IMAGE.Greenkey : IMAGE.Show, color:'white',onPress: () => setPasswordVisibility(!passwordVisible), }}
            textInputProps={{placeholder: '* * * * * * * *',autoCapitalize: 'none', secureTextEntry: !passwordVisible, }}
            controllerProps={{name:'new_password',control,errors, rules: {required: true},}}
            imageLast={IMAGE.Show} styleeye={{marginLeft:0,right:10}} 
            style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6)}}
            image={IMAGE.GreenLock}
        />
       {/* <InputText value={passwordset} onChange={setpasswordset} KeyboardType={'default'} placeholder={'New Password'} image={IMAGE.GreenLock} style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6)}} imageLast={IMAGE.Show} styleeye={{marginLeft:0,height:hp(2),width:wp(5)}} /> */}
       <Text style={{fontWeight:'400',fontSize:12,color:COLORS.Green,marginVertical:5,marginTop:5}}>Confirm New Password</Text>
       <InputText 
            label={' Confirm Password '}
            rightIconProps={{name: newpasswordVisible ?  IMAGE.Greenkey : IMAGE.Show, color:'white',onPress: () => setNewPasswordVisibility(!newpasswordVisible), }}
            textInputProps={{placeholder: '* * * * * * * *',autoCapitalize: 'none', secureTextEntry: !newpasswordVisible, }}
            controllerProps={{name:'confirm_password',control,errors, rules: {required: true},}}
            imageLast={IMAGE.Show} styleeye={{marginLeft:0,right:10}}
            style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6)}}
            image={IMAGE.GreenLock}
        />
       {/* <InputText value={confirmPassSet} onChange={setconfirmPassSet} KeyboardType={'default'} placeholder={'Confirm New Password'} image={IMAGE.GreenLock} style={{borderColor:COLORS.Green,borderRadius:7,height:hp(6)}} imageLast={IMAGE.Show} styleeye={{marginLeft:0,height:hp(2),width:wp(5)}} /> */}
       <Button title={'Reset Password'} style={{marginTop:10,backgroundColor:COLORS.Green,width:'100%',height:hp(6),borderRadius:17}} color={{color:'#fff'}} onpress={handleSubmit(onResetPassword)} />
  
       </View>
        </View>
      </>
     case 4 :
      return <>
        <View>
        <Image source={IMAGE.Right} style={{alignSelf:'center',height:120,width:120}}/>
       <AuthTextComponent title={'Password Reset Successful'} text={TEXT.setPassword} styletwo={{marginLeft:6}} style={{marginLeft:6}} />
       <View style={{padding:18}}>
       <Button title={'Go back to Login'} style={{marginTop:0,backgroundColor:COLORS.Green,width:wp(90),height:hp(6),borderRadius:17}} color={{color:'#fff'}} onpress={()=>modalref(false)}/>
       </View>
        </View>
      </>
    }
  
  }   