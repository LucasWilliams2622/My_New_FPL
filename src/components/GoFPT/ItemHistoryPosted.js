import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import numeral from 'numeral';
import ItemButton from "../ItemButton";

const ItemHistoryPosted = () => {
  return (
    <View style={styles.boxItem}>
      <View style={styles.left} />
      <View style={styles.boxContent}>
        <View style={styles.boxLocation}>
          <View style={[AppStyle.row, { alignItems: 'center', width: '48%' }]}>
            <Image style={styles.iconLocation} source={require('../../assets/icons/ic_location.png')} />
            <Text style={[AppStyle.text12, { fontWeight: '600', marginLeft: 4 }]}>Quận Bình Thạnh </Text>
          </View>

          <View style={[AppStyle.row, { alignItems: 'center', width: '48%' }]}>
            <Image style={styles.iconLocation} source={require('../../assets/icons/ic_destination.png')} />
            <Text style={[AppStyle.text12, { fontWeight: '600', marginLeft: 4 }]}> Quận Bình Thạnh </Text>
          </View>
        </View>

        <View style={styles.boxInfo}>
          <View style={styles.boxItemInfo}>
            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_calendar.png')} />
              <Text style={[AppStyle.text10, { fontWeight: '500', marginLeft: 6 }]}>Ngày: 12/02/2023</Text>
            </View>

            <View style={[AppStyle.rowCenter, { width: '50%', justifyContent: 'space-between' }]}>
              <View style={AppStyle.rowCenter}>
                <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_phone.png')} />
                <Text style={[AppStyle.text10, { fontWeight: '500', marginLeft: 6, color: COLOR.textPhone, textDecorationLine: 'underline', }]}
                >09876543121</Text>
              </View>

              <TouchableOpacity>
                <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_invisible.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxItemInfo}>
            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_time.png')} />
              <Text style={[AppStyle.text10, { fontWeight: '500', marginLeft: 6 }]}>Ngày: 12/02/2023</Text>
            </View>

            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_chat.png')} />
              <Text style={[AppStyle.text10, { fontWeight: '500', marginLeft: 6, }]}
              >Nhắn tin</Text>
            </View>
          </View>

          <View style={[styles.boxItemInfo, { marginBottom: 0 }]}>
            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_vietnam_dong.png')} />
              <Text style={[AppStyle.text12, { fontWeight: '700', marginLeft: 6, fontStyle: 'italic', color: COLOR.textMoney }]}>{numeral(10000).format('0,0')} ₫</Text>
            </View>

            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <ItemButton />
            </View>

          </View>
        </View>
      </View>
    </View>


  );
};

export default ItemHistoryPosted;

const styles = StyleSheet.create({
  boxItem: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor:'#B5B5B5',
    marginBottom:12

  },
  boxContent: {
    width: '97%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,

  },
  boxLocation: {
    backgroundColor: COLOR.headItem,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

    paddingVertical: 10,


  },
  boxInfo: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  boxItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    marginBottom: 12,
  },
  left: {
    backgroundColor: COLOR.left3,
    width: "3%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,


  },
  iconLocation: {
    width: 20,
    height: 20,

  }
});
