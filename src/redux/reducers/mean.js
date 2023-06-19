import {SET_MEAN} from '../actions/action';

const initialState = {
 text:null,
 mean:null,
 
};

const data= (state = initialState, action) => {
    
  switch (action.type) {
    case SET_MEAN: 
      return {...state,text:action.payload.text,mean:action.payload.mean};
    default:
      return state;
  }
  
};
export default data;
