import { View, Text, StyleSheet, Image, ScrollView, FlatList, } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStyle } from '../constants/AppStyle'
import { COLOR } from '../constants/Theme'
import ItemStudy from '../components/New/ItemStudy'
import dayjs from 'dayjs'
import { AppContext } from '../utils/AppContext';
import AxiosInstance from '../constants/AxiosInstance';

const Study = (props) => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentNews, setdataCurrentNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllNews = async () => {
    try {
      const response = await AxiosInstance().get("/news/api/search-by-category?id=64c7b2fb704c7286d864e644");
      if (response.result) {
        setdataCurrentNews(response.news.reverse());
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

    getAllNews()
    return () => {

    }
  }, [appState])
  return (
    <SafeAreaView style={styles.BoxContent} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", marginBottom: 75 }}>
          {isLoading ?
            (<Image
              source={require('../assets/gif/loading_bar.gif')}
              style={{ width: 150, height: 100, alignSelf: 'center', }} />)
            : (<FlatList
              vertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataCurrentNews}
              renderItem={({ item }) => <ItemStudy data={item} />}
              keyExtractor={item => item.id}
            />)}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Study

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
