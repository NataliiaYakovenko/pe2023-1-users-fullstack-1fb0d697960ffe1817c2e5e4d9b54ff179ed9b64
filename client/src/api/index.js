import axios from "axios";

const axiosInstans = axios.create({ baseURL: "http://localhost:5000/api" });

export const createUser = (data) => axiosInstans.post("/users", data);
export const getUsers = () => axiosInstans.get("/users/");
export const deleteUser = (id) => axiosInstans.delete(`/users/${id}`);
