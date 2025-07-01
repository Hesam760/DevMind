import axios from "axios";

export const authAPI = axios.create({
  baseURL: "http://10.0.2.2:8000/auth/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const aiAPI = axios.create({
  baseURL: "http://10.0.2.2:8000/ai/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
