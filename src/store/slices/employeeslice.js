import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const createEmployee = createAsyncThunk('createEmployee', async ({ companyId, data }) => {
  try {
    const response = await axios.post(`https://admin-api-tc8e.onrender.com/api/company/${companyId}/employee`, data);
    return response;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    throw error;
  }
});

export const showEmployee = createAsyncThunk('showEmployee', async ({ companyId, page, perPage }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}${companyId}/employee?page=${page}&limit=${perPage}`);
    return {
      employees: response.data.data.employees,
      total: response.data.data.total
    };
  } catch (error) {
    console.error('Error fetching inquiry data:', error.message);
    throw error;
  }
});


export const searchEmployee = createAsyncThunk('searchEmployee', async ({ searchText, companyId }) => {
  const searchParam = searchText ? `?searchKey=${searchText}` : '';
  const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/employee${searchParam}`;
  const response = await axios.get(apiEndpoint);
  return response.data.data.employees;
});


export const deleteEmployee = createAsyncThunk('deleteEmployee', async ({ id, companyId }) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}${companyId}/${id}/deleteEmployee`)
    return response;
  } catch (error) {
    console.error('Error deleting Employee:', error.message);
    throw error;
  }
});

export const EditEmployee = createAsyncThunk('Editemployee', async ({ id, companyId }) => {
  const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/${id}/employee`;
  const response = await axios.get(apiEndpoint);
  return response.data;
});


export const updateEmployee = createAsyncThunk('updateEmployee', async ({ id, data, companyId }) => {
  try {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/${id}/updateEmployee`;
    const response = await axios.put(apiEndpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Employee:', error.message);
    throw error;
  }
});


const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(showEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.total = action.payload.total;
      })
      .addCase(showEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(searchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(EditEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(EditEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
