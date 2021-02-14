import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4001',
  // baseURL: 'http://13.250.22.237:4001',
});

export default instance;
