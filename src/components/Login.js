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

const Login = ({navigation}) => {
  
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const handleSubmit = async () => {
try {
const response = await axios.post('http://192.168.1.12:8000/api/login', {
username,
password,
});
if (response.status===200) {
alert('Login Success', 'You are now logged in.');
navigation.navigate('Home');
} else {
setError('Invalid credentials');
}
} catch (error) {
  console.log(error)
setError('Invalid credentials');
}
};

return (
<View style={styles.body}>
<ImageBackground
source={require('../img/hinh.jpg')}
resizeMode={'cover'}
style={{flex: 1, width: '100%'}}>
<View style={styles.content}>
<ScrollView>
<View style={{marginLeft: 50}}>
<Text style={styles.text}> Welcome ! </Text>
<Text style={{color: '#000', fontWeight: 500, fontSize: 14.5}}>
Đăng nhập để có những trải nghiệm tốt nhất nhé
</Text>
</View>
<View style={{marginTop: 30}}>
          <View style={{alignItems: 'center', marginLeft: 30}}>
            <View>
              <Text style={styles.lable}>Name</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                />
                <Icon style={{position: 'absolute'}} name="person"></Icon>
              </View>
            </View>

            <View>
              <Text style={styles.lable}>Password</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <Icon style={{position: 'absolute'}} name="key"></Icon>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 600}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text>Bạn chưa có tài khoản?</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={{color: '#000', fontSize: 20, fontWeight: 600}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
        </View>
      </ScrollView>
    </View>
  </ImageBackground>
</View>
);
};
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    height: '100%',
  },
  content: {
    flex: 1,

    marginTop: '40%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  text: {
    fontSize: 30,
    fontFamily: 'Times New Roman',
    color: '#000',
    marginTop: 50,
    fontWeight: 900,
  },
  lable: {
    marginLeft: 30,
    fontFamily: 'Times New Roman',
    color: '#000',
    fontWeight: 900,
    marginTop: 10,
  },
  input: {
    fontSize: 20,
    paddingLeft: 35,
    height: 40,
    width: '90%',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: '70%',
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
  button1: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    width: '70%',
    backgroundColor: '#fff',
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
});
export default Login;
