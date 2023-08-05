import {
    View, Text
} from 'react-native'
import React from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanQrCode = () => {
    return (
        <QRCodeScanner
        onRead={({data})=> alert(data)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        reactivateTimeout={500}
        showMarker={true}
        
      />
    )
}

export default ScanQrCode