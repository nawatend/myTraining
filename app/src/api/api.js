import axios from 'axios'


// Default Axios Instance
export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:4000/api'
})

export const setAuthorizationHeader = (mtToken) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${mtToken}`
}