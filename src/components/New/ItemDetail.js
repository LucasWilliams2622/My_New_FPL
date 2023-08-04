import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { AppStyle } from '../../constants/AppStyle'

const ItemDetail = () => {
    return (
        <View style={[AppStyle.container, { padding: 16 }]}>
            <Text style={[AppStyle.titleBig, { color: 'black',right:"3%" }]}>
                Thời gian áp dụng thay đổi: 10/9/2023
            </Text>
            <Text style={[AppStyle.title, { width: 350 }]}>
                Day la text chi tiet Thời gian áp dụng thay đổi: 10/9/2023 Day la text chi tiet Thời gian áp dụng thay đổi: 10/9/2023 Day la text chi tiet Thời gian áp dụng thay đổi: 10/9/2023 Day la text chi tiet Thời gian áp dụng thay đổi: 10/9/2023
            </Text>
            <Image style={{ width: "100%", height: 200, borderRadius: 10, top: "2%" }} source={require('../../assets/images/green_field.jpg')} />
            <Text style={{ top: "3%" }}>
                Chiều 23/7, Hoàng Anh Gia Lai làm khách của Bình Dương ở lượt trận thứ hai, giai đoạn hai V-League. Cùng nằm trong top 6 đội trụ hạng tại giai đoạn 2 nhưng hiện tại tình thế 2 đội khá trái ngược nhau.
                Đội bóng phố Núi chỉ cần vượt qua Bình Dương ở trận đấu này là chính thức hoàn thành mục tiêu ở lại với V-League . Trong khi đó, đội chủ nhà chưa thắng được trận nào ở mùa giải năm nay, xếp áp chót trên bảng xếp hạng và đang rất khát điểm để nuôi hy vọng tiếp tục góp mặt ở sân chơi cao nhất của bóng đá Việt Nam.
            </Text>
            <View style={{ top: "10%", flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[AppStyle.row]}>
                    <Text>Người đăng: </Text>
                    <Text>
                        thamnh
                    </Text>
                </View>
                <View style={[AppStyle.row]}>
                    <Text> Thời gian: </Text>
                    <Text>
                        20/02/2023
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ItemDetail

const styles = StyleSheet.create({})