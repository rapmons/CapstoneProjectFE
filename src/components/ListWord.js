import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-ionicons';

const ListWord = ({navigation}) => {
  const [words, setWords] = useState([
    {id: 1, name: 'apple', saved: true},
    {id: 2, name: 'banana', saved: false},
    {id: 3, name: 'orange', saved: false},
    {id: 4, name: 'grape', saved: false},
    {id: 5, name: 'grape', saved: false},
    {id: 6, name: 'grape', saved: false},
    {id: 7, name: 'grape', saved: false},
    {id: 8, name: 'grape', saved: false},
    {id: 9, name: 'grape', saved: false},
    {id: 10, name: 'grape', saved: false},
    {id: 11, name: 'grape', saved: false},
  ]);

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
      const {id, name, saved} = word;
      return (
        <Word
          key={id}
          name={name}
          saved={saved}
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
        <TouchableOpacity onPress={()=> navigation.navigate('FlashCard')}>
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

const Word = ({name, saved, onPress}) => {
  return (
    <View style={styles.word}>
      <View style={{marginLeft: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
         
          <Text style={{color: '#22a5f1', fontSize: 17, fontWeight: 600}}>
            Banana
          </Text>
          <Text
            style={{
              color: '#22a5f1',
              fontSize: 17,
              fontWeight: 600,
              marginLeft: 10,
            }}>
            /bəˈnanə/
          </Text>
          <Icon
            name="volume-high"
            style={{
              color: '#22a5f1',
              marginLeft:5,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
         
          <Text style={{color: '#000', fontSize: 17, fontWeight: 600}}>
            Quả chuối
          </Text>
        </View>
      </View>
      <Image style={styles.logo} source={require('../img/vn.png')}></Image>
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

    elevation: 10,
  },
  wordText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListWord;
