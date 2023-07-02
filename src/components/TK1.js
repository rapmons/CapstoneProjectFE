import React, { useState, useEffect } from 'react';
import { AreaChart, Grid } from 'react-native-svg-charts';
import { Text, View, Dimensions, StyleSheet, SafeAreaView,TouchableOpacity  } from 'react-native';
import moment from 'moment';
import { Circle } from 'react-native-svg';
import Icon from 'react-native-ionicons';
import { DATA } from './Data';
import Tooltip from './Tooltip';
console.error = () => {};
const { height } = Dimensions.get('window');

const Area = ({navigation}) => {
  const [data, setData] = useState([]);
  const [tooltipX, setTooltipX] = useState(null);
  const [tooltipY, setTooltipY] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);

  useEffect(() => {
    reorderData();
  }, []);

  const reorderData = () => {
    const reorderedData = DATA.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    setData(reorderedData);
  };

  const contentInset = { left: 10, right: 10, top: 10, bottom: 7 };

  const ChartPoints = ({ x, y, color }) =>
    data.map((item, index) => (
      <Circle
        key={index}
        cx={x(moment(item.date))}
        cy={y(item.score)}
        r={6}
        stroke={color}
        fill="white"
        onPress={() => {
          setTooltipX(moment(item.date));
          setTooltipY(item.score);
          setTooltipIndex(index);
        }}
      />
    ));

  return (
 
    <SafeAreaView style={{ flex: 1 ,backgroundColor:"#fff"}}>
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
        <View  style={{ justifyContent:"center",alignItems:"center"}}>
        
      <View style={styles.word}><Text>Số từ bạn đã tìm kiếm:100</Text></View>
     
     
      <View style={styles.word}><Text>Số từ đúng trong các lần game</Text>
      <TouchableOpacity>
            <Text style={{color: '#22a5f1', fontSize: 15, fontWeight: 500, textDecorationLine: 'underline', marginLeft:5}}  >Xem</Text>
          </TouchableOpacity>
      </View>
      
      <View style={styles.word}><Text>Số từ flashcard đã thuộc:100</Text></View>
      
      </View>
      
     
    </SafeAreaView>
    
   
  );
};

const styles = StyleSheet.create({
  container: {
    height: height / 2,
    flex: 1,
    backgroundColor:"#fff"
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
  },
  word: {
    flexDirection: 'row',
    justifyContent: 'center',
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
});

export default Area;