import { createSlice } from '@reduxjs/toolkit';
import { loginSuccess } from '../actions/loginactions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess, (state, action) => {
        state.user = action.payload;
      })
  },
});

export default userSlice.reducer;
