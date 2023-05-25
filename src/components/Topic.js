import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { baseUrl,CLOUDINARY_URL,CLOUDINARY_UPLOAD_PRESET } from '../API/Url';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
 
} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import Icon from 'react-native-ionicons';
import { useSelector ,useDispatch} from 'react-redux';
import  { useReducer } from 'react';

import toeic from '../redux/reducers/toeic';
import { setTopicId } from '../redux/actions/action';

const Topic = ({navigation}) => {
  const [words, setWords] = useState(
    []
    
  );
  const loadData = async () => {
   
    try {
      const response = await axios.get(
        `${baseUrl}get-result`,
        
        {
          headers: {
            'Content-Type': ' application/json',
          },
        },
      );
      setWords(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData()
  }, []);
  const dispatchRedux = useDispatch();
  const renderWords = () => {
    return words.map(word => {
      
      return (
        <Word
          key={word.topic.id}
          id={word.topic.id}
          name={word.topic.name}
          number={word.number}
          pos={word.pos}
          onPress={() => {
            dispatchRedux(setTopicId(word.topic.id));
            navigation.navigate('Toeic')
            }}
        />
      );
    });
  };

  return (
    <View style={styles.body}>
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
      <ScrollView>
        <View style={{alignItems: 'center'}}>{renderWords()}</View>
      </ScrollView>
    </View>
  );
};

const Word = ({id,name,number,pos, onPress}) => {
  return (
    <TouchableOpacity style={styles.word} onPress={onPress}>
         <Image style={styles.logo} source={require('../img/vn.png')}></Image>
       <View >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
         
          <Text style={{color: '#22a5f1', fontSize: 20, fontWeight: 600}}>
            Lesson {id-1}:{name}
          </Text>
          
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
         
          <Text style={{color: '#000', fontSize: 17, fontWeight: 500}}>
            Số từ vựng : {number}
          </Text>
        </View>
        <ProgressBar
        styleAttr="Horizontal"
        indeterminate={false}
        progress={pos/number}
     
      />
      <Text>{`${pos/number*100}%`}</Text>
      </View>
     
     
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
  },
  logo: {
    width: 90,
    height: 80,
    resizeMode: 'cover',
   
  },
  word: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

    elevation: 10,
  },
  wordText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

 
export default Topic;
