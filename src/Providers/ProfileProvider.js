
import React,{useState} from "react";
import { API, base_url,ERROR,LOADING } from './index';
export const ProfileContext = React.createContext()
const ProfileProvider = ({children}) => {


  const API_PROFILE = {
    UpdateProfile: async (params,onSuccess) => await API.put('user/update-user', params).then(res => { console.log(res.data) }),
  }

  return (
    <ProfileContext.Provider value={{
      API_PROFILE,
    }}  >
     
        {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider