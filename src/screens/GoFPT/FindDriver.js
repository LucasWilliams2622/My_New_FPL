import { StyleSheet, FlatList, Text, Image, View, ScrollView, Alert, Modal, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useContext, useCallback, useEffect, useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import ItemSearch from '../../components/GoFPT/ItemSearch'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
import ActionButton from 'react-native-action-button';
import ItemFindDriver from '../../components/GoFPT/ItemFindDiver'
import { MotiView, MotiText } from 'moti'
import TimerMixin from 'react-timer-mixin';
import Toast from 'react-native-toast-message';
import { COLOR } from '../../constants/Theme'
import { BottomSheet } from 'react-native-btr';
import FastImage from 'react-native-fast-image'
import Voice from '@react-native-voice/voice'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const FindDriver = () => {
  const [dataFindDriver, setDataFindDriver] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);

  const [availaBle, setAvailaBle] = useState(true)

  const [ModalVisible, setModalVisible] = useState(false);

  const [originalData, setOriginalData] = useState([]); // Dữ liệu gốc
  const [sortBy, setSortBy] = useState(null);

  const [priceRangeStart, setPriceRangeStart] = useState('');
  const [priceRangeEnd, setPriceRangeEnd] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Sắp xếp dữ liệu theo giá
  const filterDataByPriceRange = (data, a, b) => {
    return data.filter(item => item.price >= a && item.price <= b);
  };
  const handleFilterByPrice = () => {
    const filteredData = filterDataByPriceRange(dataFindDriver, parseFloat(priceRangeStart), parseFloat(priceRangeEnd));
    setDataFindDriver(filteredData);
    console.log('====================================');
    console.log(filteredData);
    console.log('====================================');
    toggleModal()
  }

  const handleSortByDate = () => {
    const sortedData = dataFindDriver.filter((item) => {
      const itemDate = item.dateStart.slice(0, 10);
      return itemDate >= startDate && itemDate <= endDate;
    });

    // Sắp xếp dữ liệu theo ngày
    sortedData.sort((a, b) => {
      const dateA = new Date(a.dateStart.slice(0, 10));
      const dateB = new Date(b.dateStart.slice(0, 10));
      return dateA - dateB;
    });

    setDataFindDriver(sortedData);
    console.log('====================================');
    console.log(sortedData);
    console.log('====================================');
    toggleModal()
  };

  const handleSortByTime = () => {
    const sortedData = dataFindDriver.filter((item) => {
      const itemTime = item.timeStart?.slice(12, 16);
      const startTimeObj = startTime;
      const endTimeObj = endTime;

      return itemTime >= startTimeObj && itemTime <= endTimeObj;
    });

    // Sắp xếp dữ liệu theo giờ
    sortedData.sort((a, b) => {
      const timeA = a.timeStart?.slice(12, 16);
      const timeB = b.timeStart?.slice(12, 16);
      return timeA.localeCompare(timeB);

    });

    setDataFindDriver(sortedData);
    toggleModal()
    console.log('====================================');
    console.log(sortedData);
    console.log('====================================');
  };

  useEffect(() => {
    setDataFindDriver(dataFindDriver);
    setOriginalData(dataFindDriver); // Lưu trữ dữ liệu gốc
  }, []);

  const toggleModal = async () => {
    setModalVisible(!ModalVisible);
  };

  const resetSort = () => {
    setSortBy(null);
    setDataFindDriver(originalData); // Khôi phục danh sách gốc
    toggleModal();
  };

  const handleApplySort = () => {
    if (sortBy === 'date') {
      // Sắp xếp theo ngày  
      handleSortByDate();
    } else if (sortBy === 'time') {
      // Sắp xếp theo giờ  
      handleSortByTime();
    } else if (sortBy === 'price') {
      // Sắp xếp theo giá  
      filterDataByPriceRange();
    }
    console.log('====================================');
    console.log(handleApplySort);
    console.log('====================================');
    toggleModal();
  };

  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    getListDriver()
    return () => {

    }
  }, [appState])

  // ======================| GET LIST AND SEARCH |=======================
  const getListDriver = async () => {
    try {
      const response = await AxiosInstance().get("gofpt/api/get-by-typeFind?typeFind=1");
      // console.log("===================================response", response);

      if (response.result) {
        if (Array.isArray(response.post) && response.post.length === 0) {
          console.log("post find driver là một mảng rỗng");
          setAvailaBle(false)

        } else {
          console.log("post không phải là một mảng rỗng");
          setIsLoading(false)
          setDataFindDriver(response.post);
          setAvailaBle(true)

        }
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = async (keyword) => {
    TimerMixin.setTimeout(() => {
      onSearch(keyword)
    }, 2000);
  }

  const onSearch = async (keyword) => {
    try {
      const response = await AxiosInstance().get("gofpt/api/get-by-location?keyword=" + keyword + "&typeFind=1");
      console.log(response);
      if (response.result) {

        if (Array.isArray(response.post) && response.post.length === 0) {
          Toast.show({
            position: 'top',
            type: 'success',
            text1: 'KhÔng tìm thấy kết quả phù hợp',
          });
          console.log("get-by-location " + keyword + " là một mảng rỗng");
          setAvailaBle(false)

        } else {
          console.log("get-by-location " + keyword + " không phải là một mảng rỗng");
          setDataFindDriver(response.post)
          setIsLoading(false);
          setAvailaBle(true)
        }
      } else {
        setAvailaBle(false)
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  }
  // ========================| VOICE |=============================
  const [started, setStarted] = useState('')
  const [ended, setEnded] = useState('')
  const [results, setResults] = useState([])
  const [isListening, setIsListening] = useState(false)
  const [modalVoice, setModalVoice] = useState(false)
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const onSpeechStart = (e) => {
    console.log(e)
    setStarted('❤️')
  }

  const onSpeechEnd = (e) => {
    console.log(e)
    setEnded('❤️')
  }

  const onSpeechResults = (e) => {
    console.log(e)
    setResults(e.value)
    handleSearch(e.value)
  }

  const startRecognizing = async () => {
    try {
      console.log("start");
      Voice.start('vi-VN');
      console.log("start");
      setStarted('')
      setEnded('')
      setResults([])
      setIsListening(true)
      console.log("start");
    } catch (error) {
      console.log("error2", error)
    }
  }

  const stopRecognizing = async () => {
    try {
      console.log("STOP");
      Voice.stop();
      setStarted('')
      setEnded('')
      setResults([])
      setIsListening(false)
    } catch (error) {
      console.log("error1", error)
    }
  }
  return (
    <MotiView style={[AppStyle.main, { marginTop: 8 }]}
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: 350,
      }}>
      {
        availaBle
          ? (
            <>
              <FlatList
                style={{ marginVertical: 0, marginBottom: 70 }}
                data={dataFindDriver}
                showsHorizontalScrollIndicator={false}
                shouldRasterizeIOS
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ItemFindDriver data={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => (
                  <View>
                    <ItemSearch marginBottom={10}
                      onPressRight={() => toggleModal()}
                      onPressSearch={() => { getListDriver() }}
                      onChangeText={(keyword) => handleSearch(keyword)}
                      onPressMic={() => { setModalVoice(true) }}
                    />
                  </View>
                )}
              >
              </FlatList>
              {/* MODAL SORT */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={ModalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <KeyboardAwareScrollView
                  style={{}}
                  contentContainerStyle={{}}
                  enableOnAndroid={true}
                  enableAutomaticScroll={true}
                >
                  <View style={AppStyle.modalBackground}>
                    <View style={[AppStyle.modalView, { height: '60%', width: '100%', marginTop: '60%' }]}>
                      <View style={[AppStyle.viewheadModal, {}]}>
                        <TouchableOpacity
                          style={AppStyle.btnX}
                          onPress={() => setModalVisible(false)}>
                          <Image
                            source={require('../../assets/icons/ic_close.png')}
                          />
                        </TouchableOpacity>
                        <Text style={AppStyle.txtModal1}>SORT</Text>
                      </View>
                      <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={{ height: '20%', width: '100%', marginTop: 10 }}>
                          <Text style={[AppStyle.titleMedium, { color: 'black', marginTop: '3%', marginLeft: '3%' }]}>Nhập khoảng giá:</Text>
                          <View style={{ flexDirection: 'row', marginTop: '2%', height: '70%', width: '100%', justifyContent: 'space-around' }}>
                            <TextInput
                              style={[AppStyle.inputModal, { width: '40%', height: '70%', borderWidth: 1, borderColor: 'black', }]}
                              placeholder="Giá bắt đầu "
                              keyboardType="numeric"
                              value={priceRangeStart}
                              onChangeText={(text) => setPriceRangeStart(text)}
                            />
                            <TextInput
                              style={[AppStyle.inputModal, { width: '40%', height: '70%', borderWidth: 1, borderColor: 'black', }]}
                              placeholder="Giá kết thúc "
                              keyboardType="numeric"
                              value={priceRangeEnd}
                              onChangeText={(text) => setPriceRangeEnd(text)}
                            />
                          </View>
                          {/* <TouchableOpacity onPress={() => handleFilterByPrice()}>
                          <Text>Lọc theo giá</Text>
                        </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '100%', height: '20%', marginTop: 10 }}>
                          <Text style={[AppStyle.titleMedium, { color: 'black', marginTop: '3%', marginLeft: '3%' }]}>Nhập khoảng ngày:</Text>
                          <View style={{ flexDirection: 'row', marginTop: '2%', height: '70%', width: '100%', justifyContent: 'space-around' }}>
                            <TextInput
                              style={[AppStyle.inputModal, { width: '40%', height: '70%', borderWidth: 1, borderColor: 'black', }]}
                              placeholder="YYYY-MM-DD"
                              value={startDate}
                              onChangeText={(text) => setStartDate(text)}
                            />
                            <TextInput
                              style={[AppStyle.inputModal, { width: '40%', height: '70%', borderWidth: 1, borderColor: 'black', }]}
                              placeholder="YYYY-MM-DD"
                              value={endDate}
                              onChangeText={(text) => setEndDate(text)}
                            />
                          </View>
                          {/* <TouchableOpacity onPress={() => handleSortByDate()}>
                          <Text>Sắp xếp theo ngày</Text>
                        </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '100%', height: '20%', marginTop: 10 }}>
                          <Text style={[AppStyle.titleMedium, { color: 'black', marginTop: '3%', marginLeft: '3%' }]}>Nhập khoảng giờ (24 giờ):</Text>
                          <View style={{ flexDirection: 'row', marginTop: '2%', height: '70%', width: '100%', justifyContent: 'space-around' }}>
                            <TextInput
                              style={[AppStyle.inputModal, { width: '40%', height: '70%', borderWidth: 1, borderColor: 'black', }]}
                              placeholder="hh:mm"
                              value={startTime}
                              onChangeText={(text) => setStartTime(text)}
                            />
                            <TextInput
                              style={[AppStyle.inputModal, { width: '40%', height: '70%', borderWidth: 1, borderColor: 'black', }]}
                              placeholder="hh:mm"
                              value={endTime}
                              onChangeText={(text) => setEndTime(text)}
                            />
                          </View>
                          {/* <TouchableOpacity onPress={() => handleSortByTime()}>
                          <Text>Sắp xếp theo giờ</Text>
                        </TouchableOpacity> */}
                        </View>
                        <View style={{ flexDirection: 'row', height: '30%', width: '100%', justifyContent: 'space-around', marginTop: 20 }}>
                          <TouchableOpacity
                            style={[AppStyle.buttonBlue, { height: '35%', width: '45%' }]}
                            onPress={handleApplySort}>
                            <Text style={[AppStyle.txtModal1, { color: 'black' }]}>Apply</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[AppStyle.buttonBlue, { height: '35%', width: '45%' }]}
                            onPress={resetSort}>
                            <Text style={[AppStyle.txtModal1, { color: 'black' }]}>Reset</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </Modal>
              {/* MODAL VOICE */}
              <BottomSheet
                visible={modalVoice}
                transparent={true}
                animationType="fade"
                onBackButtonPress={() => { setModalVoice(false) }}
                onBackdropPress={() => { setModalVoice(false) }}
              >
                <View style={[AppStyle.modalContentBottom, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={[AppStyle.text16, { paddingVertical: 16 }]}>Nhấn và giữ để nói</Text>
                  <TouchableOpacity style={[AppStyle.boxCenter, { backgroundColor: COLOR.primary, width: 150, height: 150, borderRadius: 999 }]}
                    onPressIn={() => {
                      startRecognizing()
                    }}
                    onPressOut={() => {
                      stopRecognizing()
                    }}>
                    <View style={[AppStyle.boxCenter, { backgroundColor: COLOR.background, width: 147, height: 147, borderRadius: 999 }]}>
                      <Image style={{ width: 50, height: 50, tintColor: COLOR.primary }} source={require('../../assets/icons/ic_mic.png')} />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ color: 'black' }}>Started {started}</Text>

                  <Text style={{ color: 'black' }}>Ended {ended}</Text>
                  <Text style={{ color: 'black' }}>results{results}</Text>
                  <ScrollView horizontal style={{ alignSelf: 'center', }}>
                    {results.map((item, index) => {
                      return (<Text key={index} style={{ textAlign: 'center', color: 'black' }}>đấa{item}</Text>)
                    })}
                  </ScrollView>
                </View>
              </BottomSheet>
            </>

          )
          :
          (
            <View style={{ flex: 1, backgroundColor: COLOR.background, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: '600', color: COLOR.primary, fontSize: 18, }}>Chưa có tin tìm tài xế mới</Text>
            </View>
          )
      }
    </MotiView>
  )
}

export default FindDriver

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
})