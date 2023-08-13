import { StyleSheet, useWindowDimensions, Dimensions } from "react-native";
import { COLOR } from "./color";
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const appStyle = StyleSheet.create({
    container: {
        flex: 1,

    },
    logo: {
        width: '55%',
        height: '16%',
        alignSelf: 'center',
    },
    button: {
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLOR.primary,
        paddingVertical: 12,
    },
    titleButton: {
        fontWeight: '600',
        fontSize: 18,
        fontStyle: 'normal',
        color: COLOR.white

    },
    boxLogin: {
        marginHorizontal: 26,
        marginTop: 36,

    },
    boxInput: {
        paddingHorizontal: 16,
        borderWidth: 0.5,
        borderRadius: 30,
        fontWeight: '500',
        fontSize: 18,

    },

    text: {
        fontWeight: '400',
        fontSize: 14,
        fontStyle: 'normal',
        color: COLOR.text

    },
    textError: {
        fontWeight: '400',
        fontSize: 12,
        fontStyle: 'normal',
        color: COLOR.primary,
        alignSelf: 'center',
        marginTop: 8
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        fontStyle: 'italic',
        color: COLOR.text,

    },
    row: {
        flexDirection: 'row',
        alignItems: "flex-start",
    },
    column: {
        flexDirection: 'column',
        alignItems: "flex-start",
    },
    ic_social: {
        width: 48,
        height: 48,
        marginHorizontal: 16,
        marginTop: 20,
        borderRadius: 100,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: COLOR.primary,
    },
    boxShadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4.59,
        elevation: 5
    },
    boxIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.background,
        borderRadius: 8
    },
    inputSearch: {
        backgroundColor: COLOR.background,
        height: 50,
        flex: 1,
        borderRadius: 8,
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,


    },
    dishImage: {
        width: 220,
        height: 120,
        borderRadius: 16,

    },
    titleDish:{
        fontSize:16,
        fontWeight:'600',
        color:COLOR.title
    }

})