import axios from 'axios'
const baseUrl = '/api/users'

let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = async () => {
    const config = { headers: { Authorization: token } }
    const response = await axios.get(baseUrl, config)
    return response.data
}

const getUser = async ({ queryKey }) => {
    const id = queryKey[1]
    const config = { headers: { Authorization: token } }
    const response = await axios.get(`${baseUrl}/${id}`, config)
    return response.data
}

const create = async newObject => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject) => {
    const config = { headers: { Authorization: token } }
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return response.data
}

export default { getAll, setToken, update, create, getUser }