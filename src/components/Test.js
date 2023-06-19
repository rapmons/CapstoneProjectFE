import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-ionicons';
import data from '../data/translation.json';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {baseUrl, CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET} from '../API/Url';
const Test = ({navigation}) => {
  const handleShowSnackbar = data => {
    Snackbar.show({
      text: data,
      duration: 3000,
    });
  };

  const data123 = useSelector(state => state.data);
  const [searchTerm, setSearchTerm] = useState(data123.text);
  const [searchResult, setSearchResult] = useState(data123.data);
  const [saved, setSaved] = useState(data123.saved);
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
      if (error.response.status === 403) {
        navigation.navigate('Login');
      }
    }
  };

  const searchItem = async searchTerm => {
    const datasaved = await loadData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].word === searchTerm.toLowerCase()) {
        for (let j = 0; j < datasaved.length; j++) {
          if (data[i].id == datasaved[j]) {
            setSaved(false);
            return data[i];
          }
        }
        setSaved(true);
        return data[i];
      }
    }
    return null; // Trả về null nếu không tìm thấy phần tử
  };
  const saveWord = async (idWord, saved) => {
    setSaved(saved);
    try {
      const response = await axios.post(
        `${baseUrl}create-search`,
        {
          idWord,
          saved,
        },
        {
          headers: {
            'Content-Type': ' application/json',
          },
        },
      );

      handleShowSnackbar(response.data);
      loadData();
    } catch (error) {
      if (error.response.status === 403) {
        navigation.navigate('Login');
      }
    }
  };
  const handleSearch = async () => {
    setSearchResult(await searchItem(searchTerm));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#1E55BE',
          height: 70,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Icon
          name="arrow-back"
          size={30}
          style={{color: '#fff'}}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {saved ? (
          <Icon
            name="star"
            size={30}
            style={{
              color: '#fff',
            }}
            onPress={() => saveWord(searchResult.id, !saved)}
          />
        ) : (
          <Icon
            name="star"
            size={30}
            style={{
              color: 'yellow',
            }}
            onPress={() => saveWord(searchResult.id, !saved)}
          />
        )}
        <Icon
          name="search"
          size={30}
          style={{
            color: '#fff',
          }}
          onPress={() => handleSearch()}
        />
      </View>

      <ScrollView>
        {searchResult != null ? (
          <View key={searchResult.id} style={styles.resultItem}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.word}>{searchResult.word}</Text>
              <Icon
                name="volume-high"
                size={40}
                style={{
                  color: '#22a5f1',
                  marginLeft: 10,
                }}
              />
            </View>

            <Text style={styles.translateWord}>
              {searchResult.translation_word}
            </Text>
          </View>
        ) : (
          <Text style={styles.noResult}>No result found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  input: {
    width: '60%',
    height: 50,
    fontSize: 20,
    color: '#fff',
  },

  resultItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  word: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#22a5f1',
  },
  translateWord: {
    fontSize: 20,
  },
  noResult: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Test;
