import { StyleSheet, Image, SafeAreaView, Text, View, ActivityIndicator, Modal } from 'react-native';
import React, { useState } from 'react'
import { WebView } from 'react-native-webview';
import { AppStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
const WebsiteFPL = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(true);

    const handleWebViewLoad = () => {
        setIsLoading(false);
        setShowModal(false);
    };
    return (
        <SafeAreaView style={[AppStyle.container]}>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.textLoading}>Vui lòng đợi trong giây lát ...</Text>
                        <Image
                            source={require('../assets/gif/loading_bar.gif')}
                            style={{ width: 150, height: 100, alignSelf: 'center' }}
                        />

                    </View>
                </View>
            </Modal>

            <WebView
                source={{ uri: 'https://caodang.fpt.edu.vn' }}
                onLoad={handleWebViewLoad}
            />
        </SafeAreaView>
    );
    
}

export default WebsiteFPL

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    textLoading:{
        fontSize:18,
        fontWeight:'600',
        fontStyle:'italic',
        letterSpacing:-0.41,
        color:COLOR.Tcolor,

    }
});