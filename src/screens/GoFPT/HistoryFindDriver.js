import { StyleSheet, ActivityIndicator, FlatList, RefreshControl, Animated, Modal, Text, Image, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useCallback, useEffect, useState } from 'react'
import ItemSearch from '../../components/GoFPT/ItemSearch'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
import ActionButton from 'react-native-action-button';
import TimerMixin from 'react-timer-mixin';
import Toast from 'react-native-toast-message';
import AppHeader from '../../components/AppHeader'
import { AppStyle } from '../../constants/AppStyle'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constants/Theme'
import ItemButton from '../../components/ItemButton'

const HistoryFindDriver = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)
    const [dataFindDriver, setDataFindDriver] = useState([])
    const [stateList, setStateList] = useState(0)

    const [refreshControl, setRefreshControl] = useState(false)
    const animatedValue = useRef(new Animated.Value(0)).current;
    const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    console.log(idUser, "idUser", infoUser);
    useEffect(() => {
        getListDriver()
        return () => {

        }
    }, [])

    const handleDelete = () => {
        Toast.show({
            ToastPosition: "top",
            type: "success", // Loại toast (success, error, info)
            text1: "Xoá thành công ✅",
            visibilityTime: 2000, // Thời gian hiển thị (ms)
            autoHide: true, // Tự động ẩn sau khi hiển thị
        });
        setModalDeleteVisible(false);
    };

    const getListDriver = async () => {
        try {
            //gofpt/api/get-by-idUser?idUser=6507177073342287aa1b01fd&typeFind=1
            const response = await AxiosInstance().get("gofpt/api/get-by-idUser?idUser=" + idUser + "&typeFind=1");
            console.log("===================================response", response);
            if (response.result) {
                if (Array.isArray(response.post) && response.post.length === 0) {
                    console.log("post là một mảng rỗng");
                } else {
                    console.log("post không phải là một mảng rỗng");
                    setIsLoading(false)
                    setDataFindDriver(response.post);
                }
            } else {
                setIsLoading(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.background }}>
            <SwipeListView
                onScroll={e => {
                    animatedValue.setValue(e.nativeEvent.contentOffset.y)
                }}
                style={{ marginTop: 18 }}

                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                data={dataFindDriver}
                renderItem={({ item }) => <ItemHistoryPosted data={item} navigation={navigation} />}
                keyExtractor={item => item._id}
                extraData={true}

                // refreshControl={
                //   <RefreshControl
                //     // refreshing={{}}
                //     onRefresh={() => {
                //       setRefreshControl(true)
                //       console.log("Refresh")
                //       setStateList(stateList + 1)
                //       console.log(stateList)

                //       setRefreshControl(false)
                //     }} colors={['green']} />
                // }

                // ListFooterComponent={() => (
                //     isLoading ? //  a==b ? b : a
                //         <View style={{
                //             marginTop: 10,
                //             alignItems: 'center',
                //             justifyContent: 'center',
                //             flexDirection: 'row',
                //             justifyContent: 'space-around',
                //             padding: 10,
                //             // width : WIDTH,
                //             // height : 50 ,
                //             flexDirection: 'column'
                //         }} >
                //             <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}> Loading ... </Text>
                //             <ActivityIndicator size="small" color='green' fontWeight='bold' />
                //         </View> : null
                // )}
                onEndReached={() => {
                    setIsLoading(true)
                    console.log("Load More")
                    // setData(mang_du_lieu)

                    setTimeout(() => {
                        //   setData(data.concat([ { title : "moi a nha"} ]))
                        setIsLoading(false)
                    }, 5000);
                }}
                onEndReachedThreshold={0.1}
                renderHiddenItem={(data, rowMap) => (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                { }
                            }}
                            style={{
                                height: '45%',
                                backgroundColor: '#74dc2e',

                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,
                            }}>
                            <Image
                                source={require('../../assets/icons/ic_edit.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 35,
                                    tintColor: 'white',
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setModalDeleteVisible(true) }}
                            style={{
                                height: '45%',
                                backgroundColor: '#A42B32',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>
                            <Image
                                source={require('../../assets/icons/ic_delete.png')}
                                style={{
                                    width: 30,
                                    height: 20,
                                    marginRight: 30,
                                    tintColor: 'white',
                                }}
                            />
                        </TouchableOpacity>
                    </>
                )}
                rightOpenValue={-85}
            />
            {/* MODAL DELETE */}
            <Modal
                visible={modalDeleteVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalDeleteVisible(false)}
            >
                <View style={AppStyle.modalContainer}>
                    <View style={[AppStyle.modalContentCenter, {}]}>

                        <View style={[{ marginTop: 2 }]}>
                            <Text
                                style={[
                                    AppStyle.text20,
                                    { marginBottom: 10, fontWeight: "600", color: "#DD0D05" },
                                ]}
                            >
                                Cảnh báo !!!
                            </Text>
                            <Text
                                style={[
                                    AppStyle.text16,
                                    { marginBottom: 10, fontWeight: "500" },
                                ]}
                            >
                                Xóa sẽ không khôi phục được
                            </Text>

                            <View
                                style={[
                                    AppStyle.row,
                                    {
                                        justifyContent: "space-between",
                                        marginTop: 24,
                                        width: "100%",
                                    },
                                ]}
                            >
                                <TouchableOpacity style={{ width: "48%" }}>
                                    <ItemButton
                                        paddingVertical={8}
                                        borderColor={"#028F5C"}
                                        title={"Hủy"}
                                        backgroundColor={"#028F5C"}
                                        onPress={() => setModalDeleteVisible(false)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "48%" }}>
                                    <ItemButton
                                        title={"Xác nhận"}
                                        backgroundColor={"#DD0D05"}
                                        paddingVertical={8}
                                        borderColor={"#DD0D05"}
                                        onPress={handleDelete}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>


        </View>
    )
}

export default HistoryFindDriver

const styles = StyleSheet.create({})