import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const getUsers = () => api.get("/users");

export const getUserById = (id: number | string) => api.get(`/users/${id}`);

export const createUser = (user: any) => api.post("/users", user);

export const updateUserApi = (id: number | string, user: any) =>
  api.put(`/users/${id}`, user);

export const deleteUserApi = (id: number | string) =>
  api.delete(`/users/${id}`);
