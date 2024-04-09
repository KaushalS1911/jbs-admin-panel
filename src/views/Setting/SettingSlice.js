import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const user = JSON.parse(localStorage.getItem('user'))
export const getConfigs =  createAsyncThunk("Configs/getAllConfigs", async() => {
    const url = `${process.env.REACT_APP_API_URL}${user.company_id}/configs`;
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