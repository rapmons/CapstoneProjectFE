export const SET_TOPIC_ID = 'SET_TOPIC_ID';
export const SET_DATA = 'SET_DATA';
export const SET_MEAN = 'SET_MEAN';
export const SET_USER='SET_USER';
export const SET_LIST_DATA='SET_LIST_DATA'
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
export const setMean = (text,mean) => {
  return {
    type: SET_MEAN,
    payload: { text,mean},
  };
};
export const setUser = (name) => {
  return {
    type: SET_USER,
    payload: { name},
  };
};
export const setListData = (listData) => {
  return {
    type: SET_LIST_DATA,
    payload: { listData},
  };
};
