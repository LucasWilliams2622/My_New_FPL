import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './src/utils/AppContext'
import { AppProvider } from './src/app/constants/AppContext'

import BottomTabs from './src/navigation/BottomNav';
import Test from './src/test/Test';
import TesTMap from './src/test/ChatTest'
import VideoCall from './src/screens/VideoCall'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScanQrCode from './src/screens/ScanQrCode';
import TestQRCode from './src/test/TestQRCode'
import BottomTabNav from './src/app/navigation/BottomNav'
import { Button, Input, CheckBox, RadioButton } from 'react-native-btr';
import TestShare from './src/test/TestShare'
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';

Icon.loadFont();
import numeral from 'numeral';

const App = () => {
  console.log("------------->",numeral(100000000).format('0,0'));

  // return (
  //   <AppProvider>
  //     <NavigationContainer>
  //       <BottomTabNav />
  //     </NavigationContainer>
  //   </AppProvider>
  // )
  return (
    <AppContextProvider>
      <NavigationContainer>
        <BottomTabs /> 
       {/* <Splash/> */}
        {/* <TestShare /> */}
         {/* <TesTMap /> */}
       
      </NavigationContainer>
     
    </AppContextProvider>
  )
  
}
export default App