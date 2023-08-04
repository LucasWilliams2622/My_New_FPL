import { View, Text, TouchableOpacity, Image } from 'react-native'
import React,{ useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'

const ItemEnterprise = (props) => {
    const { data } = props
    const { title, content, name, date } = data
    const [isShow, setIsShow] = useState(false)
    const facingShow = () => {
        return setIsShow(!isShow)
    }
    return (
        <TouchableOpacity onPress={facingShow} style={[AppStyle.item, { width: 360, marginVertical: 5, }]}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]} numberOfLines={1}>{title}</Text>
            <View style={[AppStyle.row, { marginTop: 8, flexDirection: isShow?"column":"row" }]}>
                <Image style={{ width: isShow ? "100%" : 180, height: isShow ? 160 : 85, borderRadius: 8 }} source={require('../../assets/images/green_field.jpg')} />
                <Text style={[AppStyle.titleMedium, {display:isShow? "flex":'none'}]}>thoi gian ap dung thay doi 10/9/2023 </Text>
                <View style={[AppStyle.column, {}]}>
                    <Text style={[AppStyle.text, { width: isShow ? 330 : 180, paddingHorizontal: 8, marginTop:10 }]}  numberOfLines={isShow? null:4}>{content}</Text>
                </View>
            </View>
            
            <View style={[AppStyle.row, { marginTop: 15 }]}>
                <Text style={[AppStyle.text, { flex: 1 }]}>Người Đăng :{name}</Text>
                <TouchableOpacity  onPress={facingShow}  style={[AppStyle.column, { justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', flex: 1 }]}>
                    <Text style={[AppStyle.titleSmall, { fontWeight: '400' }]}> {isShow?"Ẩn bớt":"Xem thêm"}</Text>
                    <View style={{ height: 1, width: 30, backgroundColor: COLOR.primary }} />

                </TouchableOpacity>
                <Text style={[AppStyle.text, { flex: 1 }]}>Thời gian :{date}</Text>
            </View>
        </TouchableOpacity>
    )
  
}

export default ItemEnterprise