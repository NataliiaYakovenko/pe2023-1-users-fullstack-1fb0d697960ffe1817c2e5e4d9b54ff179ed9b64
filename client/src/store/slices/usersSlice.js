import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./../../api";

const USERS_SLICE_NAME = "users";

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};



export const getUserThunk = createAsyncThunk(
  `${USERS_SLICE_NAME}/get`,
  async (payload, {rejectWithValue}) => {
    try {
      const {data:{data}} = await API.getUsers();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isFetching = false;
    });
    builder.addCase(getUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;
