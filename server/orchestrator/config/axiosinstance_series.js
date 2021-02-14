import axios from "axios";

const instance = axios.create({
//   baseURL: 'http://localhost:4002',
  baseURL: 'http://13.250.22.237:4002',
});

export default instance;