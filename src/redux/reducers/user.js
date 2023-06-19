import {SET_USER} from '../actions/action';

const initialState = {
  name: null,
};

const user= (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: 
      return {...state, name: action.payload.name};
    default:
      return state;
  }
  
};
export default user;
