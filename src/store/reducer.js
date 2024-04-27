import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import userReducer from './UserReducer';
import { studentReducer } from '../views/Student/StudentSlice'

const reducer = combineReducers({
  customization: customizationReducer,
  user: userReducer,
  student: studentReducer
});

export default reducer;
