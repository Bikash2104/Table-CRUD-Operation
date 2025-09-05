// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:4000/users";

// // );
// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async ({ page, limit }: { page: number; limit: number }) => {
//     const res = await axios.get(API_URL, {
//       params: { _page: page, _limit: limit },
//     });

//     return {
//       data: res.data,

//       total: parseInt(res.headers["x-total-count"], 10) || res.data.length,
//     };
//   }
// );

// export const addUser = createAsyncThunk("users/addUser", async (user: any) => {
//   const res = await axios.post(API_URL, user);
//   return res.data;
// });

// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async (user: any) => {
//     const res = await axios.patch(`${API_URL}/${user.id}`, user);
//     return res.data;
//   }
// );

// export const deleteUser = createAsyncThunk(
//   "users/deleteUser",
//   async (id: string) => {
//     await axios.delete(`${API_URL}/${id}`);
//     return id;
//   }
// );

// const usersSlice = createSlice({
//   name: "users",
//   initialState: { data: [], loading: false, error: "", total: 0 } as any,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload.data;
//         state.total = action.payload.total; // 🔹 save total count
//       })
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.data.push(action.payload);
//         state.total += 1;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         const idx = state.data.findIndex(
//           (u: any) => u.id === action.payload.id
//         );
//         if (idx !== -1) state.data[idx] = action.payload;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.data = state.data.filter((u: any) => u.id !== action.payload);
//         state.total -= 1;
//       });
//   },
// });

// export default usersSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:4000/users";

// // 🔹 Fetch users with pagination
// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async ({ page, limit }: { page: number; limit: number }) => {
//     const res = await axios.get(API_URL, {
//       params: { _page: page, _limit: limit },
//     });

//     return {
//       data: res.data,
//       total: parseInt(res.headers["x-total-count"], 10) || res.data.length, // ✅ correct total
//     };
//   }
// );

// // 🔹 Add user
// export const addUser = createAsyncThunk("users/addUser", async (user: any) => {
//   const res = await axios.post(API_URL, user);
//   return res.data;
// });

// // 🔹 Update user
// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async (user: any) => {
//     const res = await axios.patch(`${API_URL}/${user.id}`, user);
//     return res.data;
//   }
// );

// // 🔹 Delete user
// export const deleteUser = createAsyncThunk(
//   "users/deleteUser",
//   async (id: string) => {
//     await axios.delete(`${API_URL}/${id}`);
//     return id;
//   }
// );

// const usersSlice = createSlice({
//   name: "users",
//   initialState: {
//     data: [] as any[],
//     loading: false,
//     error: "",
//     total: 0, // total users count
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch users
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload.data;
//         state.total = action.payload.total; // ✅ save total count
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch users";
//       })

//       // Add user
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.data.push(action.payload);
//         state.total += 1; // update total count
//       })

//       // Update user
//       .addCase(updateUser.fulfilled, (state, action) => {
//         const idx = state.data.findIndex((u) => u.id === action.payload.id);
//         if (idx !== -1) state.data[idx] = action.payload;
//       })

//       // Delete user
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.data = state.data.filter((u) => u.id !== action.payload);
//         state.total -= 1; // update total count
//       });
//   },
// });

// export default usersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/users";

// 🔹 Fetch users with pagination
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await axios.get(API_URL, {
      params: { _page: page, _limit: limit },
    });

    console.log("Fetched Headers:", res.headers); // 👀 debug
    console.log("Fetched Data:", res.data);

    return {
      data: res.data,
      total: parseInt(res.headers["x-total-count"], 10) || 0, // use real header
    };
  }
);

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
  initialState: {
    data: [] as any[],
    loading: false,
    error: "",
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })

      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.total += 1;
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.data.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.data[idx] = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
        state.total -= 1;
      });
  },
});

export default usersSlice.reducer;
