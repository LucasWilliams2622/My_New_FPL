import { SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AppStyle } from '../constants/AppStyle'
import { COLOR } from '../constants/Theme'
import { AppContext } from '../utils/AppContext'
const AppHeader = () => {
    const { infoUser, idUser, setIsLogin } = useContext(AppContext);

    return (
        <SafeAreaView style={[AppStyle.header, AppStyle.row, { paddingTop: 20, paddingHorizontal: 16, justifyContent: 'space-between', }]}>
            <TouchableOpacity style={[AppStyle.row, {}]}>
                <Image style={AppStyle.avatar} source={require('../assets/images/defaultAvatar.png')} />
                <View style={[AppStyle.column, { marginLeft: 7, justifyContent: 'center', paddingTop: 5 }]}>
                    <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>{infoUser.name}</Text>
                    <Text style={[AppStyle.titleSmall, { paddingTop: 4 }]}>{infoUser.studentCode}</Text>
                </View>
            </TouchableOpacity>
            <Image style={{ width: 88, height: 27, marginTop: 10, paddingRight: 16, }} source={require('../assets/images/logo.jpg')} />
        </SafeAreaView>
    )
}

export default AppHeader

const styles = StyleSheet.create({})