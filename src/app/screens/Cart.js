import { SafeAreaView, StyleSheet, FlatList, Text, View } from 'react-native'
import React from 'react'
import ItemHeader from '../components/ItemHeader'
import ItemSaveDish from '../components/ItemSaveDish'
import { appStyle } from '../theme/appStyle'
const DATA = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
const Cart = () => {
  return (
    <SafeAreaView style={appStyle.container}>
      <ItemHeader title={"Cart"} />

      <View style={{  marginBottom: 60,marginTop:16}}>
        <FlatList
          style={{  }}
          contentContainerStyle={{ justifyContent: 'space-between', marginHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={DATA}
          numColumns={2}
          renderItem={({ item }) => <ItemSaveDish title={item} />}
          keyExtractor={item => item.id}
        />
      </View>

    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({})