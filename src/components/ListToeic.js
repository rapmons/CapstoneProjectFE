import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios';
import { baseUrl,CLOUDINARY_URL,CLOUDINARY_UPLOAD_PRESET } from '../API/Url';

import Icon from 'react-native-ionicons';
import { connect } from 'react-redux';
import  { useReducer } from 'react';
import { useSelector } from 'react-redux';
import toeic from '../redux/reducers/toeic';
const VocabularyList = ({navigation,ids}) => {
  const topicId = useSelector((state) => state.topic.topicId);
  const [words, setWords] = useState(
    [
      
    ]
  );
  const loadData = async () => {
   
    try {
      const response = await axios.post(
        `${baseUrl}get-list-word`,
        {
     idTopic:topicId
        },
        
        {
          headers: {
            'Content-Type': ' application/json',
          },
        },
      );
      
      setWords(response.data)
    } catch (error) {
      if (error.response.status === 403)
    {
      navigation.navigate("Login")
    }
    }
  };
  useEffect(() => {
    loadData()
  }, []);
  console.log(topicId)
  const handleToggleSave = id => {
    const updatedWords = words.map(word => {
      if (word.id === id) {
        return {...word, saved: !word.saved};
      }
      return word;
    });
    setWords(updatedWords);
  };

  const renderWords = () => {
    return words.map(word => {
     
      return (
        <Word
          key={word.id}
          text={word.text}
          mean={word.mean}
          spell={word.spell}
          wordType={word.wordType}
          url={word.url}
          onPress={() => handleToggleSave(id)}
        />
      );
    });
  };

  return (
    <View style={styles.body}>
       <View
        style={{
          backgroundColor: '#1E55BE',
          height: 70,
          width: '100%',
        }}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems: 'center',marginTop:20 }}>
            <Icon
          name="arrow-back"
          size={30}
          style={{ marginLeft:10, color: '#fff'}}
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity onPress={()=> navigation.navigate('Game')}>
            <Text style={{color: '#fff', fontSize: 20,textDecorationLine:'underline', marginRight:10}} >Ôn tập</Text>
        </TouchableOpacity>
            </View>
        
      </View>
      <ScrollView>
        <View style={{alignItems: 'center'}}>{renderWords()}</View>
      </ScrollView>
    </View>
  );
};

const Word = ({text, mean, spell, wordType,url, onPress}) => {
  return (
    <View style={styles.word}>
      <View style={{marginLeft: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            
          }}>
         
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
              marginLeft:5,
            }}
          />
        </View>
        <Text style={{color: '#22a5f1', fontSize: 17, fontWeight: 600}}>({wordType})</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
         
          <Text style={{color: '#000', fontSize: 17, fontWeight: 600, width:170}}>
            {mean}
          </Text>
        </View>
      </View>
      <Image style={styles.logo} source={{uri:`https://res.cloudinary.com/dpnhk5kup/image/upload/${url}`}}></Image>
    
    </View>
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
    resizeMode: "contain",
    marginRight:11
   
  },
  word: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 170,
    width: '95%',
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

export default VocabularyList;
