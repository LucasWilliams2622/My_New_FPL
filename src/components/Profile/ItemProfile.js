import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';

const ItemProfile = () => {
  const { infoUser, idUser, setIsLogin } = useContext(AppContext);


  const getInfoUser = async () => {
    try {
      const response = await AxiosInstance().get("user/api/get-by-id?id=" + idUser);
      console.log(response);
      console.log("infoUser", infoUser);

      if (response.result) {

        console.log(response.name);

      } else {
        console.log("Failed to get info user");

      }
    } catch (error) {
      console.log(error);
    }
  }
  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      setIsLogin(false)
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getInfoUser()

    return () => {
    }
  }, [])

  return (
    <View style={[styles.boxShadow, AppStyle.row, { width: '100%', zIndex: 99 }]}>
      <View style={[AppStyle.row, { width: '100%', padding: 16, alignItems: 'center', borderRadius: 10 }]}>
        <Image style={{ width: 70, height: 70, borderRadius: 100 }} source={require('../../assets/images/green_field.jpg')} />
        <View style={{ marginLeft: 15 }}>
          <Text style={[AppStyle.titleMedium, { color: COLOR.black, marginBottom: 4 }]}>{infoUser.name}</Text>
          <Text style={[AppStyle.titleMedium, { marginBottom: 4 }]}>{infoUser.studentCode}</Text>
          <Text style={[AppStyle.titleSmall, { color: COLOR.normalText, marginBottom: 4 }]}>{infoUser.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => { LogOut() }}>
        <Image style={{ width: 24, height: 24, right: 20, top: 30, tintColor: COLOR.primary }} source={require('../../assets/icons/ic_logout.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default ItemProfile

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }

})