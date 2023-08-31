import { SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppStyle } from '../constants/AppStyle'
import { COLOR } from '../constants/Theme'
import { AppContext } from '../utils/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { WebView } from 'react-native-webview';


const AppHeader = () => {
  const { idUser, setIsLogin, } = useContext(AppContext);
  const [infoUser, avatar, setAvatar] = useState('')

  const [deviceName, setDeviceName] = useState('');
  const [osVersion, setOsVersion] = useState('');


  useEffect(() => {
    getUserInfo()

    const getDeviceName = async () => {
      const name = await DeviceInfo.getDeviceName();
      console.log("NAME", name);
      setDeviceName(name);
    };

    // Lấy phiên bản hệ điều hành
    const getOsVersion = async () => {
      const version = await DeviceInfo.getSystemVersion();
      console.log("version", version);

      setOsVersion(version);
    };

    getDeviceName();
    getOsVersion();

    return () => {

    }
  }, [])
  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        // Sử dụng thông tin đã lưu ở đây
        console.log("userInfooooooooooooádo", userInfo.avatar);
        setAvatar(userInfo.avatar)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={[AppStyle.header, AppStyle.row, { paddingTop: 20, paddingHorizontal: 16, justifyContent: 'space-between', }]}>
      <TouchableOpacity style={[AppStyle.row, {}]}>
        {infoUser.avatar != "" ?
          (<Image style={AppStyle.avatar} source={{ uri: avatar }} />)
          :
          (<Image style={AppStyle.avatar} source={require('../assets/images/defaultAvatar.png')} />)
        }
        <View style={[AppStyle.column, { marginLeft: 7, justifyContent: 'center', paddingTop: 5 }]}>
          <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>{infoUser.name}</Text>
          <Text style={[AppStyle.titleSmall, { paddingTop: 4 }]}>{infoUser.studentCode}</Text>
        </View>
      </TouchableOpacity>
      <Image style={{ width: 88, height: 27, marginTop: 10, paddingRight: 16, }} source={require('../assets/images/logo.jpg')} />
    </SafeAreaView>
  )
}

export default AppHeader

const styles = StyleSheet.create({})