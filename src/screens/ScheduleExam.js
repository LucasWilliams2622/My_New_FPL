import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AppStyle } from '../constants/AppStyle'
import { Dropdown } from 'react-native-element-dropdown'
import ItemScheduleExam from '../components/Schedule/ItemScheduleExam';
import { COLOR } from '../constants/Theme';
import ItemSchedule from '../components/Schedule/ItemScheduleExam';
import AxiosInstance from '../constants/AxiosInstance';
import { AppContext } from '../utils/AppContext'
import Swiper from 'react-native-swiper'

const data = [
  { label: '7 ngày tới', value: '7' },
  { label: '14 ngày tới', value: '14' },
  { label: '30 ngày tới', value: '30' },
  { label: '60 ngày tới', value: '60' },
  { label: '90 ngày tới', value: '90' },
];

const ItemTextSches = () => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentScheduleExam, setdataCurrentScheduleExam] = useState([])
  const [dataCurrendayScheduleExam, setDataCurrendayScheduleExam] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(7);


  const getCurrentSchedule = async () => {
    try {
      console.log("value", value);
      // const response = await AxiosInstance().get("SchedulesSubject/api/get-by-current-day&currentDay=" + currentDay);
      const response = await AxiosInstance().get("scheduleExam/api/get-by-" + value + "-day?currentDay=" + currentDay);
      const responseCurrenDay = await AxiosInstance().get("scheduleExam/api/get-by-current-day?currentDay=" + currentDay);
      console.log("===================================response", responseCurrenDay);
      if (response.result) {
        // console.log("===================================response", isLoading);
        setdataCurrentScheduleExam(response.scheduleExam);
        setDataCurrendayScheduleExam(responseCurrenDay.scheduleExam);
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

    getCurrentSchedule()
    return () => {

    }
  }, [appState])



  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={AppStyle.container}>
       <Dropdown
        style={[AppStyle.dropdown, isFocus && { borderColor: COLOR.primary, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={data[0].label}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderItem={renderItem}
      />
      <Image style={[AppStyle.icon, { position: 'absolute', left: 30, top: 28, tintColor: isFocus ? COLOR.primary : COLOR.black }]} source={require('../assets/icons/ic_schedule.png')} />
      <View style={styles.BoxContent}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Text style={[AppStyle.titleBig, { marginBottom: 10,display: dataCurrendayScheduleExam.length > 0 ? 'flex':'none'  }]}>Lịch thi hôm nay</Text>

          {isLoading ?
            (<Image
              source={require('../assets/gif/loading_bar.gif')}
              style={{ width: 150, height: 100, alignSelf: 'center', display: dataCurrendayScheduleExam.length > 0 ? 'flex':'none' }} />)
            : (<FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={dataCurrendayScheduleExam}
              renderItem={({ item }) => <ItemScheduleExam data={item} />}
              keyExtractor={item => item.id}
            />)}

          <Text style={[AppStyle.titleBig, { marginBottom: 10 }]}>Lịch thi {value} ngày tới</Text>

          {isLoading ?
            (<Image
              source={require('../assets/gif/loading_bar.gif')}
              style={{ width: 150, height: 100, alignSelf: 'center', }} />)
            : (<FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={dataCurrentScheduleExam}
              renderItem={({ item }) => <ItemScheduleExam data={item} />}
              keyExtractor={item => item.id}
            />)}

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default ItemTextSches

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "93%"
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',

  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',

  },

  iconStyle: {
    width: 30,
    height: 30,
  },
  BoxContent: {
    backgroundColor: COLOR.background2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    height: '100%',
    width: '100%',

    paddingHorizontal: 16,
    paddingVertical: 8
  },
});