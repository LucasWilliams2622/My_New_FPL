import { StyleSheet, Text, SafeAreaView, View, Image, Animated, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { AppStyle } from "../../constants/AppStyle";
import AppHeader from "../../components/AppHeader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component, useState } from "react";
import FindDriver from "./FindDriver";
import FindGoWith from "./FindGoWith";
import HistoryPosted from "./HistoryPosted";
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActionButton from 'react-native-action-button';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input'

import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
  // const [selected, setSelected] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const [isSwitchOn, setSwitchOn] = useState(false);

  const toggleSwitch = () => {
    setSwitchOn(!isSwitchOn);
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

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours}:${minutes}`;
    console.log('Giờ và phút đã chọn:', formattedTime);
  };

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
        <ActionButton.Item buttonColor='#FFC6AC' title="Tìm bạn cho chuyến đi" onPress={() => setModalVisible(true)}>
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
            <View style={AppStyle.modalView}>
              <View style={AppStyle.viewheadModal}>
                <Pressable
                  style={AppStyle.btnX}
                  onPress={() => setModalVisible(false)}>
                  <Text style={AppStyle.txtModal2}>X</Text>
                </Pressable>
                <Text style={AppStyle.txtModal1}>Tìm bạn cho chuyến đi</Text>
              </View>
              <View style={AppStyle.ddinputModal}>
                <Image source={require('../../assets/icons/ic_location.png')} style={[AppStyle.icon, { left: 10 }]} />
                <View style={AppStyle.viewinputModal}>
                  <TextInput
                    style={AppStyle.inputModal}
                    placeholder="Điền điểm bắt đầu"
                  />
                </View>
              </View>
              <View style={AppStyle.ddinputModal}>
                <Image source={require('../../assets/icons/ic_phone.png')} style={[AppStyle.icon, {}]} />
                <PhoneInput
                  ref={(ref) => {
                    this.phone = ref;
                  }}
                  style={[AppStyle.inputModal, { left: 5 }]}
                  initialCountry="us"
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
                <View style={{ height: 35, width: 150, borderWidth: 1, borderColor: 'gray', borderRadius: 8, marginTop: '3%', marginLeft: '4%', justifyContent: 'space-between', flexDirection: 'row' }} >
                  <View style={{ backgroundColor: '#FCE38A', height: 33, width: 18, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}></View>
                  {selectedDate && (
                    <Text style={{ top: '4%' }}> {formattedDate}</Text>
                  )}
                  <TouchableOpacity onPress={showDatePicker} >
                    <Image
                      source={require('../../assets/icons/ic_calendar.png')}
                      style={[AppStyle.icon, { top: '8%', marginLeft: '4%' }]}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ height: 35, width: 150, borderWidth: 1, borderColor: 'gray', borderRadius: 8, marginTop: '3%', marginLeft: '4%', justifyContent: 'space-between', flexDirection: 'row', left: '3%' }} >
                  <View style={{ backgroundColor: 'green', height: 33, width: 18, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, left: '-2%' }}></View>
                  {selectedTime && (
                    <Text style={{ top: '4%' }}> {selectedTime.toLocaleTimeString()}</Text>
                  )}
                  <TouchableOpacity onPress={showTimePicker} >
                    <Image
                      source={require('../../assets/icons/ic_clock.png')}
                      style={[AppStyle.icon, { top: '10%', marginLeft: '4%' }]}
                    />
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      onConfirm={handleTimeConfirm}
                      onCancel={hideTimePicker}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ height: 50, width: '100%', flexDirection: 'row', }}>
                <View style={{ height: 37, width: 150, borderWidth: 1, borderColor: 'gray', borderRadius: 8, marginTop: '3%', marginLeft: '4%', justifyContent: 'space-between', flexDirection: 'row' }} >
                  <Image
                    source={require('../../assets/icons/ic_vietnam_dong.png')}
                    style={[AppStyle.icon, { height: 29, width: 29, top: '1%', left: '5%' }]}
                  />
                  {selectedDate && (
                    <Text style={{ top: '4%' }}> {formattedDate}</Text>
                  )}
                  <Text style={{ fontSize: 18, color: 'green', top: '2%', left: '-15%', fontWeight: '500' }}>Đ</Text>
                </View>
                <View style={{height: 37, width: 155,borderWidth: 1, borderColor: 'gray', borderRadius: 6, left:'40%', top:'2.9%' }}>
                  <TouchableOpacity onPress={toggleSwitch} style={styles.switchButton}>
                    <Image
                      source={isSwitchOn ? require('../../assets/icons/switch1.png') : require('../../assets/icons/switch2.png')}
                      style={{height: 35, width: 150,left:'1%'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </SafeAreaView>

  );
};

export default GoFPT;

const styles = StyleSheet.create({});
