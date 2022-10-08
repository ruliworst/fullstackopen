import axios from 'axios'
const baseUrl = '/api/users/login'

const login = (username, password) => {
  const credentials = { username, password }
  const request = axios.post(baseUrl, credentials)
  return request.then(response => response.data)
}

export default { login }