import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import { AppStyle } from '../constants/AppStyle'
import { useNavigation } from '@react-navigation/native'
import AxiosInstance from '../constants/AxiosInstance';
import { AppContext } from '../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../constants/Theme'

const DetailsNew = (props) => {
  const {navigation,route} = props;
  const {params} = route;
  const [dataNewsById, setDataNewsById] = useState({})
  const [date, setDate] = useState(undefined)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);

  const getByIdNews = async () => {
    try {
      const response = await AxiosInstance().get("news/api/get-by-id?id=" + params.id);
      if (response.result) {
        setDataNewsById(response.news)
        setDate(response.news.date.slice(0,10))
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getByIdNews()
    return () => {

    }
  }, [appState])

  return (
    <SafeAreaView style={[AppStyle.container, { padding: 16 }]}>
      <TouchableOpacity style={[AppStyle.row]} onPress={()=>{navigation.goBack()}}>
        <Image source={require('../assets/icons/ic_back_black.png')} />
        <Text style={[AppStyle.titleMedium,{backgroundColor:'white',color:COLOR.title}]}> Quay lại </Text>

      </TouchableOpacity>
      <Text style={[AppStyle.titleBig, { marginTop: 10 }]}>{dataNewsById.title}</Text>
      <View style={[AppStyle.container]}>
            {/* <Text style={[AppStyle.titleBig, { color: 'black',right:"3%" ,margin:10}]}>
                {dataNewsById.title}
            </Text> */}
            <Text style={[AppStyle.title, { width: 350 ,textAlign:'justify', marginTop:10}]}>
              {dataNewsById.content}
            </Text>
            <Image style={{ width: "100%", height: 200, borderRadius: 10, top: "2%" }} source={{uri: dataNewsById.image}} />
            <Text style={{ top: "3%",textAlign:'justify' ,marginTop:8}}>
            {dataNewsById.content}
            
            </Text>
            <View style={{ top: "10%", flexDirection: 'row', justifyContent: 'space-between' }}>
                
                    <Text>Người đăng:  {dataNewsById.author}</Text>
                 
                    <Text> Thời gian: {date}</Text>
                   
            </View>
        </View>
    </SafeAreaView>
  )
}

export default DetailsNew

const styles = StyleSheet.create({})