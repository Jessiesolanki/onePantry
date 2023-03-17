import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { API, base_url,ERROR,LOADING } from './index';
export const HomeContext = React.createContext()
const HomeProvider = ({children}) => {
    const [Productlist, setProductlist] = useState('')
   const [CatList, setCatList] = useState('')
   const [ProductDtl, setProductDtl] = useState('')
   const [FavoriteData, setFavoriteData] = useState('')
   const [Favoritelist, setFavoritelist] = useState('')
   const [searchData, setsearchData] = useState('')
   const [addressList, setaddressList] = useState('')


    const API_HOME= {
        ProductList   : async (params,onSuccess) => await API.post('user/home-screen-prod-list', params).then(res => { setProductlist(res.data.data.search_data) }),
        CategoriesList   : async (params,onSuccess) => await API.post('user/home-screen-cat-list', params).then(res => { setCatList(res.data.data.search_data) }),
        ProductDetails   : async (params,onSuccess) => await API.post('user/home-screen-prod-detail', params).then(res => { setProductDtl(res.data.data) }),
        AddFavorite   : async (params,onSuccess) => await API.post('user/add-favorite', params).then(res => { setFavoriteData(res.data.data) }),
        FavoriteList   : async (params,onSuccess) => await API.post('user/list-favorite', params).then(res => { setFavoritelist(res.data.data),console.log(res.data.data,'oooooooooooo') }),
        AddToCart   : async (params,onSuccess) => await API.post('user/add-to-cart', params).then(res => { console.log(res)}),
        HomeSearching   : async (params,onSuccess) => await API.post('user/home-screen-searching', params).then(res => {setsearchData(res.data), console.log("res is" , res.data)}),
        AddressSearching : async (params,onSuccess) => await API.get('user/listShippingAddress' , params).then(res => {setaddressList(res.data), console.log("address is" , res.data)}),

      }

  return (
    <HomeContext.Provider value={{
        API_HOME,
        Productlist, 
        setProductlist,
        CatList,
        setCatList,
        ProductDtl, 
        setProductDtl,
        FavoriteData, 
        setFavoriteData,
        Favoritelist, 
        setFavoritelist,
        searchData, 
        setsearchData,
        addressList,
        setaddressList
      }}  >
       
          {children}
      </HomeContext.Provider>
  )
}

export default HomeProvider