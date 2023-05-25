export const SET_TOPIC_ID = 'SET_TOPIC_ID';
export const SET_DATA = 'SET_DATA';
export const setTopicId = (id) => {
  return {
    type: SET_TOPIC_ID,
    payload: { id },
  };
};
export const setText = (text, data,saved) => {
  return {
    type: SET_DATA,
    payload: { text,data,saved },
  };
};
