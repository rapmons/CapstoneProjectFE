import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-ionicons';
const FlashCard = ({navigation}) => {
  const [words, setWords] = useState([
    {word: 'Hello', definition: 'Xin chào'},
    {word: 'Goodbye', definition: 'Tạm biệt'},
    {word: 'Friend', definition: 'Bạn bè'},
    {word: 'Family', definition: 'Gia đình'},
  ]);
  const [image, setImage] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [flipAnimation] = useState(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
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
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 19,
            fontFamily: 'Times New Roman',
            color: '#E8F7FB',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Ôn tập từ đã lưu
        </Text>
      </View>

      <TouchableOpacity style={styles.container} onPress={flipCard}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <View style={{alignItems: 'center'}}>
            {image == null ? (
              <Image
                source={require('../img/camera.png')}
                style={styles.image}></Image>
            ) : (
              <Image source={{uri: image}} style={styles.image}></Image>
            )}
          </View>
          <Text style={styles.word}>{words[currentWordIndex].word}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#22a5f1', fontSize: 17, fontWeight: 600}}>
              /Hgđgdg/
            </Text>
            
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.definition}>
            {words[currentWordIndex].definition}
          </Text>
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
    height: 550,
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
  },
  definition: {
    fontSize: 20,
    textAlign: 'center',
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
