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

const FindDriver = () => {
  const [dataFindDriver, setDataFindDriver] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  //http://103.57.129.166:3000/gofpt/api/get-by-location?keyword=Go&typeFind=1
  const [availaBle, setAvailaBle] = useState(true)

  const [isModalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const toggleModal = async () => {
    setModalVisible(!isModalVisible);
    
    console.log( isModalVisible,'isModalVisible' );
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

console.log(isModalVisible,'isModalVisible');
  return (
    <MotiView style={[AppStyle.main, { marginTop: 8 }]}
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: 350,
      }}>
<<<<<<< HEAD
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
            {/* //ItemSearch({}) */}
            <ItemSearch marginBottom={10}
              onPressSearch={() => { getListDriver() }}
              onChangeText={(keyword) => handleSearch(keyword)} 
              onPressRight={() =>   toggleModal()  }
              />
          </View>
        )}
        >
      </FlatList>
        <Modal
          animationType="fade"
          transparent={true}
          isVisible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
         
        </Modal>
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
=======
      {
        availaBle
          ? (
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
                    onChangeText={(keyword) => handleSearch(keyword)} />
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
>>>>>>> 9adf5708a027f0f72e4913ce53281e4c19893076
                <Text>Áp dụng sắp xếp</Text>
              </TouchableOpacity> */}
                  </View>
                </View>
              </Modal>
            </FlatList>
          )
          : (
            <View style={{ flex: 1, backgroundColor: COLOR.background, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: '600', color: COLOR.primary, fontSize: 18, }}>Chưa co tin tìm tài xế mới</Text>
            </View>
<<<<<<< HEAD
          </View>
          </Modal>

=======
          )
      }
>>>>>>> 9adf5708a027f0f72e4913ce53281e4c19893076
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