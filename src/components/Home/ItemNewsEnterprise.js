import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'

const ItemNewsEnterprise = (props) => {
    const { data } = props;
    // const { title, nameCompany, location } = data;
    const navigation = useNavigation()

    const goDetail = () => {
        console.log("ID", data._id);
       navigation.navigate("DetailsNew", { id: data._id })
        
    }
    return (
        <TouchableOpacity onPress={()=> goDetail()} style={[AppStyle.item, { height: 140, width: "48%", marginRight: 8, marginBottom: 6, backgroundColor: COLOR.background }]}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]} numberOfLines={1}>{data.title}</Text>
            <View style={[AppStyle.row, { marginTop: 8, justifyContent: 'space-between' }]}>
                <Image style={{ width: 80, height: 68, borderRadius: 8, }} source={{uri:data.image}} />
                <View style={[AppStyle.column, { width: "45%", }]}>
                    <Text style={[AppStyle.titleSmall, { height: 50, width: "100%", paddingHorizontal: 0 }]} numberOfLines={3}>{data.content}</Text>
                    <TouchableOpacity style={[AppStyle.column, { justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }]}>
                        <Text style={[AppStyle.titleSmall, { fontWeight: '400', fontSize: 10 }]}>Xem thêm</Text>
                        <View style={{ height: 1, width: 30, backgroundColor: COLOR.primary }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[AppStyle.row, { marginTop: 6 }]}>
                <Image style={[AppStyle.iconSmall, { top: 4 }]} source={require('../../assets/icons/ic_location.png')} />
                <Text numberOfLines={1} style={[AppStyle.titleSmall, { width: "100%", paddingHorizontal: 4, color: COLOR.title }]}>abc</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemNewsEnterprise

const styles = StyleSheet.create({})