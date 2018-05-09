import axios from 'axios';

const serverUrl = 'http://192.168.48.111:5000';

const axiosMain = axios.create({
  baseURL: serverUrl,
  timeout: 1000
});

export default axiosMain
