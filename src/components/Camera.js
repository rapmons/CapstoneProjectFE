import React from 'react';
import Icon from 'react-native-ionicons';
import Tts from 'react-native-tts';
import {useState} from 'react';
import axios from 'axios';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PermissionsAndroid} from 'react-native';

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
  ActivityIndicator
} from 'react-native';
const LoadingScreen = () => {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  );
};
const Camera = ({navigation}) => {
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
      setIsLoading(true)
      setImage(image.path);
      console.log(image.path)
      hehe(image)
    });
  };
const hehe= async (image)=>
{
  const formData = new FormData();
    formData.append('url', {
      uri: image.path,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post(
        'http://192.168.1.12:8000/api/detect',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
console.log(response.data)
     setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
}
  const handleOpenImg = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      
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
            {image==null?(<Image
             source={require('../img/camera.png')}
              style={styles.image}></Image>):
              (<Image
                source={{ uri: image }}
                 style={styles.image}></Image>)}
            
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={[styles.button1, {marginRight: 10}]} onPress={requestCameraPermission}>
              <Text style={{color: '#fff'}}> Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={requestImgPermission}>
              <Text style={{color: '#fff'}}> Photo </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <View style={{marginTop: 20}}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.tempalte}>
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{color: '#000', fontWeight: 600, marginBottom: 5}}>
                    Độ chính xác : {'30%'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Image
                      style={styles.logo}
                      source={require('../img/vn.png')}></Image>
                    <Text
                      style={{color: '#22a5f1', fontSize: 17, fontWeight: 600}}>
                      Quả chuối
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={styles.logo}
                      source={require('../img/en.png')}></Image>
                    <Text
                      style={{color: '#000', fontSize: 17, fontWeight: 600}}>
                      Banana
                    </Text>
                    <Icon
                      name="volume-high"
                      style={{
                        marginLeft: '55%',
                        color: '#22a5f1',
                        marginRight: 10,
                      }}
                     
                    />
                    <Icon name="copy" style={{color: '#22a5f1'}} />
                  </View>
                </View>
              </View>
            </View>
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
    marginTop: 10,
    marginBottom: 10,
    height: 100,
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
