import React from 'react';
import Icon from 'react-native-ionicons';
import {TextInput} from 'react-native-paper';
import {useState} from 'react';
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
} from 'react-native';
const Home = ({navigation}) => {
  const [img, setImg] = useState('');
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
      
      navigation.navigate('Translate')
    
    });
  };

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
      <View style={styles.head}>
        <Text style={styles.text}>Image Dictionary</Text>
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
            <Text style={{color: 'white'}}>Dịch máy ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={requestImgPermission}>
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
          </TouchableOpacity>
        </View>
      </View>

      <View
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
        <TouchableOpacity style={styles.template}>
          <View style={{width: 55}}>
            <Icon name="paper" size={50} color="#cf579f" style={styles.marg} />
          </View>
          <Text style={styles.text1}>Từ vựng Toiec theo chủ đề</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.template} onPress={()=> navigation.navigate('FlashCard')}>
          <View style={{width: 55}}>
            <Icon name="paw" size={50} color="#daa326" style={styles.marg} />
          </View>
          <Text style={styles.text1}>Từ của bạn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.template} onPress={()=> navigation.navigate('Game')}>
          <View style={{width: 55}}>
            <Icon
              name="logo-game-controller-b"
              size={50}
              color="#0245f6"
              style={styles.marg}
            />
          </View>
          <Text style={styles.text1}>Game từ vựng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.template}
          onPress={() => navigation.navigate('Login')}>
          <View style={{width: 55}}>
            <Icon name="happy" size={50} color="#f7f400" style={styles.marg} />
          </View>
          <Text style={styles.text1}>Tài khoản của bạn</Text>
        </TouchableOpacity>
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
  marg: {
    marginLeft: 10,
    marginTop: 5,
  },
  text1: {
    fontSize: 19,
    fontFamily: 'Times New Roman',
    color: '#000',
    marginLeft: 20,
    marginTop: 20,
  },
});
export default Home;
