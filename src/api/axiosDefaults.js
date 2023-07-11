import axios from 'axios'

axios.defaults.baseURL = 'https://djangorestframework-darko-070f41296928.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();