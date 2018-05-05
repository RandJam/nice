import axios from 'axios';

const serverUrl = 'http://localhost:5000';

const axiosMain = axios.create({
  baseURL: serverUrl,
  timeout: 1000
});

export default axiosMain
