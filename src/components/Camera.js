import React from 'react';
import Icon from 'react-native-ionicons';
import Tts from 'react-native-tts';
import {useState} from 'react';
import axios from 'axios';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PermissionsAndroid} from 'react-native';
import {Cloudinary} from 'cloudinary-react-native';
import { useSelector ,useDispatch} from 'react-redux';
import data from '../data/translation.json'
import { setText } from '../redux/actions/action';
import {baseUrl, CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET} from '../API/Url';
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
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
const Word = ({mean, onPress}) => {
  return (
    <TouchableOpacity style={{marginRight: 6}} onPress={onPress}>
      <Text
        style={{
          color: '#22a5f1',
          fontSize: 20,
          fontWeight: '500',
          textDecorationLine: 'underline',
        }}
        >
        {mean}
      </Text>
    </TouchableOpacity>
  );
};

const LoadingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{marginTop: 10}}>Loading...</Text>
    </View>
  );
};
const Camera = ({navigation}) => {
  const [words, setWords] = useState([]);
  const [hasRenderedWords, setHasRenderedWords] = useState(false);
  // const upload = async imageUri => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', {
  //       uri: imageUri,
  //       type: 'image/jpeg',
  //       name: 'image.jpg',
  //     });
  //     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  //     const response = await axios.post(CLOUDINARY_URL, formData, {
  //       headers: {'content-type': 'multipart/form-data'},
  //     });
  //     console.log(response.data.public_id);
  //     return response.data.public_id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
 

  const[to,setTo]=useState("")
  const[text1,setText1]=useState("")
  const handleTranslate=()=>
  {
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '860d6b05ccmshb19d2dfce6cc25bp1593a9jsna4328dea7410',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: {
          q: text1,
          target: "vi",
          source: "en",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.data.translations[0].translatedText);
          setTo(response.data.data.translations[0].translatedText);
         
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
  const loadData=  async()=>
  {
    try {
      const response = await axios.get(
        `${baseUrl}get-list-history-search`,
        
        
        {
          headers: {
            'Content-Type': ' application/json',
          },
        },
      );
    
     return response.data
    } catch (error) {
      if (error.response.status === 403)
      {
        navigation.navigate("Login")
      }
    }
  }
  const searchItem = async (searchTerm) => {
    let saved = true; // Biến cục bộ để lưu trạng thái saved
    const datasaved = await loadData();
    console.log(datasaved)
    for (let i = 0; i < data.length; i++) {
      if (data[i].word === searchTerm.toLowerCase()) {
        for (let j = 0; j < datasaved.length; j++) {
          if (data[i].id === datasaved[j]) { // Sửa: so sánh với datasaved[j].id
            saved = false;
            return { data: data[i], saved }; // Sửa: Trả về saved như một thuộc tính của object
          }
        }
        saved = true;
        return { data: data[i], saved }; // Sửa: Trả về saved như một thuộc tính của object
      }
    }
  
    return {data: null, saved}; // Trả về null nếu không tìm thấy phần tử
  };
  const dispatchRedux = useDispatch();
  const handleSearch = async (searchTerm) => {
    const { data, saved } = await searchItem(searchTerm); // Sửa: Destructure giá trị trả về
    dispatchRedux(setText(searchTerm, data, saved)); // Truyền giá trị saved vào action dispatch
    navigation.navigate("Test");
  };
  
  
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleOpenCamere();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestImgPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleOpenImg();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const handleOpenCamere = () => {
    ImageCropPicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      setIsLoading(true);
      setImage(image.path);
      hehe(image);
    });
  };
  const hehe = async image => {
    const formData = new FormData();
    formData.append('url', {
      uri: image.path,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post(`${baseUrl}detect`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      const tu = response.data.caption;
      setText1(tu)
      const words = tu.split(' ');
      setWords(words);
      setHasRenderedWords(true)
      setIsLoading(false);
      setTo("")
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleOpenImg = () => {
    ImageCropPicker.openPicker({
      width: 0,
      height: 0,
      cropping: true,
    }).then(image => {
      setIsLoading(true);
      setImage(image.path);
      hehe(image);
    });
  };
  const renderWords = () => {
    return words.map(word => {
      return (
        <Word mean={word} onPress={() =>handleSearch(word)} />
      );
    });
  };
 
  return (
    <View style={styles.body}>
      <View style={styles.view}>
        <View
          style={{
            backgroundColor: '#1E55BE',
            height: 50,
            width: '100%',
          }}>
          <Icon
            name="arrow-back"
            size={30}
            style={{marginTop: 10, marginLeft: 10, color: '#fff'}}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{marginTop: 10}}>
          <View style={{alignItems: 'center'}}>
            {image == null ? (
              <Image
                source={require('../img/camera.png')}
                style={styles.image}></Image>
            ) : (
              <Image source={{uri: image}} style={styles.image}></Image>
            )}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={[styles.button1, {marginRight: 10}]}
              onPress={requestCameraPermission}>
              <Text style={{color: '#fff'}}> Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={requestImgPermission}>
              <Text style={{color: '#fff'}}> Photo </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
  <LoadingScreen />
) : (
  <>
    {hasRenderedWords ? (
      <ScrollView>
      <View
        style={{ marginTop: 20, flexDirection: 'row' ,marginRight:5}}
      >
        <Text
          style={{
            color: '#22a5f1',
            fontSize: 20,
            fontWeight: '500',
            marginRight: 5,
          }}
        >
          {'-->'}
        </Text>
        <View style={{marginEnd:5}}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap',  }}>
          {renderWords()}
        </View>
        </View>
        
      </View>
      {renderWords().length > 0 && (
      <TouchableOpacity style={{ marginRight: 6 }} onPress={() => handleTranslate()}>
        <Text
          style={{
            color: '#d11213',
            fontSize: 20,
            fontWeight: '500',
            textDecorationLine: 'underline',
          }}
        >
          Dịch nghĩa
        </Text>
      </TouchableOpacity>
      
    )}
   <Text  style={{
            color: '#000',
            fontSize: 20,
            fontWeight: '500',
            marginRight: 5,
            marginStart:25
          }}>{to}</Text>
    </ScrollView>
    ) : (
      <View></View>
    )}
  </>
)}

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    height: '100%',
  },
  view: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  image: {
    width: 224,
    height: 224,

    resizeMode: 'stretch',
  },
  logo: {
    borderRadius: 20,
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginRight: 10,
  },
  icon: {
    paddingStart: '50%',
  },
  button1: {
    marginTop: 20,
    height: 50,
    width: '30%',
    backgroundColor: '#1E55BE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 5,
  },
  tempalte: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 120,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 5,
  },
});
export default Camera;
