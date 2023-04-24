import React from 'react';
import Icon from 'react-native-ionicons';
import Tts from 'react-native-tts';
import {useState} from 'react';
import axios from 'axios';
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
} from 'react-native';
const Translate = ({navigation}) => {
  const [text, setText] = useState('Tiếng Việt');
  const [text1, setText1] = useState('Tiếng Anh');
  const [vn, setVN] = useState('vi');
  const [en, setEn] = useState('en');
  const [from, setfrom] = useState('');
  const [to, setTo] = useState('');

  const swap = () => {
    const temp = text;
    const tem1 = vn;
    const tem2 = from;
    setfrom(to);
    setTo(tem2);
    setText(text1);
    setVN(en);
    setText1(temp);
    setEn(tem1);
  };
  const speak = () => {
    Tts.setDefaultLanguage(vn);
    Tts.speak(from);
  };
  const speak1 = () => {
    Tts.setDefaultLanguage(en);
    Tts.speak(to, {rate: 0.5});
  };

  //
  const translateText = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://translo.p.rapidapi.com/api/v3/translate',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key':
            'dc294d06f7msh92646223d8f046cp1db561jsnf09ed1abc927',
          'X-RapidAPI-Host': 'translo.p.rapidapi.com',
        },
        data: {
          text: from,
          from: vn,
          to: en,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setTo(response.data.translated_text);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.view}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#1E55BE',
            height: 100,
            width: '100%',
          }}>
          <Icon
            name="arrow-back"
            size={40}
            style={{marginTop: 20, marginLeft: 10, color: '#fff'}}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 60}}>
          <View style={styles.template}>
            <Text style={styles.font}>{text}</Text>
            <Icon
              style={{marginLeft: 30}}
              name="swap"
              size={30}
              color="blue"
              onPress={swap}
            />
            <Text style={{marginLeft: 30, fontSize: 20}} on>
              {text1}
            </Text>
          </View>
          <ScrollView style={{width: '90%'}}>
            <View>
              <Text style={[{marginTop: 20}, styles.font]}>From :</Text>
              <TextInput
                style={styles.area}
                multiline={true}
                onChangeText={from => setfrom(from)}
                value={from}
              />
              <View style={styles.icon}>
                <Icon
                  name="volume-high"
                  style={{marginRight: 10, color: '#9CCECA'}}
                  onPress={speak}
                />
                <Icon name="copy" style={{color: '#9CCECA'}} />
              </View>
              <Text style={[{marginTop: 10}, styles.font]}>To:</Text>
              <TextInput style={styles.area} multiline={true}>
                {to}
              </TextInput>
              <View style={styles.icon}>
                <Icon
                  name="volume-high"
                  style={{marginRight: 10, color: '#9CCECA'}}
                  onPress={speak1}
                />
                <Icon name="copy" style={{color: '#9CCECA'}} />
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => translateText()}>
                  <Text style={{color: '#fff', fontSize: 20, fontWeight: 600}}>
                    Dịch
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  view: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  template: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 80,
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
  area: {
    height: 150,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 20,
    marginTop: 10,
    color: '#000',
  },
  font: {
    fontSize: 20,
  },
  icon: {
    flexDirection: 'row',
    paddingStart: '80%',
  },

  button1: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    width: '50%',
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
});
export default Translate;
