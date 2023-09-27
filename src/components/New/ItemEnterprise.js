import { View, Text, TouchableOpacity, Image } from 'react-native'
import React,{ useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'

const ItemEnterprise = (props) => {
    const { data } = props
    const navigation = useNavigation()
    // const { title, content, name, date } = data

    const goDetail = () => {
        console.log("ID", data._id);
       navigation.navigate("DetailsNew", { id: data._id })
        
    }
    return (
        <TouchableOpacity onPress={() => goDetail()} style={[AppStyle.item, { width: "100%", paddingHorizontal: 0, paddingVertical: 0, borderRadius: 30,marginBottom:20 }]}>
            <Image style={{ width: "100%", height: 140, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} source={{uri: data.image}} />

            <View style={{paddingHorizontal:10,marginBottom: 12}}>
                <Text style={[AppStyle.titleBig, { textAlign: "center", marginTop: 10 }]} numberOfLines={1}>{data.title}</Text>

                <Text style={[AppStyle.titleSmall, { marginTop: 10, width: '80%', color: COLOR.text, fontWeight: '400' }]} numberOfLines={1}>{data.content}</Text>


                <View style={[AppStyle.row, { marginTop: 15 }]}>
                    <Text style={[AppStyle.text, { flex: 1 }]}>Người Đăng :{data.author}</Text>

                    <Text style={[AppStyle.text, { flex: 1, textAlign: 'right' }]}>Thời gian :{data.date.slice(0, 10)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  
}

export default ItemEnterprise