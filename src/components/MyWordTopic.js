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

const MyWordTopic = ({navigation}) => {
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
       
            </View>

      </View>
     
      <View style={{flexDirection:"row",justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.word}  onPress={()=> navigation.navigate('ListWord')}>
          <Image
            source={require('../img/camera.png')}
            style={styles.image}></Image>
            <Text>Từ tìm kiếm bằng hình ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.word}  onPress={()=> navigation.navigate('FlashCard')}>
          <Image
            source={require('../img/gs.jpg')}
            style={styles.image}></Image>
            <Text>Từ tìm kiếm bằng từ điển</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: 'space-around',}}>
          <TouchableOpacity style={styles.word}  onPress={()=> navigation.navigate('Statis')}>
          <Image
            source={require('../img/graph.png')}
            style={styles.image}></Image>
            <Text>Thống kê</Text>
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
  logo: {
    width: 90,
    height: 80,
    resizeMode: 'cover',
   
  },
  image: {
    width: 112,
    height: 112,

    resizeMode: 'stretch',
    marginBottom:10
  },
  word: {
   
   justifyContent:"center",
    alignItems: 'center',
   marginBottom:20,
   marginTop:20,
    width:"45%",
    height:250,
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
  
});

export default MyWordTopic;
