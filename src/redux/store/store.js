import { legacy_createStore as createStore, combineReducers } from 'redux';
import topicReducer from '../reducers/toeic';
import data from "../reducers/data"

const rootReducer = combineReducers({
  topic: topicReducer,
  data:data
});

const store = createStore(rootReducer);

export default store;
