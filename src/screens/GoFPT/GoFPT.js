import { StyleSheet, Text, SafeAreaView, View, Image, Animated, Modal, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { AppStyle } from "../../constants/AppStyle";
import AppHeader from "../../components/AppHeader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component, useState } from "react";
import MapView, { Marker } from 'react-native-maps';

import FindGoWith from "./FindGoWith";
import FindDriver from "./FindDriver";

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

import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { useToast } from 'react-native-toast-message';

// Toast.setConfig({
//   position: 'bottom', // Position of the toast message
//   duration: 4000, // Duration in milliseconds
//   animation: 'slide', // Animation type
// });

const validationSchema = Yup.object().shape({
  startLocation: Yup.string().required('Vui lòng điền điểm bắt đầu'),
  phoneNumber: Yup.string()
    .matches(/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/
      , 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  selectedImageURI: Yup
    .string()
    .test('is-image-selected', 'Vui lòng để ảnh quãng đường của bạn', (value) => {
      // Custom validation function to check if selectedImageURI is not empty
      return !!value;
    }),
});



const Tab = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  tabBarLabel: ({ focused, color, size }) => {
    if (route.name === "FindDriver") {
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

  const [isToastVisible, setToastVisible] = useState(false);


  const [driverChecked, setDriverChecked] = useState(true);
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

  const currentDate = new Date();

  const DateNow = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const currentTime = new Date();

  const TimeNow = `${currentTime.getHours()}:${currentTime.getMinutes()}`;


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
        <Tab.Screen name="FindDriver" component={FindDriver} />
        <Tab.Screen name="FindGoWith" component={FindGoWith} />
      </Tab.Navigator>

      <ActionButton buttonColor="#FFC634F5" style={{ bottom: '8%', right: '-5%' }} degrees={0}
        renderIcon={() => <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/ic_find_user.png')} />}>
        <ActionButton.Item buttonColor='#FFC6AC' title="Tìm bạn cho chuyến đi" onPress={() => toggleModal(true)}>
          <Image style={{ width: 16, height: 16 }} source={require('../../assets/icons/ic_plus.png')} />
        </ActionButton.Item>

        <ActionButton.Item buttonColor='#C8E4B2' title="Tin đã đăng" onPress={() => { navigation.navigate("HistoryPosted") }}>
          <Image style={{ width: 24, height: 24, tintColor: 'black' }} source={require('../../assets/icons/ic_history.png')} />
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
          <Formik
            initialValues={{
              startLocation: '',
              phoneNumber: '',
              // Thêm các trường khác và giá trị khởi tạo tại đây
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Xử lý logic gửi biểu mẫu ở đây
              console.log(values);

              if (validationSchema.isValidSync(values)) {
                // Thực hiện các hành động sau khi gửi biểu mẫu thành công
              } else {
                // Hiển thị thông báo lỗi
                setToastVisible(true); // Đặt isToastVisible thành true để hiển thị toast
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (

              <View style={AppStyle.modalBackground}>
                <View style={[AppStyle.modalView, { width: '90%', borderWidth: 2 }]}>
                  <View style={AppStyle.viewheadModal}>
                    <TouchableOpacity
                      style={AppStyle.btnX}
                      onPress={() => setModalVisible(false)}>
                      <Image style={{ width: 18, height: 18, }}
                        source={require('../../assets/icons/ic_close.png')}
                      />
                    </TouchableOpacity>
                    <Text style={AppStyle.txtModal1}>Tìm bạn cho chuyến đi</Text>
                  </View>

                  {/* CONTENT */}
                  <View style={{ paddingHorizontal: 10 }}>
                    {/* LOCATION */}
                    <View style={AppStyle.ddinputModal}>
                      <View style={[AppStyle.boxCenter, { width: '10%' }]}>
                        <Image source={require('../../assets/icons/ic_location.png')} style={[AppStyle.icon, {}]} />
                      </View>

                      <TextInput
                        style={AppStyle.inputModal}
                        placeholder="Điền điểm bắt đầu"
                        onChangeText={handleChange('startLocation')}
                        onBlur={handleBlur('startLocation')}
                        value={values.startLocation}
                      />
                    </View>
                    {errors.startLocation && <Text>{errors.startLocation}</Text>}

                    {/* PHONE NUM */}
                    <View style={AppStyle.ddinputModal}>
                      <View style={[AppStyle.boxCenter, { width: '10%' }]}>
                        <Image source={require('../../assets/icons/ic_phone.png')} style={[AppStyle.icon, {}]} />
                      </View>

                      <PhoneInput
                        ref={(ref) => {
                          this.phone = ref;
                        }}
                        style={[AppStyle.inputModal, {}]}
                        initialCountry="vn"
                        value="+123456789"
                        onSelectCountry={(iso2) => {
                          console.log(`Selected country: ${iso2}`);
                        }}
                        onChangePhoneNumber={(number) => {
                          console.log(`Phone number: ${number}`);
                        }}
                        onBlur={() => {
                          handleBlur('phoneNumber');
                        }}
                      />
                    </View>
                    {errors.phoneNumber && <Text>{errors.phoneNumber}</Text>}

                    {/* DATE TIME */}
                    <View style={[AppStyle.rowBtw, { height: 40, width: '100%', marginTop: 10 }]}>
                      <View style={{ height: 40, width: '48%', borderWidth: .5, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row' }} >
                        <View style={{ backgroundColor: '#FCE38A', height: 40, width: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
                        {/* {selectedDate && (
                          <Text style={{}}> {formattedDate}</Text>
                        )} */}
                        {
                          selectedDate == null ?
                            <Text style={[AppStyle.text14, { alignSelf: 'center', textAlign: 'center' }]}>{DateNow}</Text>
                            :
                            <Text style={[AppStyle.text14, { alignSelf: 'center', textAlign: 'center' }]}>{formattedDate}</Text>
                        }
                        <TouchableOpacity onPress={showDatePicker} style={[AppStyle.boxCenter, { marginRight: 10 }]} >
                          <Image
                            source={require('../../assets/icons/ic_calendar.png')}
                            style={[AppStyle.iconMedium, {}]}
                          />
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ height: 40, width: '48%', borderWidth: .8, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row' }} >
                        <View style={{ backgroundColor: '#95E1D3', height: 40, width: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
                        {/* {selectedTime && (
                      <Text style={{}}> {selectedTime.getHours()}:{selectedTime.getMinutes()}</Text>
                    )} */}
                        {
                          selectedTime == null ?
                            <Text style={[AppStyle.text14, { alignSelf: 'center', textAlign: 'center' }]}>{TimeNow}</Text>
                            :
                            <Text style={[AppStyle.text14, { alignSelf: 'center', textAlign: 'center' }]}>{selectedTime.getHours()}:{selectedTime.getMinutes()}</Text>
                        }
                        <TouchableOpacity onPress={showTimePicker} style={[AppStyle.boxCenter, { marginRight: 10 }]} >
                          <Image
                            source={require('../../assets/icons/ic_clock.png')}
                            style={[AppStyle.iconMedium, {}]}
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
                    <View style={[AppStyle.rowBtw, { height: 40, width: '100%', marginTop: 10 }]}>

                      <View style={{ height: 40, width: '48%', borderWidth: .5, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row', alignItems: "center", paddingHorizontal: 6 }} >
                        <View style={[AppStyle.boxCenter, {}]}>
                          <Image
                            source={require('../../assets/icons/ic_vietnam_dong.png')}
                            style={[AppStyle.icon, {}]}
                          />
                        </View>
                        {/* <Text style={[AppStyle.titleMedium, { color: '#0C9B34', fontStyle: 'italic' }]}>{numeral(10000).format('0,0')} </Text> */}
                        <TextInput
                          keyboardType="number-pad"
                          numberOfLines={1}
                          returnKeyType="go"
                          style={[AppStyle.titleMedium, { color: '#0C9B34', fontStyle: 'italic' }]}
                        />
                        <Text style={{ fontSize: 16, color: '#0C9B34', fontWeight: '500' }}>đ</Text>
                      </View>

                      {/* ROLE */}
                      <View style={{ height: 40, width: '48%', borderWidth: .5, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'flex-start', flexDirection: 'row', alignItems: "center", }} >
                        <View style={{ width: "20%" }}>
                          <View style={[AppStyle.boxCenter, { backgroundColor: '#EAFFD0', height: 40, borderTopLeftRadius: 6, borderBottomLeftRadius: 8 }]}>
                            <Image
                              source={require('../../assets/icons/ic_cross_walk.png')}
                              style={[AppStyle.icon, { width: 20, height: 20 }]}
                            />
                          </View>

                        </View>
                        <View style={{ flexDirection: 'row', width: "78%", }}>
                          <View style={[AppStyle.rowBtw, { width: '100%' }]}>
                            <TouchableOpacity onPress={handleDriverPress}>
                              <View style={AppStyle.rowCenter}>
                                <Image
                                  source={driverChecked ? checkImage : uncheckImage}
                                  style={{ height: 16, width: 16 }}
                                />
                                <Text style={[AppStyle.text12, { color: driverChecked ? '#0C9B34' : '#626262' }]}>Tài xế</Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handlePassengerPress}>
                              <View style={AppStyle.rowCenter}>
                                <Image
                                  source={passengerChecked ? checkImage : uncheckImage}
                                  style={{ height: 16, width: 16 }}
                                />
                                <Text style={[AppStyle.text12, { color: passengerChecked ? '#0C9B34' : '#626262' }]}>Yên sau</Text>
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
                    <View style={{ width: '88%', backgroundColor: '#DBDBDB', borderRadius: 8, height: 150, left: '5%', top: '-3%' }}>
                      <MapView
                        style={[styles.map, { borderRadius: 8 }]}
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
                      onPress={handleSubmit}
                      // onPress={() => {
                      //   if (handleSubmit()) {
                      //     toggleThirdModal();
                      //   } else {
                      //     Toast.show({
                      //       type: 'error',
                      //       text1: 'Lỗi',
                      //       text2: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
                      //       visibilityTime: 3000,
                      //       autoHide: true,
                      //     });
                      //   }
                      // }}
                      style={[AppStyle.button, { height: 38, width: '90%', backgroundColor: '#F26F25', marginTop: '-1%', marginLeft: '5%' }]}
                    >
                      <Text style={[AppStyle.titleButton, { marginTop: -6 }]}>Tiếp theo</Text>
                    </Pressable>
                  </View>

                </View>
              </View>
            )}
          </Formik>
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
                <Image style={{ width: 24, height: 24, }}
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
                source={require('../../assets/images/default_map.png')}
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
          <Formik
            initialValues={{
              // ... Other initial values
              selectedImageURI: '', // Initial value for the image URI
            }}
            validationSchema={validationSchema} // Use the validation schema here
            onSubmit={(values) => {
              // Handle form submission
              if (validationSchema.isValidSync(values)) {
                // The form is valid, proceed with submission
                console.log(values);
                // Additional logic for successful submission
              } else {
                // The form is invalid, you can display an error message
                setToastVisible(true);
              }
            }}
          >
            {({ handleSubmit, values, errors }) => (
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
                      {errors.selectedImageURI && (
                        <Text style={{ color: 'red' }}>{errors.selectedImageURI}</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <Pressable
                    style={[AppStyle.button, { height: 38, width: '90%', backgroundColor: '#F26F25', marginTop: '8%', marginLeft: '5%' }]}
                    onPress={handleSubmit}
                  >
                    <Text style={[AppStyle.titleButton, { marginTop: '-3%' }]}>Đăng tin</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
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
