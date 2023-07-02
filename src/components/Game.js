import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';
import axios from 'axios';
import { baseUrl,CLOUDINARY_URL,CLOUDINARY_UPLOAD_PRESET } from '../API/Url';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

const Quiz = ({navigation}) => {
  const topicId = useSelector((state) => state.topic.topicId);
  const [questions, setWords] = useState(
    [
      
    ]
  );
  const loadData = async () => {
   
    try {
      const response = await axios.post(
        `${baseUrl}game-toeic`,
        
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
  const [image, setImage] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [numIncorrectAnswers, setNumIncorrectAnswers] = useState(0);
  const [show, setShow]=useState(null)

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = answerIndex => {
    setSelectedAnswerIndex(answerIndex);
    setShow(answerIndex)
  };
  const handle = index => {
    setShowAnswer(true);
    setShow(null)
  };



const handleNextQuestion = () => {
  setShowAnswer(false);
  setSelectedAnswerIndex(null);
  if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
    setNumCorrectAnswers(numCorrectAnswers + 1);
  } else {
    setNumIncorrectAnswers(numIncorrectAnswers + 1);
  }
  if (currentQuestionIndex === questions.length - 1) {
    showAd();
  } else {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};

const showAd = () => {
  const totalQuestions = questions.length;
  const numCorrect = numCorrectAnswers + (selectedAnswerIndex === currentQuestion.correctAnswerIndex ? 1 : 0);
  const numIncorrect = numIncorrectAnswers + (selectedAnswerIndex !== currentQuestion.correctAnswerIndex ? 1 : 0);
  Alert.alert(
    'Quiz Result',
    `You answered ${numCorrect} questions correctly and ${numIncorrect} questions incorrectly out of ${totalQuestions} total questions.`,
    [
      {
        text: 'OK',
        onPress: async() => {
           try {
              const response = await axios.post(
                `${baseUrl}save-result`,
                {
                  idTopic: topicId,
                  number: numCorrect
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              navigation.goBack();
            } catch (error) {
              if (error.response && error.response.status === 403) {
                navigation.navigate("Login");
              } else {
                console.log("Lỗi khi gửi yêu cầu POST:", error);
              }
            }
      }
      },
    ],
  );
};

  
  
  
  
  if (questions.length==0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
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
      <View style={{alignItems: 'center', marginBottom:10}}>
        {currentQuestion.question == null ? (
          <Image
            source={require('../img/camera.png')}
            style={styles.image}></Image>
        ) : (
           <Image source={{uri:`https://res.cloudinary.com/dpnhk5kup/image/upload/${currentQuestion.question }`}} style={styles.image}></Image>
          
        )}
        <Text style={{color: '#22a5f1', fontSize: 20, fontWeight: 600}}>{currentQuestion.text}</Text>
      </View>
      
      {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAnswerSelect(index)}
          disabled={showAnswer}
          style={{
            backgroundColor:
              selectedAnswerIndex === index
                ? showAnswer
                  ? index === currentQuestion.correctAnswerIndex
                    ? '#97cbc5'
                    : 'red'
                  : '#ccc'
                : 'white',
            padding: 13,
            marginLeft:10,
            marginRight:10,
            marginBottom:7,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 5,
          }}>
          <Text style={{color: '#000', fontSize: 17, fontWeight: 600}}>{answer}</Text>
        </TouchableOpacity>
      ))}
      {showAnswer && (
        <View style={{ marginLeft:10,}} >
          {selectedAnswerIndex === currentQuestion.correctAnswerIndex ? (
            <Text style={{color: 'green', fontSize: 15, fontWeight: 500}}>Correct!</Text>
          ) : (
            <Text style={{color: 'red', fontSize: 15, fontWeight: 500}}>Sorry, wrong answer.</Text>
          )}
          {selectedAnswerIndex === currentQuestion.correctAnswerIndex ? (
            <></>
          ) : (
            <Text style={{color: '#000', fontSize: 15, fontWeight: 500}}>
              The correct answer is:{' '}
             <Text style={{color: 'red', fontSize: 15, fontWeight: 500}}> {currentQuestion.answers[currentQuestion.correctAnswerIndex]}</Text> 
            </Text>
          )}

          <TouchableOpacity onPress={handleNextQuestion}>
            <Text style={{color: '#22a5f1', fontSize: 15, fontWeight: 500, textDecorationLine: 'underline'}}  >Next question</Text>
          </TouchableOpacity>
        </View>
      )}
      {show !== null && (
        <TouchableOpacity
          onPress={() => handle(currentQuestion.correctAnswerIndex)}
          style={{ marginLeft:10}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: 500,textDecorationLine: 'underline'}}>Show answer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
  },
  image: {
    width: 224,
    height: 224,

    resizeMode: 'stretch',
    marginBottom:10
  },
});
export default Quiz;
