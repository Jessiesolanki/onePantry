import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView ,Alert} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import BackComponent from '../../Components/BackComponent'
import { COLORS, IMAGE } from '../../Constant/Images'
import EditProfileBlock from '../../Components/EditProfileBlock'
import RatingCard from '../../Components/RatingCard'
import Button from '../../Components/Button'
import { hp, wp } from '../../Components/Config'
import { AuthContext } from '../../Providers/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import useLoadingFn from '../../Hook/useLoadingFn'
import { ProfileContext } from '../../Providers/ProfileProvider'
import { Base_URL, Image_URL } from '../../Providers'
const Profile = () => {
  const { userDetail, API_CALL,Login } = useContext(AuthContext);
  console.log("user detail recieved" , userDetail)
  const { API_PROFILE } = useContext(ProfileContext);
  const UpdateProfile = useLoadingFn(API_PROFILE.UpdateProfile);
  // const { control,handleSubmit, formState: {errors}, reset, watch} = useForm();
  const [Switch, setSwitch] = useState(1)
  const [name, setname] = useState(!edit ? userDetail?.result?.first_name : '')
  const [edit, setedit] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const [email, setemail] = useState(!edit ? userDetail?.result?.email : '')
  const [response, setResponse] = useState(userDetail?.result?.image == " " ? {

    assets: [
      {
        fileName:
          'rn_image_picker_lib_temp_1050a18c-bbdd-4216-82b9-d4eca609eec 9.jpg',
        fileSize: 117953,
        height: 800,
        id: 'rn_image_picker_lib_temp_1050a18c-bbdd-4216-82b9-d4eca609eec9.jpg',
        timestamp: null,
        type: 'image/jpeg',
        uri: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        width: 360,
      },
    ]
  }
    :
    {

      assets: [
        {
          fileName:
            'rn_image_picker_lib_temp_1050a18c-bbdd-4216-82b9-d4eca609eec 9.jpg',
          fileSize: 117953,
          height: 800,
          id: 'rn_image_picker_lib_temp_1050a18c-bbdd-4216-82b9-d4eca609eec9.jpg',
          timestamp: null,
          type: 'image/jpeg',
          uri: userDetail?.result?.image,
          width: 360,
        },
      ]
    }

  );
console.log(Login,'LoginLoginLogin')
  const UserDetail = useLoadingFn(API_CALL.UserDetail);
 
  useEffect(() => {
    UserDetail({ params: {}, onSuccess: () => { }, })
  }, [])
  useEffect(() => {
    UserDetail({ params: {}, onSuccess: () => { }, })
  }, [refresh])
  const includeExtra = true;


  //--------------------------------------Functions----------------------------------------------//

  const OnSubmit = async (data) => {
    const image ={
      type: response?.assets[0].type,
      uri: response?.assets[0].uri,
      fileName: response?.assets[0].fileName
    }
    
    const newData = response?.assets[0].uri 
    const newName = userDetail?.result?.first_name

    const formData =new FormData();
    formData.append('image', newData);
    formData.append('first_name', name);


    fetch('http://54.201.160.69:3282/api/v1/user/update-user' , {
  method: 'PUT',
  headers: {
    Authorization: await AsyncStorage.getItem('token'),
  },
  body: formData,
  
})
.then(response => response.json())
.then(result => {
  setedit(false), 
  setrefresh(true),
  Alert.alert('Success','User Updated Successfully')
  console.log('Success:', result);
 
})
.catch(error => {
  console.error('Error:', error);
});
  }



  const  onButtonPress  = React.useCallback(async (type, options) => {
    ImagePicker.launchImageLibrary(
      {
        maxHeight: 800,
        maxWidth: 800,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
      },
      e => {
        setResponse(e)
      },
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false} >
        <BackComponent text={'Profile'} image={IMAGE.Edit} onPress={() => setedit(!edit)} />
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => setSwitch(1)} style={[styles.ActivButton, { backgroundColor: Switch == 1 ? COLORS.Green : null, }]}>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 15, color: Switch == 1 ? "#fff" : "#535763B2" }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSwitch(2)} style={[styles.ButtonSecurity, { backgroundColor: Switch == 2 ? COLORS.Green : null, }]}>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 15, color: Switch == 2 ? "#fff" : "#535763B2" }}>Security  Credentials</Text>
          </TouchableOpacity>
        </View>
        <Image style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 20, marginBottom: 5, borderRadius: 40 }} source={{ uri: response?.assets[0]?.uri }} />
        {/* <Image style={{width:80,height:80,alignSelf:'center',marginTop:20,marginBottom:5,borderRadius:40}} source={IMAGE.Man} /> */}

        <TouchableOpacity onPress={() => onButtonPress()} >
          <Image style={{ width: 33, height: 33, alignSelf: 'center', bottom: 6, right: wp(37), position: 'absolute' }} source={IMAGE.Camera} />
        </TouchableOpacity>
        <EditProfileBlock edit={edit} name={name} setname={setname} value={userDetail?.result?.first_name} title={'Username'} />
        <EditProfileBlock edit={edit} name={email} setname={setemail} value={userDetail?.result?.email} title={'Email ID'} />
        <EditProfileBlock value={userDetail?.result?.addressDetail?.street + " ," + userDetail?.result?.addressDetail.city + " " + userDetail?.result?.addressDetail?.country?.name} title={'Address'} />
        <RatingCard />
        <EditProfileBlock value={'1,200'} title={'Number of followers'} />
        <EditProfileBlock value={'5000'} title={'Balance Credit'} />
        <View style={styles.BankViewBlock}>
          <Image style={{ width: 14, height: 14 }} source={IMAGE.BankIcon} />
          <Text style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, color: "#535763B2" }}>Bank Information</Text>
          <Image style={{ width: 6, height: 12, left: wp(43) }} source={IMAGE.Arrow} />
        </View>
        <Button title={'Save'} style={{ marginTop: 20, backgroundColor: COLORS.Green, borderRadius: 15, alignSelf: 'center', marginBottom: 10, width: 170 }} color={{ color: '#fff' }} onpress={() => OnSubmit()} />

      </ScrollView>
    </View>
  )
}

export default Profile
const styles = StyleSheet.create({
  ActivButton: {
    width: 140,
    height: 45,

    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 8,
    borderColor: COLORS.Green,
    borderWidth: 1
  },
  ButtonSecurity: {
    width: 140,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: COLORS.Green,
    borderWidth: 1
  },
  mainView: {
    width: 341,
    backgroundColor: '#fff',
    height: 66,
    alignSelf: 'center',
    borderRadius: 5,
    padding: 19,
    justifyContent: 'center',
    marginTop: 10
  },
  textTitle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#808080'
  },
  customRatingBarStyle: {

    flexDirection: 'row',
    marginTop: 10,

  },
  textrating: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.Green,
    marginTop: 7
  },
  BankViewBlock: {
    width: wp(90),
    backgroundColor: '#fff',
    height: hp(5.5),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    marginTop: 10,
    elevation: 2
  }
})