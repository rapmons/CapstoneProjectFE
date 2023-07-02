import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Word = ({ word, onToggleSave, onToggleReminder }) => {
  const [showIcons, setShowIcons] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const iconFadeInAnimation = useRef(null);
  const iconFadeOutAnimation = useRef(null);

  useEffect(() => {
    iconFadeInAnimation.current = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    });
    iconFadeOutAnimation.current = Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });
  }, []);

  const handlePress = () => {
    setShowIcons(!showIcons);
    if (showIcons) {
      iconFadeOutAnimation.current.start();
    } else {
      iconFadeInAnimation.current.start();
    }
  };

  const handleSavePress = () => {
    onToggleSave(word.id);
    setShowIcons(false);
  };

  const handleReminderPress = () => {
    onToggleReminder(word.id);
    setShowIcons(false);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={{ marginVertical: 8, marginHorizontal: 16 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{word}</Text>
        {showIcons ? (
          <Animated.View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handleSavePress}>
              <Animated.View
                style={{
                  opacity: animatedValue,
                  transform: [{ scale: animatedValue }],
                }}
              >
                <Icon name="bookmark" size={24} color="#444" />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReminderPress}>
              <Animated.View
                style={{
                  opacity: animatedValue,
                  transform: [{ scale: animatedValue }],
                }}
              >
                <Icon name="alarm" size={24} color="#444" style={{ marginLeft: 16 }} />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </View>
      <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{word.meaning}</Text>
    </TouchableOpacity>
  );
};

export default Word;
