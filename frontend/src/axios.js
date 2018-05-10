import axios from 'axios'

const serverUrl = 'https://averyniceapp.herokuapp.com'

const axiosMain = axios.create({
  baseURL: serverUrl,
  timeout: 1000,
})

export default axiosMain
