import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountry = async (name) => {
    if (!name) return null
    const res = await axios.get(`${baseUrl}/api/name/${name}`)
    return res.data
}

export default { getCountry } 