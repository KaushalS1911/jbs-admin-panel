import { createSlice } from '@reduxjs/toolkit';

export const StudentSlice = createSlice({
  name: 'student',
  initialState: {
    personalDetails: {},
    addressDetails: {},
    guardianDetails: [],
    feesDetails: {}
  },
  reducers: {
    settingPersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    settingAddressDetails: (state, action) => {
      state.addressDetails = action.payload;
    },
    settingGuardianDetails: (state, action) => {
      state.guardianDetails = action.payload;
    },
    settingFeesDetails: (state, action) => {
      state.feesDetails = action.payload;
    },
    removeAllStateData: (state, action) => {
      state.personalDetails = {};
      state.addressDetails = {};
      state.guardianDetails = [];
      state.feesDetails = {};

    }
  }
});

export const {
  settingPersonalDetails,
  settingAddressDetails,
  settingFeesDetails,
  settingGuardianDetails,
  removeAllStateData
} = StudentSlice.actions;
export const studentReducer = StudentSlice.reducer;