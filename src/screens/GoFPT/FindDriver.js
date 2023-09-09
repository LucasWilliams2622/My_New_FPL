import { StyleSheet, FlatList, Text, Image, View, ScrollView } from 'react-native'
import React, { useContext, useCallback, useEffect, useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import ItemSearch from '../../components/GoFPT/ItemSearch'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
import ActionButton from 'react-native-action-button';
import ItemFindDriver from '../../components/GoFPT/ItemFindDiver'

const DATA = [{}, {}, {}, {}, {}, {}, {}, {}, {},]
const FindDriver = () => {
  const [dataFindDriver, setDataFindDriver] = useState([])
  const [showSearch, setShowSearch] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);

  useEffect(() => {
    getListDriver()
    return () => {

    }
  }, [appState])

  const getListDriver = async () => {
    try {
      const response = await AxiosInstance().get("gofpt/api/get-by-typeFind?typeFind=1");
      // console.log("===================================response", response);

      if (response.result) {
        if (Array.isArray(response.post) && response.post.length === 0) {
          console.log("post là một mảng rỗng");
        } else {
          console.log("post không phải là một mảng rỗng");
          setIsLoading(false)
          setDataFindDriver(response.post);
        }
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={AppStyle.main}>
      <FlatList
        style={{ marginVertical: 0,  marginBottom: 70}}
        data={dataFindDriver}
        showsHorizontalScrollIndicator={false}
        shouldRasterizeIOS
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ItemFindDriver data={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View>
            {showSearch ? <ItemSearch marginBottom={10} onPressRight={() => { { } }} /> : null}
          </View>
        )}
      />
    </View>
  )
}

export default FindDriver

const styles = StyleSheet.create({})