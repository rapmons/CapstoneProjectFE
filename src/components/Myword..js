import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import Icon from 'react-native-ionicons';
import {baseUrl, CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET} from '../API/Url';
const FlashCard = ({navigation}) => {
  const data123 = useSelector((state) => state.listData);
 const data12=data123.listData
  const [words, setWords] = useState(data12);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [flipAnimation] = useState(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  //


  const handleShowSnackbar = data => {
    Snackbar.show({
      text: data,
      duration: 3000,
    });
  };
  const saveWord = async (idWord, saved) => {
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
     
    } catch (error) {
      console.log(error)
      if (error.response.status === 403) {
        navigation.navigate('Login');
      }
    }
    const updatedWords = words.map((word) => {
      if (word.dataset.id === idWord) {
        return {
          ...word,
          saved: saved,
        };
      }
      return word;
    });
    setWords(updatedWords);
  };



  const flipCard = () => {
    if (!isScrolling || !isFlipped) {
      setIsFlipped(!isFlipped);
      Animated.timing(flipAnimation, {
        toValue: isFlipped ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['180deg', '270deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };
 

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
    
  };
  const handleNextWord = () => {
    setCurrentWordIndex(
      currentWordIndex === words.length - 1 ? 0 : currentWordIndex + 1,
    );
    setIsFlipped(false);
    flipAnimation.setValue(0);
  };

  return (
    <View style={styles.body}>
      <View
        style={{
          backgroundColor: '#1E55BE',
          height: 50,
          width: '100%',
          flexDirection: 'row',
        }}>
        <Icon
          name="arrow-back"
          size={30}
          style={{marginTop: 10, marginLeft: 10, color: '#fff'}}
          onPress={() =>  navigation.navigate('Home', { refresh: true })}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Times New Roman',
            color: '#E8F7FB',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Ôn tập từ đã lưu
        </Text>
      </View>

      <TouchableOpacity style={styles.container} activeOpacity={1}     onPress={flipCard }>
        <Animated.View  style={[
            styles.card,
            frontAnimatedStyle,
            { zIndex: isFlipped ? 0 : 1 },
          ]}>
       
          <Text style={styles.word}>{words[currentWordIndex].dataset.word}</Text>
          
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            styles.backCard,
            backAnimatedStyle,
            { zIndex: isFlipped ? 1 : 0 },
          ]}>
            <ScrollView  onTouchStart={handleScrollBegin}
            onTouchEnd={handleScrollEnd}>
          <Text style={styles.definition}>
            {words[currentWordIndex].dataset.translation_word}
          </Text>
          </ScrollView>
          <Icon
            name="arrow-forward"
            size={40}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: 16,
              color: '#000',
            }}
            onPress={() => handleNextWord()}
          />
        </Animated.View>
      </TouchableOpacity>
      <View style={{ flexDirection:"row", justifyContent:"space-around", marginTop:10}}>
        <TouchableOpacity style={{alignItems:'center'}}>
        {words[currentWordIndex].saved? (
  <View style={{justifyContent:'center', alignItems:'center'}}>
    <Icon
      name="star"
      size={50}
      style={{
        color: '#fff'
      }}
      onPress={() => saveWord(words[currentWordIndex].dataset.id, !words[currentWordIndex].saved)}
    />
    <Text style={{color:"#fff"}}>Lưu</Text>
  </View>
) : (
  <View style={{justifyContent:'center', alignItems:'center'}}>
    <Icon
      name="star"
      size={50}
      style={{
        color: 'yellow',
      }}
      onPress={() => saveWord(words[currentWordIndex].dataset.id, !words[currentWordIndex].saved)}
    />
    <Text style={{color:"#fff"}}>Đã Lưu</Text>
  </View>
)}

     
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems:'center'}}>
        <Icon
                name="volume-high"
                size={50}
                style={{
                  color: '#fff',
                  marginLeft: 10,
                }}
              />
        <Text style={{color:"#fff"}}>Âm thanh</Text>
        </TouchableOpacity>
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#1E55BE',
    height: '100%',
  },
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    height: 480,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  backCard: {
    position: 'absolute',
  },
  word: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#22a5f1"
  },
  definition: {
    
    fontSize: 20,
    marginLeft:15,
    marginRight:10,
    marginTop:20,
   
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  image: {
    width: 224,
    height: 224,

    resizeMode: 'stretch',
    marginBottom: 10,
  },
});

export default FlashCard;
