import axios, { AxiosInstance } from 'axios';


const baseURL: string = import.meta.env.VITE_BACKEND_DOMAIN;
const token = localStorage.getItem('token')
const jwt = token ? JSON.parse(token) : null;

const client: AxiosInstance = axios.create({
  baseURL,
  headers: {
    common: {
      Authorization: `Bearer ${jwt}`
    }
  }
})

export default client;
