import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import AppProvider from "./AppProvider"
import AuthProvider from "./AuthProvider"
import HomeProvider from "./HomeProvider";
import ProfileProvider from "./ProfileProvider";
import ShopProvider from "./ShopProvidre";
export const STATUS = {
    LOADING: 'laoding',
    ERROR: 'error'
}

export default Providers = ({ children }) => {
    return (
        <AppProvider>
            <AuthProvider>
                 <HomeProvider>
                       <ShopProvider>
                            <ProfileProvider>
                                    {children}
                            </ProfileProvider> 
                       </ShopProvider>   
                 </HomeProvider>
            </AuthProvider>
     </AppProvider>
    )
    }
// export const Base_URL = 'http://192.168.0.107:3282/api/v1/'
export const Base_URL = 'http://54.201.160.69:3282/api/v1/'

 export const Image_URL = 'http://54.201.160.69:3282/' 
// export const Image_URL = 'http://192.168.0.107:3282/ '
export const API = instance = axios.create({
    baseURL: Base_URL,
    headers: { 'Content-Type': 'application/json' },
   
    
});
API.interceptors.request.use(async config => ({ ...config,  headers: { ...config.headers, 'Authorization': await AsyncStorage.getItem('token'),'user_type': 'user'} }))
