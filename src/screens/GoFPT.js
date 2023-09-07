import {
  useWindowDimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from "react-native";
import React from "react";
import FindDriver from "./FindDriver";
import FindTheBackSeat from "./FindTheBackSeat";
import PostedNews from "./PostedNews";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AppStyle } from "../constants/AppStyle";
import AppHeader from "../components/AppHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  tabBarLabel: ({ focused, color, size }) => {
    if (route.name === "FindDriver") {
      return (
        <Text
          style={{
            color: focused ? "#F26F25" : "#787878",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Tìm tài xế{" "}
        </Text>
      );
    } else if (route.name === "FindTheBackSeat") {
      return (
        <Text
          style={{
            color: focused ? "#F26F25" : "#787878",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Tìm yên sau
        </Text>
      );
    } else if (route.name === "PostedNews") {
      return (
        <Text
          style={{
            color: focused ? "#F26F25" : "#787878",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Tin đã đăng{" "}
        </Text>
      );
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#F26F25",
    width: "23%",
    height: 3,
    borderRadius: 40,
    left: "5%",
  },
  tabBarStyle: {
    backgroundColor: "white",
  },
});

const GoFPT = () => {
  return (
    <SafeAreaView style={AppStyle.container}>
      <AppHeader style={{ height: "45%" }} />
      <Tab.Navigator screenOptions={options}>
        <Tab.Screen name="FindDriver" component={FindDriver} />
        <Tab.Screen name="FindTheBackSeat" component={FindTheBackSeat} />
        <Tab.Screen name="PostedNews" component={PostedNews} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default GoFPT;

const styles = StyleSheet.create({});
