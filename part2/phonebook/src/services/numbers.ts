import axios from 'axios'
import { Person } from '../App'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = (newObject: Person) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const updatePerson = (id: number, newObject: Partial<Person>) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id: number) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export default { getAllPersons, createPerson, updatePerson, deletePerson }