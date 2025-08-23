import axios from "axios";

const axiosInstans = axios.create({ baseURL: "http://localhost:5000/api" });
// if js-object => Content-Type: Application/json
//    data => req.body

// if FormData => Content-Type: multipart/form-data
//    data (text) => (multer) => req.body
//    data (file) => (multer) => req.file

export const createUser = (data) => axiosInstans.post("/users", data);
export const getUsers = () => axiosInstans.get("/users/");
export const deleteUser = (id) => axiosInstans.delete(`/users/${id}`);
