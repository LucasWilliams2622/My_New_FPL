import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Theme'

const ItemButton = (props) => {
    const { title, textColor, fontSize, fontWeight, textAlign, fontStyle,
        backgroundColor, borderRadius, width, paddingVertical,
        onPress
    } = props
    return (
        <TouchableOpacity style={[styles.ItemButton, {
            backgroundColor: backgroundColor == null ? COLOR.primary : backgroundColor,
            borderRadius: borderRadius == null ? 10 : borderRadius,
            paddingVertical: paddingVertical == null ? 6 : paddingVertical,
            width: width == null ? '100%' : width,

        }]}
        onPress={onPress}>
            <Text style={[styles.textButton, {
                textAlign: textAlign == null ? "center" : textAlign,
                color: textColor == null ? COLOR.white : textColor,
                fontWeight: fontWeight == null ? '500' : fontWeight,
                fontSize: fontSize == null ? 12 : fontSize,
                fontStyle: fontStyle == null ? 'normal' : fontStyle,

            }]}>{title == null ? "Button" : title}</Text>
        </TouchableOpacity>
    )
}

export default ItemButton

const styles = StyleSheet.create({
    ItemButton: {
        alignItems: 'center',
        justifyContent: "center",

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3
    },
    textButton: {
        letterSpacing: 0.5,
    }
})