import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./../../api";

const USERS_SLICE_NAME = "users";

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

export const createUserThunk = createAsyncThunk(
  `${USERS_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createUser(payload);
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

export const getUserThunk = createAsyncThunk(
  `${USERS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getUsers();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  `${USERS_SLICE_NAME}/delete`,
  async (payload, { rejectWithValue }) => {
    try {
      await API.deleteUser(payload); // id
      return payload;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,

  extraReducers: (builder) => {
    //create
    builder.addCase(createUserThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(createUserThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.users.push(payload);
    });

    builder.addCase(createUserThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    //get
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

    //delete
    builder.addCase(deleteUserThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.users = state.users.filter((u) => u.id !== payload);
    });
    builder.addCase(deleteUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;
