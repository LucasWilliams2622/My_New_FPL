import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'

const ItemDish = () => {
  return (
    <TouchableOpacity style={[styles.boxDish,appStyle.boxShadow]}>
      <Image style={appStyle.dishImage} source={require('../assets/images/ban_tin.png')} />
      <View style={[styles.boxContent]}>
        <View >
          <Text style={appStyle.titleDish}>ItemDish</Text>
          <Text style={[appStyle.titleDish,{fontWeight:'400',fontSize:14}]}>ItemDish</Text>

        </View>
        <Text style={[appStyle.titleDish,{color:COLOR.primary}]}>Buy</Text>

      </View>
    </TouchableOpacity>
  )
}

export default ItemDish

const styles = StyleSheet.create({
  boxDish: {
    backgroundColor: COLOR.background,
    borderRadius: 16,
    marginRight:16,
    marginVertical:4,
    
  },
  boxContent: {
    marginHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical:12,

  }
})