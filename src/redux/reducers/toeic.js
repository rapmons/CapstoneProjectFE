import {SET_TOPIC_ID} from '../actions/action';

const initialState = {
  topicId: null,
};

const toeic= (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPIC_ID: 
      return {...state, topicId: action.payload.id};
    default:
      return state;
  }
  
};
export default toeic;
