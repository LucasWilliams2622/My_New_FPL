import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppStyle } from '../constants/AppStyle'
import ItemDetail from '../components/New/ItemDetail'
import { useNavigation } from '@react-navigation/native'

const DetailsNew = () => {
  const navigation = useNavigation();

  return (
    <View style={[AppStyle.container, { padding: 16 }]}>
      <TouchableOpacity style={[AppStyle.row]} onPress={()=>{navigation.goBack()}}>
        <Image source={require('../assets/icons/ic_back_black.png')} />
        <Text style={[AppStyle.titleMedium]}> Chi tiết</Text>

      </TouchableOpacity>
      <Text style={[AppStyle.titleBig, { marginTop: 10 }]}>Thay đổi thời gian học kì Summer 2023</Text>
      <ItemDetail />
    </View>
  )
}

export default DetailsNew

const styles = StyleSheet.create({})