import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'
const HistoryPosted = () => {
  //http://103.57.129.166:3000/gofpt/api/get-by-idUser?idUser=
  return (
    <View>
      <Text>HistoryPosted</Text>
      <ItemHistoryPosted />
    </View>
  )
}

export default HistoryPosted

const styles = StyleSheet.create({})