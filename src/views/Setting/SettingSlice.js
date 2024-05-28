import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getConfigs =  createAsyncThunk("Configs/getAllConfigs", async(companyId) => {
    const url = `${process.env.REACT_APP_API_URL}${companyId}/configs`;
    console.log(url);
    const response = await axios.get(url)
    return response.data.data.data[0]
})

export const SettingSlice = createSlice({
    name: "Configs",
    initialState: {
        configs: {}
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(getConfigs.fulfilled, (state, action) => {
            state.configs = action.payload
        })
    }
})

export const {} = SettingSlice.actions

export default SettingSlice.reducer