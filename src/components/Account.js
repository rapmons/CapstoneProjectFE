import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-ionicons';
import { useSelector } from 'react-redux';
const Account = ({navigation}) => {
  const userName= useSelector((state) => state.user.name);
  
  const defaultAvatar = require('../img/vn.png');

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
        <View style={styles.container}>
        <Image source={defaultAvatar} style={styles.avatar} />
      <Text style={styles.userName}>{userName}</Text>
        </View>
      
    </View>
  );
};

const styles = {
    body:
    {
        alignItems: 'center',
        height: '100%',
        backgroundColor:"#fff"
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
    
    
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
};

export default Account;
