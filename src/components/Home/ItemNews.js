import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'

const ItemNews = (props) => {
    const { data } = props;
    const { title, content ,image} = data;
    return (
        <TouchableOpacity style={[AppStyle.item, {margin:5}]}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]} numberOfLines={1}>{title}</Text>
            <View style={[AppStyle.row, { marginTop: 8, }]}>
                <Image style={{ width: 130, height: 85, borderRadius: 8 }} source={require('../../assets/images/green_field.jpg')} />
                <View style={[AppStyle.column, {}]}>
                    <Text style={[AppStyle.text, { width: 180, height: 70, paddingHorizontal: 8, }]} numberOfLines={6}>{content}</Text>
                    <TouchableOpacity style={[AppStyle.column, { justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }]}>
                        <Text style={[AppStyle.titleSmall, { fontWeight: '400' }]}>Xem thêm</Text>
                        <View style={{ height: 1, width: 30, backgroundColor: COLOR.primary }} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemNews

const styles = StyleSheet.create({})