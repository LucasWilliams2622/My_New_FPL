import { StyleSheet, Text, SafeAreaView, View, Image, Animated, Modal, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { AppStyle } from "../../constants/AppStyle";
import AppHeader from "../../components/AppHeader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component, useState } from "react";
import FindDriver1 from "./FindDriver1";
import MapView, { Marker } from 'react-native-maps';
import FindGoWith from "./FindGoWith";
import HistoryPosted from "./HistoryPosted";
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActionButton from 'react-native-action-button';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import numeral from 'numeral';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Tab = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  tabBarLabel: ({ focused, color, size }) => {
    if (route.name === "FindDriver1") {
      return (
        <Text
          style={{
            color: focused ? "#F26F25" : "#787878",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Tìm tài xế{" "}
        </Text>
      );
    } else if (route.name === "FindGoWith") {
      return (
        <Text
          style={{
            color: focused ? "#F26F25" : "#787878",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Tìm yên sau
        </Text>
      );
    }

  },
  tabBarIndicatorStyle: {
    backgroundColor: "#F26F25",
    width: "24%",
    height: 4,
    borderRadius: 40,
    left: "13%",
  },
  tabBarStyle: {
    backgroundColor: "white",
  },
});

const GoFPT = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isNestedModalVisible, setNestedModalVisible] = useState(false);
  const [isThirdModal, setThirdModal] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedImageURI, setSelectedImageURI] = useState(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [textColor, setTextColor] = useState('black');


  const [driverChecked, setDriverChecked] = useState(false);
  const [passengerChecked, setPassengerChecked] = useState(false);

  const checkImage = require('../../assets/icons/ic_check.png');
  const uncheckImage = require('../../assets/icons/ic_uncheck.png');

  const [position, setPosition] = useState({
    latitude: 10.853864,
    longitude: 106.627351,
    latitudeDelta: 0.001,
    longitudeDelta: 0.01,
  });
  const [position2, setPosition2] = useState({
    latitude: 10.8529642,
    longitude: 106.6282855,
    latitudeDelta: 0.1,
    longitudeDelta: 0.01,
  });
  const [position3, setPosition3] = useState({
    latitude: 10.8529096,
    longitude: 106.6291175,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleDriverPress = () => {
    setDriverChecked(true);
    setPassengerChecked(false);
  };

  const handlePassengerPress = () => {
    setDriverChecked(false);
    setPassengerChecked(true);
  };


  const images = [
    require('../../assets/icons/ic_check.png'),
    require('../../assets/icons/ic_uncheck.png'),
  ];

  const handlePress = () => {
    // Thay đổi chỉ số của hình ảnh để chuyển đổi giữa hai hình ảnh
    setImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));

    // Thay đổi màu chữ
    setTextColor((prevColor) => (prevColor === 'black' ? 'blue' : 'black'));
  };

  const toggleThirdModal = () => {
    setThirdModal(!isThirdModal);
  };

  const toggleNestedModal = () => {
    setNestedModalVisible(!isNestedModalVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formatted = `${day}/${month}/${year}`;
    setFormattedDate(formatted);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    setSelectedTime(date);
    hideTimePicker();

    const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });

  };


  const dialogImageChoose = () => {
    return Alert.alert(
      "Thông báo",
      "Mời bạn chọn ảnh",
      [
        {
          text: "Tải ảnh lên",
          onPress: () => {
            getImageLibrary()
          }
        },
        {
          text: "Hủy",
        }])
  }

  const getImageLibrary = async () => {
    const result = await launchImageLibrary();
    if (result.assets.length > 0) {
      const imageURI = result.assets[0].uri;
      setSelectedImageURI(imageURI);
    }
  }

  return (
    <SafeAreaView style={AppStyle.container}>
      {/* <PhoneInput ref='phone'/> */}
      <AppHeader style={{ height: "45%", }} />
      <Tab.Navigator screenOptions={options} style={{}}>
        <Tab.Screen name="FindDriver1" component={FindDriver1} />
        <Tab.Screen name="FindGoWith" component={FindGoWith} />
      </Tab.Navigator>

      <ActionButton buttonColor="#FFC634F5" style={{ bottom: '8%', right: '-5%' }} degrees={0}
        renderIcon={() => <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/ic_find_user.png')} />}>
        <ActionButton.Item buttonColor='#FFC6AC' title="Tìm bạn cho chuyến đi" onPress={() => toggleModal(true)}>
          <Image style={{ width: 16, height: 16 }} source={require('../../assets/icons/ic_plus.png')} />
        </ActionButton.Item>

        <ActionButton.Item buttonColor='#C8E4B2' title="Tin đã đăng" onPress={() => { navigation.navigate("HistoryPosted") }}>
          <Image style={{ width: 16, height: 16, tintColor: 'black' }} source={require('../../assets/icons/ic_history.png')} />
        </ActionButton.Item>
      </ActionButton>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAwareScrollView
          style={{}}
          contentContainerStyle={{}}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View style={AppStyle.modalBackground}>
            <View style={[AppStyle.modalView, { width: 376 }]}>
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
              <View style={AppStyle.ddinputModal}>
                <Image source={require('../../assets/icons/ic_location.png')} style={[AppStyle.icon, { left: '40%' }]} />
                <View style={AppStyle.viewinputModal}>
                  <TextInput
                    style={AppStyle.inputModal}
                    placeholder="Điền điểm bắt đầu"
                  />
                </View>
              </View>
              <View style={AppStyle.ddinputModal}>
                <Image source={require('../../assets/icons/ic_phone.png')} style={[AppStyle.icon, { left: '-20%' }]} />
                <PhoneInput
                  ref={(ref) => {
                    this.phone = ref;
                  }}
                  style={[AppStyle.inputModal, { left: 5 }]}
                  initialCountry="vn"
                  value="+123456789"
                  onSelectCountry={(iso2) => {
                    console.log(`Selected country: ${iso2}`);
                  }}
                  onChangePhoneNumber={(number) => {
                    console.log(`Phone number: ${number}`);
                  }}
                />
              </View>
              <View style={{ height: 50, width: '100%', flexDirection: 'row' }}>
                <View style={{ height: 35, width: 160, borderWidth: 1, borderColor: 'gray', borderRadius: 8, marginTop: '3%', marginLeft: '4%', justifyContent: 'space-between', flexDirection: 'row' }} >
                  <View style={{ backgroundColor: '#FCE38A', height: 33, width: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}></View>
                  {selectedDate && (
                    <Text style={{ top: '4%' }}> {formattedDate}</Text>
                  )}
                  <TouchableOpacity onPress={showDatePicker} >
                    <Image
                      source={require('../../assets/icons/ic_calendar.png')}
                      style={[AppStyle.iconMedium, { top: '25%', marginLeft: '8%' }]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ height: 35, width: 160, borderWidth: 1, borderColor: 'gray', borderRadius: 8, marginTop: '3%', marginLeft: '4%', justifyContent: 'space-between', flexDirection: 'row', left: '3%' }} >
                  <View style={{ backgroundColor: '#95E1D3', height: 33, width: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, left: '-1%' }}></View>
                  {selectedTime && (
                    <Text style={{ top: '4%' }}> {selectedTime.getHours()}:{selectedTime.getMinutes()}</Text>
                  )}
                  <TouchableOpacity onPress={showTimePicker} >
                    <Image
                      source={require('../../assets/icons/ic_clock.png')}
                      style={[AppStyle.iconMedium, { top: '25%', marginLeft: '10%' }]}
                    />
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      is24Hour={true}
                      onConfirm={handleTimeConfirm}
                      onCancel={hideTimePicker}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ height: 50, width: '100%', flexDirection: 'row', }}>
                <View style={{ height: 35, width: 160, borderWidth: 1, borderColor: 'gray', borderRadius: 8, marginTop: '3%', marginLeft: '4%', justifyContent: 'space-between', flexDirection: 'row' }} >
                  <Image
                    source={require('../../assets/icons/ic_vietnam_dong.png')}
                    style={[AppStyle.icon, { top: '3.4%', left: '12%' }]}
                  />

                  <Text style={[AppStyle.titleMedium, { color: '#0C9B34', top: '4%', fontStyle: 'italic' }]}>{numeral(10000).format('0,0')} </Text>

                  <Text style={{ fontSize: 16, color: '#0C9B34', top: '3.5%', left: '-15%', fontWeight: '500' }}>đ</Text>
                </View>
                <View style={{ height: 35, width: 160, borderWidth: 1, borderColor: 'gray', borderRadius: 8, left: '6.5%', top: '22%', flexDirection: 'row' }}>
                  <View>
                    <View style={{ backgroundColor: '#EAFFD0', height: 33, width: 30, borderTopLeftRadius: 6, borderBottomLeftRadius: 8 }}></View>
                    <Image
                      source={require('../../assets/icons/ic_cross_walk.png')}
                      style={[AppStyle.icon, { top: '-85%', left: '10%' }]}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', top: '18%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPress={handleDriverPress}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            source={driverChecked ? checkImage : uncheckImage}
                            style={{ height: 20, width: 20 }}
                          />
                          <Text style={{ color: driverChecked ? '#0C9B34' : 'black' }}>Tài xế</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={handlePassengerPress}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            source={passengerChecked ? checkImage : uncheckImage}
                            style={{ height: 20, width: 20 }}
                          />
                          <Text style={{ color: passengerChecked ? '#0C9B34' : 'black' }}>Yên sau</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ height: 50, width: 320, flexDirection: 'row', marginTop: 11, marginLeft: 15, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../assets/icons/ic_destination.png')}
                    style={[AppStyle.icon, {}]}
                  />
                  <Text style={[AppStyle.titleMedium, { color: 'black' }]}>Chọn địa điểm và chụp quãng đường</Text>
                </View>
                <TouchableOpacity onPress={toggleNestedModal}>
                  <Image
                    source={require('../../assets/icons/ic_question_mark.png')}
                    style={[AppStyle.icon, {}]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '88%', backgroundColor: 'gray', borderRadius:8, height: 150,left:'5%',top:'-3%' }}>
                <MapView
                  style={[styles.map,{borderRadius:8}]}
                  initialRegion={position}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  followsUserLocation={true}
                  showsCompass={true}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  pitchEnabled={true}
                  rotateEnabled={true}>
                  <Marker
                    title='Tòa T'
                    // description='This is a description'
                    coordinate={position} />
                  <Marker
                    title='Tòa F'
                    // description='This is a description'
                    coordinate={position2} />
                  <Marker
                    title='Tòa P'
                    // description='This is a description'
                    coordinate={position3} />

                </MapView>
              </View>
              <Pressable
                onPress={toggleThirdModal}
                style={[AppStyle.button, { height: 38, width: '90%', backgroundColor: '#F26F25', marginTop: '-1%', marginLeft: '5%' }]}
              >
                <Text style={[AppStyle.titleButton, { marginTop: -6 }]}>Tiếp theo</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isNestedModalVisible}
        onRequestClose={() => setNestedModalVisible(false)}>
        <View style={AppStyle.modalBackground}>
          <View style={[AppStyle.modalView, { height: 372 }]}>
            <View style={AppStyle.viewheadModal}>
              <Pressable
                style={AppStyle.btnX}
                onPress={() => setNestedModalVisible(false)}>
                <Image
                  source={require('../../assets/icons/ic_close.png')}
                />
              </Pressable>
              <Text style={AppStyle.txtModal1}>Hướng dẫn sử dụng</Text>
            </View>
            <View style={{ left: '6%' }}>
              <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                <Text style={[AppStyle.titleMedium, { color: 'black', fontStyle: 'italic' }]}>Bước 1:</Text>
                <Text style={[AppStyle.titleSmall, { color: 'black', left: 8, top: 2, fontWeight: 400 }]}>Nhấn vào vị trí bạn muốn đến trong bản đồ</Text>
              </View>
              <Image
                source={require('../../assets/images/image23.png')}
                style={{ height: 100, width: 168, marginTop: '2%' }}
              />
              <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                <Text style={[AppStyle.titleMedium, { color: 'black', fontStyle: 'italic' }]}>Bước 2:</Text>
                <Text style={[AppStyle.titleSmall, { color: 'black', left: 8, top: 2, fontWeight: 400 }]}>Nhấn nút chỉ đường bên phải</Text>
              </View>
              <Image
                source={require('../../assets/images/image1.png')}
                style={{ height: 30, width: 80, marginTop: '2%' }}
              />
              <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                <Text style={[AppStyle.titleMedium, { color: 'black', fontStyle: 'italic' }]}>Bước 3:</Text>
                <Text style={[AppStyle.titleSmall, { color: 'black', left: 8, top: 2, width: '80%', fontWeight: 400 }]}>Chụp lại màn hình quãng đường đi của bạn ở Google Map để sử dụng cho bước tiếp theo</Text>
              </View>
            </View>
            <Pressable
              style={[AppStyle.button, { height: 38, width: '90%', backgroundColor: '#F26F25', marginTop: '5%', marginLeft: '5%' }]}
              onPress={() => setNestedModalVisible(false)}
            >
              <Text style={[AppStyle.titleButton, { marginTop: -6 }]}>Đã hiểu</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isThirdModal}
        onRequestClose={() => setThirdModal(false)}>
        <KeyboardAwareScrollView
          style={{}}
          contentContainerStyle={{}}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View style={AppStyle.modalBackground}>
            <View style={[AppStyle.modalView, { height: 540 }]}>
              <View style={AppStyle.viewheadModal}>
                <Pressable
                  style={AppStyle.btnX}
                  onPress={() => setThirdModal(false)}>
                  <Image
                    source={require('../../assets/icons/ic_close.png')}
                  />
                </Pressable>
                <Text style={AppStyle.txtModal1}>Tìm bạn cho chuyến đi</Text>
              </View>
              <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: '5%' }}>
                <Image
                  style={AppStyle.iconMedium}
                  source={require('../../assets/icons/ic_note.png')}
                />
                <Text style={[AppStyle.titleMedium, { color: 'black', fontWeight: 500, marginLeft: 10 }]}>Ghi chú</Text>
              </View>
              <TextInput
                placeholder="Cần tìm bạn đi chung"
                editable
                multiline
                numberOfLines={4}
                maxLength={35}
                style={[AppStyle.inputModal, { height: 80, width: 320, borderRadius: 6, fontSize: 16, padding: 10, marginLeft: '5%' }]}>
              </TextInput>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => { dialogImageChoose() }}
                >
                  <View style={[AppStyle.viewheadModal, { height: 38, width: 326, backgroundColor: '#FCE38A', borderTopStartRadius: 8, borderTopEndRadius: 8, alignItems: 'center' }]}>
                    <Text style={[AppStyle.titleMedium, { color: 'black' }]}>+ Tải ảnh quãng đường của bạn</Text>
                  </View>
                  <View style={{ height: 200, width: 326, borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}>
                    {selectedImageURI && (
                      <Image
                        style={{ height: 200, width: 326, borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}
                        source={{ uri: selectedImageURI }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <Pressable
                style={[AppStyle.button, { height: 38, width: '90%', backgroundColor: '#F26F25', marginTop: '33%', marginLeft: '5%' }]}
                onPress={() => setThirdModal(false)}
              >
                <Text style={[AppStyle.titleButton, { marginTop: '-3%' }]}>Đăng tin</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </SafeAreaView >

  );
};

export default GoFPT;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
});
