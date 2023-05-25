import {SET_DATA} from '../actions/action';

const initialState = {
 text:null,
 data:null,
 saved:true
};

const data= (state = initialState, action) => {
    
  switch (action.type) {
    case SET_DATA: 
      return {...state,text:action.payload.text,data:action.payload.data,saved: action.payload.saved};
    default:
      return state;
  }
  
};
export default data;
