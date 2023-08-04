import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../constants/Theme'
import { AppStyle } from '../constants/AppStyle'

import { AppContext } from '../utils/AppContext';
import AxiosInstance from '../constants/AxiosInstance';
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
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentNews, setdataCurrentNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllNews = async () => {
    try {
      // const response = await AxiosInstance().get("SchedulesSubject/api/get-by-current-day&currentDay=" + currentDay);
      const response = await AxiosInstance().get("/news/api/search-by-category?id=64c7b313704c7286d864e648");
      // console.log("===================================response", response.news);
      if (response.result) {
        // console.log("===================================response", isLoading);
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
    // console.log("INFOR ", infoUser);

    getAllNews()
    return () => {

    }
  }, [appState])
  return (
    <SafeAreaView style={styles.BoxContent} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
          <FlatList
            vertical
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={dataCurrentNews}
            renderItem={({ item }) => <ItemEnterprise data={item} />}
            keyExtractor={item => item.id}
          />
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