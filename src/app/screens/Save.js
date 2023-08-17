import { SafeAreaView, StyleSheet, FlatList, Text, View } from 'react-native'
import React from 'react'
import ItemHeader from '../components/ItemHeader'
import ItemSaveDish from '../components/ItemSaveDish'
import { appStyle } from '../theme/appStyle'
const DATA = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
const Save = () => {
  return (
    <SafeAreaView style={appStyle.container}>
      <ItemHeader title={"Save"} />

      <View style={{  marginTop:8,flex:1,marginBottom:70 }}>
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

export default Save

const styles = StyleSheet.create({})