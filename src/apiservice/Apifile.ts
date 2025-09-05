// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000",
// });

// export const getUsers = () => api.get("/users");

// export const getUserById = (id: number | string) => api.get(`/users/${id}`);

// export const createUser = (user: any) => api.post("/users", user);

// export const updateUserApi = (id: number | string, user: any) =>
//   api.put(`/users/${id}`, user);

// export const deleteUserApi = (id: number | string) =>
//   api.delete(`/users/${id}`);
// export const getUsersPaginated = (page: number, limit: number) =>
//   api.get(`/users`, {
//     params: {
//       _page: page, // which page
//       _limit: limit, // items per page
//     },
//   });

// src/api/index.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

// 🔹 Get users with pagination + search
export const getUsersPaginated = async (
  page: number,
  limit: number,
  search: string = ""
) => {
  const res = await api.get("/users", {
    params: {
      _page: page,
      _limit: limit,
      q: search, // JSON Server global search
    },
  });

  return {
    data: res.data,
    total: parseInt(res.headers["x-total-count"], 10) || 0,
  };
};

// 🔹 Get single user
export const getUserById = (id: number | string) => api.get(`/users/${id}`);

// 🔹 Create user
export const createUser = (user: any) => api.post("/users", user);

// 🔹 Update user
export const updateUserApi = (id: number | string, user: any) =>
  api.put(`/users/${id}`, user);

// 🔹 Delete user
export const deleteUserApi = (id: number | string) =>
  api.delete(`/users/${id}`);
