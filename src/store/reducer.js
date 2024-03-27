import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userReducer from './UserReducer';
import { studentReducer } from '../views/Student/StudentSlice'
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  user: userReducer,
  student: studentReducer
});

export default reducer;
