import React, {useState , useEffect }from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Icon from 'react-native-ionicons';
import {TextInput} from 'react-native-paper';
import CookieManager from '@react-native-cookies/cookies';
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
ImageBackground,
KeyboardAvoidingView,
TouchableWithoutFeedback,
} from 'react-native';

const Welcome = ({navigation}) => {
  useEffect(() => {
    CookieManager.get('http://192.168.1.12:8000').then((cookies) => {
      const tokenCookie = cookies['jwt'];
      if (tokenCookie) {
        console.log('Token found in cookie:', tokenCookie.value);
        navigation.navigate('Home');
      } else {
        console.log("hehe")
        navigation.navigate('Login');
      }
    });
  }, []);

return (
<View style={styles.body}>
<ImageBackground
source={require('../img/hinh.jpg')}
resizeMode={'cover'}
style={{flex: 1, width: '100%'}}>

  </ImageBackground>
</View>
);
};
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    height: '100%',
  },
  
});
export default Welcome;
