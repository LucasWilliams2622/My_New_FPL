import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
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
import { Input, CheckBox, RadioButton } from 'react-native-btr';
import TestShare from './src/test/Toast'
import Icon from 'react-native-vector-icons/FontAwesome';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';

Icon.loadFont();
import numeral from 'numeral';
import ItemScheduleStudy from './src/components/Schedule/ItemScheduleStudy';
import ItemNews from './src/components/Home/ItemNews';
import Home from './src/app/screens/Home';
import { LogBox } from 'react-native';
import Button from './src/components/Toast/Button';
import ToastMessage from './src/components/Toast/ToastMessage';
import Loading from './src/components/Loading/Loading';

LogBox.ignoreLogs([
  'Require cycle:',
]);
const App = () => {
  // console.log("------------->",numeral(100000000).format('0,0'));

  // return (
  //   <AppProvider>
  //     <NavigationContainer>
  //       <BottomTabNav />
  //     </NavigationContainer>
  //   </AppProvider>
  // )
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContextProvider>
      <NavigationContainer>

        {isLoading ? <Splash setIsLoading={setIsLoading} /> : <BottomTabs />}

        {/* <TestShare /> */}
        {/* <TesTMap /> */}
      </NavigationContainer>

    </AppContextProvider>

  )

}
export default App
