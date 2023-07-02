import React from 'react';
import Icon from 'react-native-ionicons';
import {TextInput} from 'react-native-paper';
import {useState, useEffect} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PermissionsAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import data from '../data/translation.json';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  Keyboard,
  View,
} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

import {baseUrl, CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET} from '../API/Url';
import {setText,setUser,setListData} from '../redux/actions/action';
import { useIsFocused } from '@react-navigation/native';
const Home = ({navigation}) => {
  const route = useRoute();

  const isFocused = useIsFocused();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    // Load data or perform any necessary tasks when component mounts or refreshFlag changes
   
    getListData();
    setSearchTerm('');
    // Reset refreshFlag after useEffect is executed
    setRefreshFlag(false);
  }, [refreshFlag]);

  useEffect(() => {
    // Add navigation listener to listen for screen focus event
    const unsubscribe = navigation.addListener('focus', () => {
      // Set refreshFlag to true when the screen is focused
      setRefreshFlag(true);
    });

    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, []);
  const loadData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}get-list-history-search`,

        {
          headers: {
            'Content-Type': ' application/json',
          },
        },
      );
     
      return response.data;
    } catch (error) {
      if (error.response.status === 403)
    {
      navigation.navigate("Login")
    }
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const[listData,setListDataa]= useState([])
  const getListData = async () => {
    const datasaved = await loadData();
    console.log(datasaved);
    const newListData = [];
    for (let ii = 0; ii < datasaved.length; ii++) {
      for (let jj = 0; jj < data.length; jj++) {
        if (data[jj].id == datasaved[ii]) {
          newListData.push({ dataset: data[jj], saved: false });
        }
      }
    }
    setListDataa(newListData);
  };
  

  const searchItem = async searchTerm => {
    let saved = true; // Biến cục bộ để lưu trạng thái saved
    const datasaved = await loadData();
   
    for (let i = 0; i < data.length; i++) {
      if (data[i].word === searchTerm.toLowerCase()) {
        for (let j = 0; j < datasaved.length; j++) {
          if (data[i].id === datasaved[j]) {
            // Sửa: so sánh với datasaved[j].id
            saved = false;
            return {data: data[i], saved}; // Sửa: Trả về saved như một thuộc tính của object
          }
         
        }
        saved = true;
        return {data: data[i], saved}; // Sửa: Trả về saved như một thuộc tính của object
      }
    }

    return {data: null, saved}; // Trả về null nếu không tìm thấy phần tử
  };

  const dispatchRedux = useDispatch();
  const handleSearch = async () => {
    const {data, saved} = await searchItem(searchTerm); // Sửa: Destructure giá trị trả về
    dispatchRedux(setText(searchTerm, data, saved)); // Truyền giá trị saved vào action dispatch
    navigation.navigate('Test');
  };
  const handleMyWord =  async() => {

    await getListData();
    if(listData.length>0)
    {
      dispatchRedux(setListData(listData));
      navigation.navigate('FlashCard');
    }
   
  };
  const handleProfile = async () => {
    try {
      const data = await userProfile();
      dispatchRedux(setUser(data));
      navigation.navigate('Profile');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        navigation.navigate('Login');
      }
    }
  };
  
  const userProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}user`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.username;
    } catch (error) {
      throw error; // Re-throw the error to be caught in handleProfile()
    }
  };
  
  return (
    <View style={styles.body}>
      <View style={styles.head}>
        <Text style={styles.text}>Joy Dictionary</Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#000',
            marginTop: 30,
          }}>
          <TextInput
            style={styles.input}
            placeholder="Tra từ điển Anh-Việt"
            underlineColor={'rgba(0,0,0,0)'}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Icon
            name="search"
            size={30}
            style={{
              color: 'black',
              position: 'absolute',
              marginLeft: 40,
              marginTop: 12,
            }}
            onPress={() => handleSearch()}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 9,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{alignItems: 'center', marginRight: 10}}
            onPress={() => navigation.navigate('Photo')}>
            <View
              style={{
                backgroundColor: '#1E55BE',
                borderWidth: 2,
                borderColor: '#67A8E8',
                height: 50,
                width: 50,
                borderRadius: 17,
                alignItems: 'center',
              }}>
              <Icon
                name="camera"
                size={30}
                style={{color: 'white', marginTop: 7}}
              />
            </View>
            <Text style={{color: 'white'}}>Dịch ảnh</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#1E55BE',
                borderWidth: 2,
                borderColor: '#67A8E8',
                height: 50,
                width: 50,
                borderRadius: 17,
                alignItems: 'center',
              }}>
              <Icon
                name="image"
                size={30}
                style={{color: 'white', marginTop: 7}}
              />
            </View>
            <Text style={{color: 'white'}}>Dịch hình ảnh</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* <View
        style={{
          backgroundColor: '#FFF',
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.template}
          onPress={() => navigation.navigate('Translate')}>
          <View style={{width: 55}}>
            <Icon
              name="clipboard"
              size={50}
              color="#F7D3BA"
              style={styles.marg}
            />
          </View>

          <Text style={styles.text1}>Dịch văn bản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.template} onPress={()=> navigation.navigate("Topic")}>
          <View style={{width: 55}}>
            <Icon name="paper" size={50} color="#cf579f" style={styles.marg} />
          </View>
          <Text style={styles.text1}>Từ vựng Toeic theo chủ đề</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.template} onPress={()=> navigation.navigate('MyWord')}>
          <View style={{width: 55}}>
            <Icon name="paw" size={50} color="#daa326" style={styles.marg} />
          </View>
          <Text style={styles.text1}>Từ của bạn</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.template}
          onPress={() => navigation.navigate('Login')}>
          <View style={{width: 55}}>
            <Icon name="happy" size={50} color="#f7f400" style={styles.marg} />
          </View>
          <Text style={styles.text1}>Tài khoản của bạn</Text>
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          backgroundColor: '#FFF',
          height: '100%',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={styles.word}
            onPress={() => navigation.navigate('Translate')}>
            <View style={{width: 55}}>
              <Icon
                name="clipboard"
                size={50}
                color="#F7D3BA"
                style={styles.marg}
              />
            </View>

            <Text style={styles.text1}>Dịch văn bản</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.word}
            onPress={() => navigation.navigate('Topic')}>
            <View style={{width: 55}}>
              <Icon
                name="paper"
                size={50}
                color="#cf579f"
                style={styles.marg}
              />
            </View>
            <Text style={styles.text1}>Từ vựng Toeic</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={styles.word}
            onPress={() => handleMyWord() }>
            <View style={{width: 55}}>
              <Icon name="paw" size={50} color="#daa326" style={styles.marg} />
            </View>
            <Text style={styles.text1}>Từ của bạn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.word}
            onPress={() =>handleProfile()}>
            <View style={{width: 55}}>
              <Icon
                name="happy"
                size={50}
                color="#f7f400"
                style={styles.marg}
              />
            </View>
            <Text style={styles.text1}>Tài khoản </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    height: '100%',
  },
  head: {
    width: '100%',
    height: 230,
    backgroundColor: '#1E55BE',
  },

  text: {
    fontSize: 19,
    fontFamily: 'Times New Roman',
    color: '#E8F7FB',
    marginLeft: 20,
    marginTop: 20,
  },
  input: {
    paddingLeft: 35,
    backgroundColor: '#fff',
    fontSize: 20,
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderTopRightRadius: 60,
  },
  template: {
    flexDirection: 'row',
    width: '90%',
    height: 60,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 7,
  },
  marg: {},
  text1: {
    fontSize: 19,
    fontFamily: 'Times New Roman',
    color: '#000',
  },
  word: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: '43%',
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 10,
  },
});
export default Home;
