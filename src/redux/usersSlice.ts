/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addUser = createAsyncThunk("users/addUser", async (user: any) => {
  const res = await axios.post(API_URL, user);
  return res.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",

  async (user: any) => {
    const res = await axios.patch(`${API_URL}/${user.id}`, user);
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { data: [], loading: false, error: "" } as any,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (u: any) => u.id === action.payload.id
        );
        if (idx !== -1) state.data[idx] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((u: any) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
