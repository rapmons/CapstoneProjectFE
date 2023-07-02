import { legacy_createStore as createStore, combineReducers } from 'redux';
import topicReducer from '../reducers/toeic';
import data from "../reducers/data"
import user from '../reducers/user';
import listData from '../reducers/ListData';
const rootReducer = combineReducers({
  topic: topicReducer,
  data:data,
  user:user,
  listData:listData

});

const store = createStore(rootReducer);

export default store;
