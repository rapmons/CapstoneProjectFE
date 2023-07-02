import React, {useEffect} from 'react';
import Icon from 'react-native-ionicons';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Header, createStackNavigator} from '@react-navigation/stack';
import Home from './src/components/Home';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Translate from './src/components/Translate';
import Welcome from './src/components/Welcome';
import Camera from './src/components/Camera';
import Game from './src/components/Game';
import FlashCard from './src/components/Myword.';
import Vocabulary from './src/components/ListToeic';
import ListWord from './src/components/ListWord';
import Topic from './src/components/Topic';
import { Provider, useDispatch, useSelector } from "react-redux";
import store from './src/redux/store/store';
import Test from './src/components/Test';
import { FlashMessageProvider } from 'react-native-flash-message';
import MyWordTopic from './src/components/MyWordTopic';
import Area from './src/components/TK1';
import Quiz from './src/components/MyGame';
import VocabularyReminder from './src/components/Reminder';
import Account from './src/components/Account';
const Stack = createStackNavigator();
const App = () => {

  return (
    <Provider store={store}> 
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyWord" component={MyWordTopic} />
      <Stack.Screen name="Profile" component={Account} />
      <Stack.Screen name="Statis" component={Area} />
     
      <Stack.Screen name="Topic" component={Topic} />
     
      <Stack.Screen name="Test" component={Test} />
    
      
    
      <Stack.Screen name="ListWord" component={ListWord} />
      
      <Stack.Screen name="Photo" component={Camera} />
     
      <Stack.Screen name="Toeic" component={Vocabulary} />
       
        <Stack.Screen name="FlashCard" component={FlashCard} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="MyGame" component={Quiz} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Translate" component={Translate} />
      </Stack.Navigator>
    </NavigationContainer>
    <VocabularyReminder/>
    </Provider>
  );
};

export default App;
