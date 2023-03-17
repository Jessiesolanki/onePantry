
import React,{useState} from "react";
import { API, base_url,ERROR,LOADING } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeStack, navigate, ROUTES } from '../Navigations/Index'
import { useNavigation } from '@react-navigation/native';
export const AuthContext = React.createContext()
const AuthProvider = ({children}) => {
  // const navigation = useNavigation(); 
  const [redisterData, setredisterData] = useState('')
  const [Login, setLogin] = useState('')
  const [userDetail, setUserDetail] = useState('')
  const [otp, setotp] = useState('')
  const [token, settoken] = useState('')
  const API_CALL = {
    Registration: async (params,onSuccess) => await API.post('user/sign-up', params).then(res => { setredisterData(res.data),AsyncStorage.setItem('user_type', 'user') }),
    Login: async (params,onSuccess) => await API.post('user/sign-in', params).then(res => { AsyncStorage.setItem('token', res.data.data.token),AsyncStorage.setItem('user_type', 'user'), setLogin(res.data.data) }),
    UserDetail: async (params,onSuccess) => await API.get('user/detail-user', params).then(res =>  {setUserDetail(res.data.data) }),
    ForgotPassword: async (params,onSuccess) => await API.post('user/forget-password', params).then(res =>  {setotp(res.data)}),
    OtpVerify: async (params,onSuccess) => await API.post('user/verify-otp', params).then(res =>  {console.log(res.data , "otp verfied successfully")}),
    ResetPassword: async (params,onSuccess) => await API.put('user/update-password', params).then(res =>  {console.log(res.data,'change-passwordchange-password')}),


  }

  return (
    <AuthContext.Provider value={{
      API_CALL,
      redisterData,
      setredisterData,
      Login,
      setLogin,
      userDetail,
      setUserDetail,
      otp, setotp
  
    }}  >
     
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider