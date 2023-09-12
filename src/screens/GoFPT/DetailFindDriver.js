import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AppStyle } from "../../constants/AppStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../../constants/Theme";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { appStyle } from "../../app/theme/appStyle";
import ItemButton from "../../components/ItemButton";

const DetailFindDriver = () => {
  return (
    <SafeAreaView>
      <View style={[AppStyle.column]}>
        <View style={[AppStyle.column, { margin: 10 }]}>
          <Text style={AppStyle.titleBig}> Tìm tài xế </Text>
        </View>
      </View>
      <SafeAreaView
        style={[
          AppStyle.header,
          { padding: 30 },
          { height: 520, width: 360, left: 16 },
        ]}
      >
        <View
          style={[AppStyle.header1, AppStyle.row, { alignItems: "center" }]}
        >
          <Image
            style={styles.iconLocation}
            source={require("../../assets/icons/ic_location.png")}
          />
          <Text
            style={[
              AppStyle.text12,
              { fontWeight: "600", marginLeft: 4, left: 10, color: "white" },
            ]}
          >
            Quận Bình Thạnh
          </Text>

          <View style={[AppStyle.row, { alignItems: "center" }]}>
            <Image
              style={styles.iconLocation1}
              source={require("../../assets/icons/ic_destination.png")}
            />
            <Text
              style={[
                AppStyle.text12,
                { fontWeight: "600", marginLeft: 4, left: 90, color: "white" },
              ]}
            >
              Tòa F
            </Text>
          </View>
        </View>
        <View style={[AppStyle.row, { alignItems: "center", marginTop: -20 }]}>
          <Image
            style={styles.iconLocation2}
            source={require("../../assets/icons/ic_user_focus.png")}
          />
          <Text
            style={[AppStyle.text12, { fontWeight: "600", top: -2, right: 8 }]}
          >
            {" "}
            Nguyễn Văn A
          </Text>
          <Image
            style={styles.iconLocation3}
            source={require("../../assets/icons/ic_id_verify.png")}
          />
          <Text
            style={[AppStyle.text12, { fontWeight: "600", top: -2, left: 80 }]}
          >
            {" "}
            PS12345
          </Text>
        </View>
        <View>
          <View style={[AppStyle.rowCenter, { width: "50%" }]}>
            <Image
              style={styles.iconLocation4}
              source={require("../../assets/icons/ic_calendar.png")}
            />
            <Text
              style={[AppStyle.text10, { fontWeight: "600", top: 6, right: 8 }]}
            >
              {" "}
              Ngày:12/02/2023
            </Text>
          </View>
          {/* <View style={[AppStyle.rowCenter, { width: '50%', justifyContent: 'space-between' }]}>
              <View style={AppStyle.rowCenter}>
                <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_phone.png')} />
                <Text style={[AppStyle.text10, { fontWeight: '500', marginLeft: 6, letterSpacing: .8, color: COLOR.textPhone, }]}
                >{getDisplayedText()}</Text>
              </View>

              <TouchableOpacity onPress={toggleHidden}>
                {
                  hidden ? (<Image style={AppStyle.iconSmall} source={require('../../assets/icons/ic_invisible.png')} />)
                    : (<Image style={AppStyle.iconSmall} source={require('../../assets/icons/ic_visible.png')} />)
                }
              </TouchableOpacity>
            </View>
          </View><View style={[AppStyle.rowCenter, { width: '50%', justifyContent: 'space-between' }]}>
              <View style={AppStyle.rowCenter}>
                <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_phone.png')} />
                <Text style={[AppStyle.text10, { fontWeight: '500', marginLeft: 6, letterSpacing: .8, color: COLOR.textPhone, }]}
                >{getDisplayedText()}</Text>
              </View>

              <TouchableOpacity onPress={toggleHidden}>
                {
                  hidden ? (<Image style={AppStyle.iconSmall} source={require('../../assets/icons/ic_invisible.png')} />)
                    : (<Image style={AppStyle.iconSmall} source={require('../../assets/icons/ic_visible.png')} />)
                }
              </TouchableOpacity> */}
        </View>
        <View>
          <View style={[AppStyle.rowCenter, { width: "50%" }]}>
            <Image
              style={styles.iconLocation4}
              source={require("../../assets/icons/ic_time.png")}
            />
            <Text
              style={[
                AppStyle.text10,
                { fontWeight: "600", top: 6, right: 10 },
              ]}
            >
              Thời gian:14h00
            </Text>
            <View style={[AppStyle.rowCenter, { width: "50%" }]}>
              <Image
                style={[
                  styles.iconLocation3,
                  { tintColor: COLOR.textMoney, top: 7, left: 85 },
                ]}
                source={require("../../assets/icons/ic_vietnam_dong.png")}
              />
              <Text
                style={[
                  AppStyle.text12,
                  {
                    fontWeight: "600",
                    top: 6,
                    left: 90,
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
            <View style={[AppStyle.rowCenter, { width: "50%" }]}>
              <Image
                style={styles.iconLocation4}
                source={require("../../assets/icons/ic_road_map.png")}
              />
              <Text
                style={[
                  AppStyle.text10,
                  { fontWeight: "600", top: 6, right: 10 },
                ]}
              >
                Quãng đường
              </Text>
            </View>
            <View style={[AppStyle.header3]}>
              <Image
                style={[
                  AppStyle.header3,
                  { borderWidth: 1, borderColor: COLOR.border },
                ]}
                source={require("../../assets/images/image23.png")}
              ></Image>
            </View>
            <View>
              <View style={[AppStyle.rowCenter, { width: "50%" }]}>
                <Image
                  style={styles.iconLocation4}
                  source={require("../../assets/icons/ic_note.png")}
                />
                <Text
                  style={[
                    AppStyle.text10,
                    { fontWeight: "600", top: 6, right: 10 },
                  ]}
                >
                  Ghi chú
                </Text>
              </View>
              <View style={[AppStyle.item1, { height: 90 }]}>
                <Text style={[AppStyle.titleMedium, { color: "black" }]}>
                  mình cần tìm 1 bạn đi đi ghép đường 12 phường 3 khu phố 4 quận
                  Bình Thạnh tới toà T{" "}
                </Text>
                
              </View>
              
            </View>
            <View>
            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <ItemButton title={"Xem chi tiết"} paddingVertical={1}
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
    left: 10,
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
    marginTop: 15,
    width: 20,
    height: 20,
    right: 16,
  },
});
