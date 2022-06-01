import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.100.105:1337/'
})

export default api
