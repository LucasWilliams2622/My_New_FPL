import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import React from 'react'
import { AppStyle } from '../../constants/AppStyle'
import AppHeader from '../../components/AppHeader'

const GoFPT = () => {
  return (
    <SafeAreaView style={AppStyle.container}>
      <AppHeader />
    </SafeAreaView>
  )
}

export default GoFPT

const styles = StyleSheet.create({})