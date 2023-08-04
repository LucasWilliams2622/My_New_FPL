import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../constants/Theme'
import { AppStyle } from '../constants/AppStyle'
import ItemEnterprise from '../components/New/ItemEnterprise'
const DataNewsActivate = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Thông báo thay đổi giờ học Block 2',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "23/07/2023"
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bdsadaa',

    title: 'Thông báo lịch thi',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "23/07/2023"
  },


]

const Enterprise = () => {
  return (
    <SafeAreaView style={styles.BoxContent} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={[AppStyle.column,]}>
          <View style={[AppStyle.column,]}>
            <Text style={AppStyle.titleBig}> Tin mới nhất </Text>
            <Image style={[AppStyle.iconMedium, { position: "absolute", left: 110, bottom: 2 }]} source={require('../assets/icons/ic_new.png')} />
          </View>
          <FlatList
            vertical
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={DataNewsActivate}
            renderItem={({ item }) => <ItemEnterprise data={item} />}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={[AppStyle.column,]}>
          <View style={[AppStyle.column, { marginTop: 20 }]}>
            <Text style={AppStyle.titleBig}> Tin mới khác </Text>
            <Image style={[AppStyle.iconMedium, { position: "absolute", left: 110, bottom: 2 }]} source={require('../assets/icons/ic_new.png')} />
          </View>
          <FlatList
            vertical
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={DataNewsActivate}
            renderItem={({ item }) => <ItemEnterprise data={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )

}

export default Enterprise
const styles = StyleSheet.create({
  BoxContent: {
    backgroundColor: COLOR.background4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    height: '100%',
    width: '100%',
    
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

})