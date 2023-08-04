import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'

const ItemNewsEnterprise = (props) => {
    const { data } = props;
    const { title, nameCompany, location } = data;
    return (
        <TouchableOpacity style={[AppStyle.item, { height: 140, width: "48%", marginRight: 8, marginBottom: 6, backgroundColor: COLOR.background }]}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]} numberOfLines={1}>{title}</Text>
            <View style={[AppStyle.row, { marginTop: 8, justifyContent: 'space-between' }]}>
                <Image style={{ width: 80, height: 68, borderRadius: 8, }} source={require('../../assets/images/green_field.jpg')} />
                <View style={[AppStyle.column, { width: "45%", }]}>
                    <Text style={[AppStyle.titleSmall, { height: 50, width: "100%", paddingHorizontal: 0 }]}>{nameCompany}</Text>
                    <TouchableOpacity style={[AppStyle.column, { justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }]}>
                        <Text style={[AppStyle.titleSmall, { fontWeight: '400', fontSize: 10 }]}>Xem thêm</Text>
                        <View style={{ height: 1, width: 30, backgroundColor: COLOR.primary }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[AppStyle.row, { marginTop: 6 }]}>
                <Image style={[AppStyle.iconSmall, { top: 4 }]} source={require('../../assets/icons/ic_location.png')} />
                <Text numberOfLines={1} style={[AppStyle.titleSmall, { width: "100%", paddingHorizontal: 4, color: COLOR.title }]}>{location}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemNewsEnterprise

const styles = StyleSheet.create({})