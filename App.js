import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './src/utils/AppContext'
import BottomTabs from './src/navigation/BottomNav';
import Test from './src/screens/Test';
import TesTMap from './src/test/ChatTest'
import VideoCall from './src/screens/VideoCall'
import TestQRCode from './src/test/TestQRCode'

const App = () => {

  return (
    <AppContextProvider>
      <NavigationContainer>
        {/* <TestQRCode /> */}
        <BottomTabs/>
        {/* <TesTMap /> */}
      </NavigationContainer>
    </AppContextProvider>
  )
}
export default App
