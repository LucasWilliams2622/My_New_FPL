import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AppStyle, windowHeight } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
import QRCode from 'react-native-qrcode-svg';

const ItemProfile = () => {
  const { infoUser, idUser, setIsLogin } = useContext(AppContext);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [valueQRCode, setValueQRCode] = useState(infoUser.studentCode)

  const Overlay = () => (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={() => setOverlayVisible(false)}
    />
  );

  const Panel = () => (
    <View style={{}}>
      <View style={styles.header}>
        <Text style={[AppStyle.titleBig, { color: COLOR.white, alignItems: 'center' }]}>Thông tin sinh viên</Text>
      </View>
      <View style={styles.panel}>
        <View style={{}}>
          <View style={[AppStyle.row, {}]}>
            {infoUser.avatar != "" ?
              (<Image style={AppStyle.portrait} source={{ uri: infoUser.avatar }} />)
              :
              (<Image style={AppStyle.portrait} source={require('../../assets/images/green_field.jpg')} />)
            }
            <View style={[AppStyle.column, { marginLeft: 8 }]}>
              <View style={{ marginBottom: 12 }} >
                <Text style={AppStyle.textNormal}>Họ và tên/Name</Text>
                <Text style={AppStyle.titleBig}>{infoUser.name}</Text>
              </View>
              <View style={{ marginBottom: 12 }} >
                <Text style={AppStyle.textNormal}>MSSV/Student ID</Text>
                <Text style={[AppStyle.titleMedium, { width: 160, color: COLOR.title, letterSpacing: 1, textAlign: 'left' }]} numberOfLines={1}>{infoUser.studentCode}</Text>
              </View>
              <View >
                <Text style={AppStyle.textNormal}>Chuyên ngành/Major</Text>
                <Text style={[AppStyle.titleMedium, { width: 160, color: COLOR.title }]} numberOfLines={2}>Lập trình máy tính/Computer Programming</Text>
              </View>
            </View>
          </View>
          <Text style={styles.textLink} >----------------------- caodang.fpt.edu.vn -----------------------</Text>
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <QRCode value={valueQRCode}
              color={COLOR.title}
              backgroundColor='white'
              // gradientDirection={[0, 0, 0]}
              enableLinearGradient={true}
              linearGradient={[COLOR.Fcolor, COLOR.Pcolor, COLOR.Tcolor]}
              logo={require('../../assets/icons/logo_fpt_square.jpg')}
              logoBackgroundColor={'white'}
              logoBorderRadius={16}
              logoMargin={6}
              size={180}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => setOverlayVisible(false)} style={AppStyle.buttonBlue}>
          <Text style={AppStyle.titleButton}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
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
  const showInfo = () => {
    setOverlayVisible(true)
  }
  useEffect(() => {
    getInfoUser()

    return () => {
    }
  }, [])

  return (
    <View style={[styles.boxShadow, AppStyle.row, { width: '100%', justifyContent: 'space-between' }]}>
      <View style={[AppStyle.row, { width: '100%', padding: 16, alignItems: 'center', borderRadius: 10 }]}>
        {infoUser.avatar != "" ?
          (<Image style={{ width: 70, height: 70, borderRadius: 100 }} source={{ uri: infoUser.avatar }} />)
          :
          (<Image style={{ width: 70, height: 70, borderRadius: 100 }} source={require('../../assets/images/green_field.jpg')} />)
        }

        <View style={{ marginLeft: 15 }}>
          <Text style={[AppStyle.titleMedium, { color: COLOR.black, marginBottom: 4 }]}>{infoUser.name}</Text>
          <Text style={[AppStyle.titleMedium, { marginBottom: 4 }]}>{infoUser.studentCode}</Text>
          <Text style={[AppStyle.titleSmall, { color: COLOR.normalText, marginBottom: 4 }]}>{infoUser.email}</Text>
        </View>
      </View>
      <View style={[AppStyle.column, { left: -30, top: 20 }]}>
        <TouchableOpacity onPress={() => { LogOut() }}>
          <Image style={{ width: 27, height: 24, marginBottom: 16, tintColor: COLOR.primary }} source={require('../../assets/icons/ic_logout.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { showInfo() }}>
          <Image style={{ width: 24, height: 24, }} source={require('../../assets/icons/ic_qr_code.png')} />
        </TouchableOpacity>
      </View>
      <Modal visible={isOverlayVisible} transparent>
        <View style={styles.container}>
          <Overlay />
          <Panel />
        </View>
      </Modal>
    </View>
  )
}

export default ItemProfile

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  panel: {
    backgroundColor: 'white',
    padding: 15,
    width: 370,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  textLink: {
    paddingVertical: 16,
    alignSelf: 'center',
  }

})