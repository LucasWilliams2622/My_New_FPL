import { StyleSheet, FlatList, Text, Image, View, ScrollView, Alert, Modal, TouchableOpacity, TextInput } from 'react-native'
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

const FindDriver = () => {
  const [dataFindDriver, setDataFindDriver] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  //http://103.57.129.166:3000/gofpt/api/get-by-location?keyword=Go&typeFind=1
  const [availaBle, setAvailaBle] = useState(true)

  const [ModalVisible, setModalVisible] = useState(false);

  const [originalData, setOriginalData] = useState([]); // Dữ liệu gốc
  const [sortBy, setSortBy] = useState(null);


  useEffect(() => {
    // const sampleData = [
    //   {
    //     id: '1',
    //     title: 'Driver 1',
    //     price: 50,
    //     date: '2023-09-27',
    //     time: '12:00 AM',
    //   },
    //   {
    //     id: '2',
    //     title: 'Driver 2',
    //     price: 40,
    //     date: '2023-09-28',
    //     time: '10:00 AM',
    //   },
    //   {
    //     id: '3',
    //     title: 'Driver 3',
    //     price: 60,
    //     date: '2023-09-29',
    //     time: '11:00 AM',
    //   },
    //   {
    //     id: '4',
    //     title: 'Driver 14',
    //     price: 100000000,
    //     date: '2023-09-27',
    //     time: '09:00 AM',
    //   },
    //   {
    //     id: '5',
    //     title: 'Driver 12',
    //     price: 400000000,
    //     date: '2023-09-12',
    //     time: '05:00 AM',
    //   },
    //   {
    //     id: '6',
    //     title: 'Driver 13',
    //     price: 60000000,
    //     date: '2023-09-26',
    //     time: '01:00 AM',
    //   },
    //   // Thêm các mục khác tại đây
    // ];
    setDataFindDriver(dataFindDriver);
    setOriginalData(dataFindDriver); // Lưu trữ dữ liệu gốc
  }, []);



  const toggleModal = async () => {
    setModalVisible(!ModalVisible);
  };

  const handleSortBy = (criteria) => {
    const sortedData = dataFindDriver.sort((a, b) => {
      setSortBy(criteria);
      toggleModal();

      // Sắp xếp danh sách dựa trên tiêu chí
      if (criteria === 'price') {
        // Sắp xếp theo giá (ví dụ)
        setDataFindDriver([...dataFindDriver].sort((b, a) => a.price - b.price));
      } else if (criteria === 'date') {
        // Sắp xếp theo ngày (ví dụ)
        setDataFindDriver([...dataFindDriver].sort((b, a) => new Date(a.dateStart.slice(0,10)) - new Date(b.dateStart.slice(0,10))));
      } else if (criteria === 'time') {
        // Sắp xếp theo giờ (ví dụ)
        setDataFindDriver([...dataFindDriver].sort((b, a) => Date(a.timeStart?.slice(12,16)) - Date(b.timeStart?.slice(12,16))));
      }

    });

  };

  const resetSort = () => {
    setSortBy(null);
    setDataFindDriver(originalData); // Khôi phục danh sách gốc
    toggleModal();
  };
  ;


  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    getListDriver()
    return () => {

    }
  }, [appState])

  const getListDriver = async () => {
    console.log("aaaaa");
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

  console.log(ModalVisible, 'ModalVisible');
  return (
    <MotiView style={[AppStyle.main, { marginTop: 8 }]}
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: 350,
      }}>
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
              onPressRight={() => toggleModal()}
            />
          </View>
        )}
      >
      </FlatList>
      <Modal
        animationType="fade"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={AppStyle.modalBackground}>
          <View style={[AppStyle.modalView, { height: 540 }]}>
            <View style={AppStyle.viewheadModal}>
              <TouchableOpacity
                style={AppStyle.btnX}
                onPress={() => setModalVisible(false)}>
                <Image
                  source={require('../../assets/icons/ic_close.png')}
                />
              </TouchableOpacity>
              <Text style={AppStyle.txtModal1}>Tìm bạn cho chuyến đi</Text>
            </View>
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
            <TouchableOpacity onPress={toggleModal}>
              <Text>Áp dụng sắp xếp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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