import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/users";

type User = {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
};

type UserState = {
  data: User[];
  loading: boolean;
  error: string | null;
  total: number;
};

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({
    page,
    limit,
    search = "",
  }: {
    page: number;
    limit: number;
    search?: string;
  }) => {
    const res = await axios.get<User[]>(API_URL, {
      params: { _page: page, _limit: limit, q: search },
    });

    // const total = parseInt(res.headers["x-total-count"], 10) || 0;

    let total = Number.parseInt(res.headers["x-total-count"] ?? "NaN", 10);
    if (Number.isNaN(total)) {
      const all = await axios.get<User[]>(API_URL);
      total = all.data.length;
    }

    return { data: res.data, total };
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: Omit<User, "id">) => {
    const res = await axios.post<User>(API_URL, user);
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User) => {
    const res = await axios.patch<User>(`${API_URL}/${user.id}`, user);
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number | string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (u) => String(u.id) === String(action.payload.id)
        );
        if (idx !== -1) state.data[idx] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (u) => String(u.id) !== String(action.payload)
        );
      });
  },
});

export default usersSlice.reducer;
