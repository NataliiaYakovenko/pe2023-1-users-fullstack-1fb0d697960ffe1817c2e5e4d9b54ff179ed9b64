import axios from "axios";

const axiosInstans = axios.create({ baseURL: "http://localhost:5000/api" });

export const getUsers = () => axiosInstans.get("/users/");
