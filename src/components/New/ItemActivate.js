import { View, Text, TouchableOpacity, Image } from 'react-native'
import React,{ useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'

const ItemActivate = (props) => {
    const { data,navigation } = props
    const { title, content, name, date } = data
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('NewsDetails')}  style={[AppStyle.item, { width: 360, marginVertical: 5, }]}>

            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]} numberOfLines={1}>{title}</Text>
            <View style={[AppStyle.row, { marginTop: 8}]}>
                <Image style={{ width:180, height: 85, borderRadius: 8 }} source={require('../../assets/images/green_field.jpg')} />
                <View style={[AppStyle.column, {}]}>
                    <Text style={[AppStyle.text, { width:180, paddingHorizontal: 8, marginTop:10 }]}  numberOfLines={4}>{content}</Text>
                </View>
            </View>
            
            <View style={[AppStyle.row, { marginTop: 15 }]}>
                <Text style={[AppStyle.text, { flex: 1 }]}>Người Đăng :{name}</Text>
             
                <Text style={[AppStyle.text, { flex: 1 ,textAlign:'right'}]}>Thời gian :{date}</Text>
            </View>
        </TouchableOpacity>
    )
  
}

export default ItemActivate