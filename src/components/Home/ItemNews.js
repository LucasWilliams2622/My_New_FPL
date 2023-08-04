import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'

const ItemNews = (props) => {
    const { data } = props;
    const navigation = useNavigation()
    // const { title, content ,image} = data;
    
    const goDetail = () => {
        console.log("ID", data._id);
       navigation.navigate("DetailsNew", { id: data._id })
        
    }
    return (
        <TouchableOpacity onPress={()=>goDetail()} style={[AppStyle.item, {margin:5}]}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title,width:280 }]} numberOfLines={1}>{data.title}</Text>
            <View style={[AppStyle.row, { marginTop: 8, }]}>
                <Image style={{ width: 130, height: 85, borderRadius: 8 }} source={{uri:data.image}} />
                <View style={[AppStyle.column, {}]}>
                    <Text style={[AppStyle.text, { width: 180, height: 70, paddingHorizontal: 8, textAlign:'justify'}]} numberOfLines={5}>{data.content}</Text>
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