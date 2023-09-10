import { StyleSheet, useWindowDimensions, Dimensions } from "react-native";
import { COLOR } from "./Theme";
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const AppStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.background,
    },
    main: {
        flex: 1,
        backgroundColor: COLOR.background,
        paddingHorizontal: 16,
        paddingVertical:12
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconSmall: {
        width: 12,
        height: 12,
    },
    iconMedium: {
        width: 16,
        height: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 1000,
    },
    portrait: {
        height: 160, width: 130, borderRadius: 8,
    },
    logo: {
        width: 100,
        height: 40,
        borderRadius: 20

    },
    border: {
        borderWidth: 0.5,
        borderColor: COLOR.border,
        borderRadius: 10,
    },
    titleBig: {
        fontSize: 18,
        fontWeight: "700",
        fontStyle: 'normal',
        color: COLOR.titlePrimary,
    },
    titleMedium: {
        fontSize: 14,
        fontWeight: "700",
        fontStyle: 'normal',
        color: COLOR.titlePrimary,
    },
    titleSmall: {
        fontSize: 12,
        fontWeight: "700",
        fontStyle: 'normal',
        color: COLOR.titlePrimary,
    },
    text10: {
        fontSize: 10,
        color:COLOR.newText,
        fontWeight:'400',
        letterSpacing:0.5,
        fontStyle:'normal',

    },
    text12: {
        fontSize: 12,
        color:COLOR.newText,
        fontWeight:'400',
        letterSpacing:0.5,
        fontStyle:'normal',

    },
    text14: {
        fontSize: 14,
        color:COLOR.newText,
        fontWeight:'400',
        letterSpacing:0.5,
        fontStyle:'normal',

    },
    text16: {
        fontSize: 16,
        color:COLOR.newText,
        fontWeight:'400',
        letterSpacing:0.5,
        fontStyle:'normal',

    },
    text20: {
        fontSize: 20,
        color:COLOR.newText,
        fontWeight:'400',
        letterSpacing:0.5,
        fontStyle:'normal',

    },
    text: {
        color: COLOR.text,
        fontSize: 10,
        fontWeight: '400',
        fontStyle: 'normal',

    },
    textNormal: {
        color: COLOR.title,
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 12,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: "102%",
        height: 90,
        top: -10,
        right: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3
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
    item: {
        borderRadius: 8,
        backgroundColor: COLOR.background,
        paddingVertical: 12,
        paddingHorizontal: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: -2,
            width: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    buttonVideo: {
        backgroundColor: '#1178F8',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dropdown: {
        margin: 15,
        marginBottom: 0,
        borderColor: '#C6C6C6',
        borderWidth: 1,
        borderRadius: 8,
        height: 50,
        backgroundColor: 'white',
        padding: 12,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 15,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: COLOR.border,
        backgroundColor: COLOR.background,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 5
    },

    buttonBlue: {
        backgroundColor: COLOR.blue,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10

    },
    titleButton: {
        color: COLOR.white,
        fontWeight: '500',
        fontSize: 16
    },
    textError: {
        fontWeight: '400',
        fontSize: 12,
        fontStyle: 'normal',
        color: COLOR.primary,
        alignSelf: 'center',
        marginTop: 8
    },
    inputModal: {
        width: 300,
        height: 40,
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingLeft: 15,
        borderRadius: 15,
      },
    viewinputModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:12
      },
    ddinputModal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      },
    txtModal1: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginTop: '-3%',
      },
    txtModal2: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
      },
    btnX: {
        marginLeft: '90%',
        marginTop: '-1%',
      },
    viewheadModal: {
        height: 60,
        width: '100%',
        backgroundColor: '#F38181',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: 'center',
      },
    modalView: {
        height: 500,
        width: 350,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
      },
    modalBackground: {
        flex: 1,
        height:700,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    
    switchButton: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 50, // Để làm cho nút tròn
      padding: 10,
    },
    image: {
      width: 100,
      height: 100,
    },

})