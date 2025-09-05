import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const getUsersPaginated = async (
  page: number,
  limit: number,
  search: string = ""
) => {
  const res = await api.get("/users", {
    params: {
      _page: page,
      _limit: limit,
      q: search,
    },
  });

  return {
    data: res.data,
    total: parseInt(res.headers["x-total-count"], 10) || 0,
  };
};

export const getUserById = (id: number | string) => api.get(`/users/${id}`);

export const createUser = (user: any) => api.post("/users", user);

export const updateUserApi = (id: number | string, user: any) =>
  api.put(`/users/${id}`, user);

export const deleteUserApi = (id: number | string) =>
  api.delete(`/users/${id}`);
