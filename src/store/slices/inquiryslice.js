import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createInquiry = createAsyncThunk(
  "createInquiry",
  async ({ companyId, data }) => {
    try {
      const response = await axios.post(
        `https://admin-api-tc8e.onrender.com/api/company/${companyId}/inquiry`,
        data
      );
      return response;
    } catch (error) {
      console.error("Error creating inquiry:", error);
      throw error;
    }
  }
);

export const showInquiry = createAsyncThunk(
  "showInquiry",
  async ({ companyId, page, perPage }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}${companyId}/inquiry?page=${page}&limit=${perPage}`
      );
      return {
        inquiry: response.data.data.inquiry,
        totalStudents: response.data.data.totalStudents,
      };
    } catch (error) {
      console.error("Error fetching inquiry data:", error.message);
      throw error;
    }
  }
);

export const searchInquiry = createAsyncThunk(
  "searchInquiry",
  async ({ searchText, companyId }) => {
    const searchParam = searchText ? `?searchKey=${searchText}` : "";
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/inquiry${searchParam}`;
    const response = await axios.get(apiEndpoint);
    return response.data.data.inquiry;
  }
);

export const deleteInquiry = createAsyncThunk(
  "deleteInquiry",
  async ({ id, companyId }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}${companyId}/${id}/deleteInquiry`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting inquiry:", error.message);
      throw error;
    }
  }
);

export const deleteAllInquiry = createAsyncThunk(
  "deleteallInquiry",
  async ({ ids, companyId }) => {
    try {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/delete/all-inquiry`;
      const response = await axios.delete(apiEndpoint, { data: { ids } });
      return response.data;
    } catch (error) {
      console.error("Error deleting inquiry:", error.message);
      throw error;
    }
  }
);

export const deleteAllExpense = createAsyncThunk(
  "deleteallExpense",
  async ({ ids, companyId }) => {
    try {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/delete/all-expense`;
      const response = await axios.delete(apiEndpoint, { data: { ids } });
      return response?.data;
    } catch (error) {
      console.error("Error deleting inquiry:", error.message);
      throw error;
    }
  }
);

export const deleteAllStudents = createAsyncThunk(
  "deleteallStudents",
  async ({ ids, companyId }) => {
    try {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/delete/all-students`;
      const response = await axios.delete(apiEndpoint, { data: { ids } });
      return response?.data;
    } catch (error) {
      console.error("Error deleting inquiry:", error.message);
      throw error;
    }
  }
);


export const EditInquiry = createAsyncThunk(
  "editInquiry",
  async ({ id, companyId }) => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/${id}/inquiry`;
    const response = await axios.get(apiEndpoint);
    return response.data;
  }
);

export const updateInquiry = createAsyncThunk(
  "updateInquiry",
  async ({ id, data, companyId }) => {
    try {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/${id}/updateInquiry`;
      const response = await axios.put(apiEndpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error updating inquiry:", error.message);
      throw error;
    }
  }
);

const inquirySlice = createSlice({
  name: "inquiry",
  initialState: {
    inquiry: [],
    loading: false,
    total: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiry.push(action.payload);
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(showInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiry = action.payload.inquiry;
        state.totalStudents = action.payload.totalStudents;
      })
      .addCase(showInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiry = action.payload;
      })
      .addCase(searchInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiry = action.payload;
      })
      .addCase(deleteInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(EditInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiry = action.payload;
      })
      .addCase(EditInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiry = action.payload;
      })
      .addCase(updateInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAllInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiry = action.payload;
      })
      .addCase(deleteAllInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAllExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
      })
      .addCase(deleteAllExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.allstudents = action.payload;
      })
      .addCase(deleteAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default inquirySlice.reducer;
