import {SET_LIST_DATA} from '../actions/action';

const initialState = {
  listData: [],
};

const listData= (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_DATA: 
      return {...state, listData: action.payload.listData};
    default:
      return state;
  }
  
};
export default listData;
