import axios from "axios";
axios.defaults.withCredentials = true;

import { BASE_URL } from "../constants/index.js";


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default instance;
