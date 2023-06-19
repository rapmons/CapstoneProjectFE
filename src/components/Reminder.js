import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VocabularyReminder = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [vocabularyList, setVocabularyList] = useState([]);
  const [currentVocabulary, setCurrentVocabulary] = useState(null);

  useEffect(() => {
    
    // Lấy danh sách từ vựng từ AsyncStorage hoặc sử dụng một danh sách mặc định
    AsyncStorage.getItem('vocabularyList', (err, result) => {
      if (result) {
        setVocabularyList(JSON.parse(result));
      } else {
        setVocabularyList([
          { word: 'Hello', meaning: 'Xin chào' },
          { word: 'Goodbye', meaning: 'Tạm biệt' },
          // Thêm các từ vựng khác vào đây
        ]);
      }
    });

    // Lấy từ vựng hiện tại từ danh sách
    setCurrentVocabulary(getRandomVocabulary);

    // Tạo một interval để hiển thị nhắc nhở sau mỗi 2 giờ
    const interval = setInterval(() => {
      setModalVisible(true);
      setCurrentVocabulary(getRandomVocabulary);
    }, 2 * 60*60 * 1000);

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const getRandomVocabulary = () => {
    if (vocabularyList.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * vocabularyList.length);
    return vocabularyList[randomIndex];
  };

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={closeModal}
      transparent={true}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          {currentVocabulary ? (
            <>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Từ: {currentVocabulary.word}</Text>
              <Text style={{ fontSize: 16 }}>Nghĩa: {currentVocabulary.meaning}</Text>
            </>
          ) : (
            <Text style={{ fontSize: 16 }}>Không có từ vựng để hiển thị</Text>
          )}
          <TouchableOpacity onPress={closeModal}>
            <Text style={{ color: 'blue' }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VocabularyReminder;
