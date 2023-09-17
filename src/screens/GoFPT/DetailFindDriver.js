import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AppStyle } from "../../constants/AppStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../../constants/Theme";
import ItemButton from "../../components/ItemButton";


const DetailFindDriver = (props) => {
  // const { data } = props;
  // const { typeFind, idUser, nameUser, phoneUser, dateStart, endPoint, price, startPoint, status, studentCode, timeStart, } = data;

  // const [hidden, setHidden] = useState(true);
  // const toggleHidden = () => {
  //   setHidden(!hidden);
  // };

  // const getDisplayedText = () => {
  //   if (hidden) {
  //     return phoneUser.substring(0, phoneUser.length - 5) + '*****';
  //   } else {
  //     return phoneUser;
  //   }
  // };
  return (
    <SafeAreaView>
      <View style={[AppStyle.column]}>
        <View style={[AppStyle.column, { margin: 5, padding: 5 }]}>
          <Text style={AppStyle.titleBig}> Tìm tài xế </Text>
        </View>
      </View>
      <SafeAreaView
        style={[
          AppStyle.header,
          { padding: 30 },
          { height: 530, width: 360, left: 16, borderRadius: 10, backgroundColor: "white" },
        ]}
      >
        <View
          style={[AppStyle.header1, AppStyle.row, { alignItems: "center", height: 55, right: 30 }]}
        >
          <Image
            style={[styles.iconLocation, { width: 24, height: 24 }]}
            source={require("../../assets/icons/ic_location.png")}
          />
          <Text
            style={[
              AppStyle.text16,
              { fontWeight: "600", marginLeft: 4, left: 19, color: "white" },
            ]}
          >
            Quận Bình Thạnh
          </Text>

          <View style={[AppStyle.row, { alignItems: "center" }]}>
            <Image
              style={[styles.iconLocation1, { height: 24, width: 24, left: 58 }]}
              source={require("../../assets/icons/ic_destination.png")}
            />
            <Text
              style={[
                AppStyle.text16,
                { fontWeight: "600", marginLeft: 4, left: 62, color: "white" },
              ]}
            >
              Tòa T
            </Text>
          </View>
        </View>
        <View style={[AppStyle.row, { alignItems: "center", marginTop: -20 }]}>
          <Image
            style={[styles.iconLocation2, AppStyle.iconSmall]}
            source={require("../../assets/icons/ic_user_focus.png")}
          />
          <Text
            style={[AppStyle.text12, { fontWeight: "600", top: -2, right: 8, fontFamily: "DM Sans" }]}
          >
            {" "}
            Nguyễn Văn A
          </Text>
          <Image
            style={[styles.iconLocation3, AppStyle.iconSmall]}
            source={require("../../assets/icons/ic_id_verify.png")}
          />
          <Text
            style={[AppStyle.text12, { fontWeight: "600", top: -2, left: 82, fontFamily: "DM Sans" }]}
          >
            {" "}
            PS12345
          </Text>
        </View>
        <View>
          <View style={[AppStyle.rowCenter, { width: "50%" }]}>
            <Image
              style={[styles.iconLocation4, AppStyle.iconSmall]}
              source={require("../../assets/icons/ic_calendar.png")}
            />
            <Text
              style={[AppStyle.text12, { fontWeight: "600", top: 6, right: 8, fontFamily: "DM Sans" }]}
            >
              {" "}
              Ngày:<Text style={{ color: COLOR.textPhone }}>12/02/2023</Text>
            </Text>
          </View>

        </View>
        <View style={[AppStyle.rowCenter, { left: 180, top: -14 }, { width: '50%', justifyContent: 'space-between' }]}>
          <View style={AppStyle.rowCenter}>
            <Image style={AppStyle.iconSmall} source={require('../../assets/icons/ic_phone.png')} />
            <Text style={[AppStyle.text12, { fontWeight: '500', marginLeft: 4, letterSpacing: .8, color: COLOR.textPhone, }]}
            >01925*****</Text>
            <Image style={[AppStyle.iconSmall, { right: -12 }]} source={require('../../assets/icons/ic_invisible.png')} />
            <Image style={[AppStyle.iconSmall, { right: -20 }]} source={require('../../assets/icons/ic_copy.png')} />
          </View>
        </View>
        <View>
          <View style={[AppStyle.rowCenter, { width: "50%" }]}>
            <Image
              style={[styles.iconLocation4, { top: -15 }, AppStyle.iconSmall]}
              source={require("../../assets/icons/ic_time.png")}
            />
            <Text
              style={[
                AppStyle.text12,
                { fontWeight: "600", top: 6, right: 5 }, { top: -9 }, { fontFamily: "DM Sans" }
              ]}
            >
              Thời gian:<Text style={{ color: COLOR.textPhone }}>14h00</Text>
            </Text>
            <View style={[AppStyle.rowCenter, { width: "50%" }]}>
              <Image
                style={[
                  styles.iconLocation3,
                  { tintColor: COLOR.textMoney, top: 7, left: 72 }, { top: -10 }, AppStyle.iconSmall
                ]}
                source={require("../../assets/icons/ic_vietnam_dong.png")}
              />
              <Text
                style={[
                  AppStyle.text12,
                  {
                    fontWeight: "600",
                    top: -10,
                    left: 78,
                    fontStyle: "italic",
                    color: COLOR.textMoney,
                  },
                ]}
              >
                10.000 ₫
              </Text>
            </View>
          </View>
          <View>
            <View style={[AppStyle.rowCenter, { width: "50%", top: -14 }]}>
              <Image
                style={[styles.iconLocation4, AppStyle.iconSmall]}
                source={require("../../assets/icons/ic_road_map.png")}
              />
              <Text
                style={[
                  AppStyle.text12,
                  { fontWeight: "600", top: 6, right: 4 }, { fontFamily: "DM Sans" }
                ]}
              >
                Quãng đường
              </Text>
            </View>
            <View style={[AppStyle.header3]}>
              <Image
                style={[
                  AppStyle.header3,
                  , { top: -10, right: 14 }
                ]}
                source={require("../../assets/images/image23.png")}
              ></Image>
            </View>
            <View>
              <View style={[AppStyle.rowCenter, { width: "50%" }]}>
                <Image
                  style={[styles.iconLocation4, { top: -6 }, AppStyle.iconSmall]}
                  source={require("../../assets/icons/ic_note.png")}
                />
                <Text
                  style={[
                    AppStyle.text12,
                    { fontWeight: "600", top: -1, right: 10 }, { fontFamily: "DM Sans" }
                  ]}
                >
                  Ghi chú
                </Text>
              </View>
              <View style={[AppStyle.item1, { height: 99, width: 320, left: -10 }, { borderWidth: 0.35, borderColor: COLOR.border, right: 5 }]}>
                <Text style={[AppStyle.text12, { fontFamily: "DM Sans" }]}>
                  mình cần tìm 1 bạn đi đi ghép đường 12 phường 3 khu phố 4 quận
                  Bình Thạnh tới toà T{" "}
                </Text>

              </View>

            </View>
            <View>
              <View style={[AppStyle.rowCenter, { width: '50%', top: 36, right: 10 }]}>
                <ItemButton title={"Nhắn tin"} paddingVertical={10}
                />
              </View>
              <View style={[AppStyle.rowCenter, { width: '50%', top: -3, left: 157, }]}>
                <ItemButton title={"Gọi điện"} paddingVertical={8.5}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DetailFindDriver;

const styles = StyleSheet.create({
  iconLocation: {
    width: 20,
    height: 20,
    left: 12,
  },
  iconLocation1: {
    width: 20,
    height: 20,
    left: 90,
  },
  iconLocation2: {
    width: 20,
    height: 20,
    right: 16,
  },
  iconLocation3: {
    width: 20,
    height: 20,
    left: 80,
  },
  iconLocation4: {

    marginTop: 10,
    width: 20,
    height: 20,
    right: 16,
  },
});
