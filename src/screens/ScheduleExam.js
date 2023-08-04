import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image,StatusBar } from 'react-native'
import React, { useState, useEffect ,useContext} from 'react'
import { AppStyle } from '../constants/AppStyle'
import { Dropdown } from 'react-native-element-dropdown'
import ItemScheduleExam from '../components/Schedule/ItemScheduleExam';
import { COLOR } from '../constants/Theme';
import ItemSchedule from '../components/Schedule/ItemScheduleExam';
import AxiosInstance from '../constants/AxiosInstance';
import { AppContext } from '../utils/AppContext'
import Swiper from 'react-native-swiper'

const data = [
  { label: '3 ngày tới', value: '1' },
  { label: '7 ngày tới', value: '2' },
  { label: '14 ngày tới', value: '3' },
  { label: '21 ngày tới', value: '4' },
  { label: '30 ngày tới', value: '5' },
  { label: '60 ngày tới', value: '6' },
  { label: '90 ngày tới', value: '7' },
];

const DataScheduleToday = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-132123',
    title: 'Game 2d',
    location: "Phòng T123 (Tòa T)",
    time: "Ca 4 | 15:15 - 17:15",
    subJectCode: "MOB123",
    lecturers: "dintnt24",
    amphitheater: "Phần mềm quang trung",
    layer: "MD18102",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Game 3D',
    location: "Phòng T123 (Tòa F)",
    time: "Ca 4 | 15:15 - 17:15",
    subJectCode: "MOB123",
    lecturers: "dintnt24",
    amphitheater: "Phần mềm quang trung",
    layer: "MD18102",
  },
];

const ItemTextSches = () => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentScheduleExam, setdataCurrentScheduleExam] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getCurrentSchedule = async () => {
    try {
      // const response = await AxiosInstance().get("SchedulesSubject/api/get-by-current-day&currentDay=" + currentDay);
      const response = await AxiosInstance().get("scheduleExam/api/get-all");
      console.log("===================================response", response);

      if (response.result) {
        // console.log("===================================response", isLoading);
        setdataCurrentScheduleExam(response.ScheduleExam);
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

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={data[1].label}
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
          <Text style={[AppStyle.titleBig, { marginBottom: 10 }]}>Lịch thi hôm nay</Text>

          {isLoading ?
              (<Image
                source={require('../assets/gif/loading_bar.gif')}
                style={{width: 150, height: 100 ,alignSelf:'center',}} />)
              :( <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                data={DataScheduleToday}
                renderItem={({ item }) => <ItemScheduleExam data={item} />}
                keyExtractor={item => item.id}
              />)}
         
          
            {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' ,width:'100%',}}>
              {DataScheduleToday.slice(0, Math.ceil(DataScheduleToday.length )).map((item) => (
                <ItemSchedule  data={item} key={item.id}/>
              ))}
            </View>  */}
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