import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Theme'
import { AppStyle } from '../../constants/AppStyle'

const ItemSearch = (props) => {
    const { placeholder, placeholderTextColor,
        icon, tintColor,
        backgroundColor,
        fontWeight, fontSize, textButtonColor,titleButton,

    } = props;
    return (
        <View style={styles.boxMain}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '90%' }}>
                <View style={styles.boxInput}>
                    <Image style={styles.icon} source={require('../../assets/icons/ic_search.png')} />
                    <TextInput style={[AppStyle.text12, { height: 36, marginLeft: 8, width: '90%' }]} placeholder='Nhập địa điểm ...' placeholderTextColor={'#6D6D6D'} />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={[AppStyle.text12, { fontWeight: '700', color: COLOR.white }]}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ width: '10%', alignItems: 'center', justifyContent: 'center', }}>
                <Image style={styles.icon} source={require('../../assets/icons/ic_filter.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default ItemSearch

const styles = StyleSheet.create({
    boxMain: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: COLOR.background,
    },
    boxInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 8,

        width: '75%',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: '#6A6A6A',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

    },
    icon: {
        width: 18,
        height: 18,
        tintColor: COLOR.black,

    },
    button: {
        backgroundColor: COLOR.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: 36,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#F26F25'

    }
})