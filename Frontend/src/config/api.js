import axios from 'axios';

export const API_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_URL, 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${localStorage.getItem("jwt")}` 
  },
});


