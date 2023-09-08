import { StyleSheet, FlatList,Text, View, ScrollView } from 'react-native'
import React from 'react'
import { AppStyle } from '../../constants/AppStyle'
import ItemSearch from '../../components/GoFPT/ItemSearch'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'

const DATA=[{},{},{},{},{},{},{},{},{},]
const FindDriver = () => {
  return (
    <View style={AppStyle.main}>
      <ItemSearch/>

      <FlatList
        data={DATA}
        showsHorizontalScrollIndicator={false}
         shouldRasterizeIOS
         showsVerticalScrollIndicator={false}
        style={{marginVertical:12}}
        renderItem={({item}) => <ItemHistoryPosted data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default FindDriver

const styles = StyleSheet.create({})