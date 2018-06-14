import axios from 'axios'

// const serverUrl = 'https://averyniceapp.herokuapp.com'
const serverUrl = 'http://localhost:5000'

const axiosMain = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
})

export default axiosMain
