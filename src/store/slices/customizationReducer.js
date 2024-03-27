import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const customizationSlice = createSlice({
  name: 'customization',

  initialState: {
    isOpen: [],
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
  },
  
  reducers: {
    menuOpen: (state, action) => {
      const id = action.payload;
      state.isOpen = [id];
    },
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
  },
});

export const {
  menuOpen,
  setMenu,
  setFontFamily,
  setBorderRadius,
} = customizationSlice.actions;

export default customizationSlice.reducer;
