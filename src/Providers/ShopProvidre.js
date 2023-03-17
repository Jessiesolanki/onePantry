import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { API, base_url,ERROR,LOADING } from './index';
export const ShopContext = React.createContext()
const ShopProvider = ({children}) => {
    const [YourCartListData, setYourCartListData] = useState('')
    const [AddressDetailsData, setAddressDetailData] = useState('')
    const [CountryListData, setCountryListData] = useState('')
    const [StateListData, setStateListData] = useState('')
    const [CheckoutDetail, setCheckoutDetail] = useState('')
    const API_Shop= {
        YourCartList   : async (params,onSuccess) => await API.post('user/cart-list', params).then(res => {setYourCartListData(res.data.data) }),
        ShippingAddressDetail : async (params,onSuccess) => await API.post('user/detailOfShippingAddress', params).then(res => {setAddressDetailData(res.data) ,console.log(res.data , "Address Detail list_____")}),
        CountryDetail : async (params,onSuccess) => await API.get('getCountry', params).then(res => {setCountryListData(res.data) }),
        StateDetail : async (params,onSuccess) => await API.get('getStates', params).then(res => {setStateListData(res.data) }),
        CheckOutDetail : async (params,onSuccess) => await API.post('user/check-detail', params).then(res => {setCheckoutDetail(res.data) ,console.log(res.data , "setCheckoutDetail  list_____")}),
        // CartDelete : async (params,onSuccess) => await API.delete('user/delete-prod-cart', params).then(res => { console.log(res.data , "setCheckoutDetail  list_____")}),
        DeleteItemCart   : async (params,onSuccess) => await API.post('user/delete-prod-cart', params).then(res => {console.log("dhfkjldsjfkdjgka_____"  , res) }),

      }
      
  return (
    <ShopContext.Provider value={{
        API_Shop,
        YourCartListData, 
        setYourCartListData,
        AddressDetailsData,
        setAddressDetailData,
        CountryListData,
        setCountryListData,
        StateListData,
        setStateListData,
        CheckoutDetail, 
        setCheckoutDetail
      }}  >
       
          {children}
      </ShopContext.Provider>
  )
}

export default ShopProvider