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

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
      
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FlashCard" component={FlashCard} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Photo" component={Camera} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Translate" component={Translate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
