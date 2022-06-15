import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(response => JSON.parse(response.config.data))
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const addPerson = (person) => {
  const request = axios.post(`${baseUrl}`, person)
  return request.then(response => response.data)
}

const functions = { getAll, update, deletePerson, addPerson }

export default functions