import React from 'react';
import Icon from 'react-native-ionicons';
import Tts from 'react-native-tts';
import {useState} from 'react';
import axios from 'axios';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PermissionsAndroid} from 'react-native';
import {Cloudinary} from 'cloudinary-react-native';
import { baseUrl,CLOUDINARY_URL,CLOUDINARY_UPLOAD_PRESET } from '../API/Url';
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
const Word = ({text, mean, spell, post, saved, onPress}) => {
  return (
    <View style={styles.tempalte}>
      <View style={{marginLeft: 15}}>
        <Text style={{color: '#000', fontWeight: 600, marginBottom: 5}}>
          Độ chính xác : {post}%
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image style={styles.logo} source={require('../img/en.png')}></Image>
          <Text style={{color: '#22a5f1', fontSize: 17, fontWeight: 600}}>
            {text}
          </Text>
          <Text
            style={{
              color: '#22a5f1',
              fontSize: 17,
              fontWeight: 600,
              marginLeft: 10,
            }}>
            {spell}
          </Text>
          <Icon
            name="volume-high"
            style={{
              color: '#22a5f1',
              marginLeft: 5,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.logo} source={require('../img/vn.png')}></Image>
          <Text style={{color: '#000', fontSize: 17, fontWeight: 600}}>
            {mean}
          </Text>
        </View>
      </View>
      {saved ? (
        <Icon
          name="checkmark"
          size={40}
          color="green"
          onPress={onPress}
          style={{marginRight: 5}}
        />
      ) : (
        <Icon
          name="save"
          size={30}
          color="#000"
          onPress={onPress}
          style={{marginRight: 5}}
        />
      )}
    </View>
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

  const upload = async (imageUri )=> {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {'content-type': 'multipart/form-data'},
      });
      console.log(response.data.secure_url);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleSave = id => {
    const updatedWords = words.map(word => {
      if (word.result.id === id) {
        return {...word, saved: !word.saved};
      }

      return word;
    });

    saveWord(
      updatedWords[0].result.id,
      updatedWords[0].saved
     
    );
    setWords(updatedWords);
  };
  const saveWord = async (idWord, saved) => {
    const url= await upload(image)
    try {
      const response = await axios.post(
        `${baseUrl}save-my-word`,
        {
          idWord,
          saved,
          url
        },
        {
          headers: {
            'Content-Type': ' application/json',
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
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
      const response = await axios.post(
        `${baseUrl}detect`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      setWords(response.data);
      setIsLoading(false);
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
        <Word
          key={word.result.id}
          text={word.result.text}
          mean={word.result.mean}
          saved={word.saved}
          spell={word.result.spell}
          post={word.post}
          onPress={() => handleToggleSave(word.result.id)}
        />
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
          <ScrollView>
            <View style={{marginTop: 20}}>
              <View style={{alignItems: 'center'}}>{renderWords()}</View>
            </View>
          </ScrollView>
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
