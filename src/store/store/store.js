import { combineReducers, configureStore } from '@reduxjs/toolkit'
import customizationReducer from 'store/slices/customizationReducer'
import employeeslice from 'store/slices/employeeslice'
import inquiryslice from 'store/slices/inquiryslice'
import userSlice from 'store/slices/userSlice'
import { studentReducer } from 'views/Student/StudentSlice'
import SettingSlice from "../../views/Setting/SettingSlice";

const rootReducer = combineReducers({
  customization: customizationReducer,
  user: userSlice,
  employee: employeeslice,
  inquiry: inquiryslice,
  student: studentReducer,
  configs: SettingSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store
