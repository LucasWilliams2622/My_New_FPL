import {
    View, Text, StyleSheet,ToastAndroid, Image, TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { AppStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import AxiosInstance from '../constants/AxiosInstance';

const ScanQrCode = () => {
    const [isFlashOn, setIsFlashOn] = useState(false);

    const toggleFlash = () => {
        setIsFlashOn(!isFlashOn);
    }

    const handleReadQRCode = async ({ data }) => {
        try {
            console.log("data", data);
            const studentCode = data.slice(7,14)
            console.log("studentCode", studentCode);

            const response = await AxiosInstance().get("user/api/get-by-studentCode?studentCode=" + studentCode);
            if (response.result) {
                alert(response.user);

            }else{
                ToastAndroid.show("Mã code không khả dụng", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <QRCodeScanner
            onRead={handleReadQRCode}
            flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
            reactivateTimeout={500}
            showMarker={true}
            topContent={
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={[AppStyle.row, { justifyContent: 'space-between', width: '100%' }]}>
                        <Image style={[AppStyle.logo, {}]} source={require('../assets/images/logoFPL.png')} />
                        <View />
                    </View>
                    <Text style={[AppStyle.titleBig, { fontSize: 20, paddingVertical: 16, alignSelf: 'center', }]}>Kiểm tra thông tin sinh viên</Text>
                </View>
            }
            bottomContent={
                <TouchableOpacity style={styles.buttonTouchable} onPress={toggleFlash}>
                    <Image style={[AppStyle.icon, { tintColor: COLOR.light }]} source={require('../assets/icons/ic_flash_light.png')} />
                    {
                        isFlashOn ? (<Text style={styles.buttonText}>Tắt đèn</Text>) : (<Text style={styles.buttonText}>Mở đèn</Text>)
                    }
                </TouchableOpacity>
            }
        />
    )
}

export default ScanQrCode

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 21,
        color: COLOR.textLight
    },
    buttonTouchable: {
        backgroundColor: COLOR.background2,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 16,
    }
});
