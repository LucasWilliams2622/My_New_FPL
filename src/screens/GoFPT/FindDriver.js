import { StyleSheet, FlatList, Text, Image, View, ScrollView, Alert, Modal, TouchableOpacity, Pressable } from 'react-native'
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

const FindDriver = () => {
  const [dataFindDriver, setDataFindDriver] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [availaBle, setAvailaBle] = useState(true)
  const [modalVoice, setModalVoice] = useState(true)

  const [isModalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const toggleModal = async () => {
    setModalVisible(!isModalVisible);
  };

  const handleSortBy = (criteria) => {
    setSortBy(criteria);
    toggleModal();

  };

  const resetSort = () => {
    setSortBy(null);
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
      console.log("==============>", keyword);
      // const response = await AxiosInstance().get("gofpt/api/get-by-location", { keyword: keyword, typeFind: 1});
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
                      onPressRight={() => { { toggleModal(true) } }}
                      onPressSearch={() => { getListDriver() }}
                      onChangeText={(keyword) => handleSearch(keyword)}
                      onPressMic={() => { setModalVoice(true) }}
                    />
                  </View>
                )}
              >
                <Modal
                  animationType="fade"
                  transparent={true}
                  isVisible={isModalVisible}
                  onRequestClose={() => setModalVisible(false)}>
                  <View style={AppStyle.modalBackground}>
                    <View style={[AppStyle.modalView, { height: 540 }]}>
                      <View style={AppStyle.viewheadModal}>
                        <Pressable
                          style={AppStyle.btnX}
                          onPress={() => setModalVisible(false)}>
                          <Image
                            source={require('../../assets/icons/ic_close.png')}
                          />
                        </Pressable>
                        <Text style={AppStyle.txtModal1}>Tìm bạn cho chuyến đi</Text>
                      </View>
                      <Text>Chọn tiêu chí sắp xếp:</Text>
                      <TouchableOpacity onPress={() => handleSortBy('price')}>
                        <Text>Sắp xếp theo giá</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleSortBy('date')}>
                        <Text>Sắp xếp theo ngày</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleSortBy('time')}>
                        <Text>Sắp xếp theo giờ</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={resetSort}>
                        <Text>Reset</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={toggleModal}>
                <Text>Áp dụng sắp xếp</Text>
              </TouchableOpacity> */}
                    </View>
                  </View>
                </Modal>



              </FlatList>
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
                  <TouchableOpacity style={[AppStyle.boxCenter, { backgroundColor: COLOR.primary, width: '40%', height: '40%', borderRadius: 999 }]}
                    onPressIn={() => {
                      startRecognizing()
                    }}
                    onPressOut={() => {
                      stopRecognizing()
                    }}>
                    <View style={[AppStyle.boxCenter, { backgroundColor: COLOR.background, width: '98%', height: '98%', borderRadius: 999 }]}>
                      <Image style={{ width: 40, height: 50, tintColor: COLOR.primary }} source={require('../../assets/icons/ic_mic.png')} />
                    </View>
                  </TouchableOpacity>
                  <Text>Started {started}</Text>
                
                <Text>Ended {ended}</Text>
                <Text>{results}</Text>
                  <ScrollView horizontal style={{ alignSelf: 'center',  }}>
                    {results.map((item, index) => {
                      return (<Text key={index} style={{ textAlign: 'center' }}>{item}</Text>)
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