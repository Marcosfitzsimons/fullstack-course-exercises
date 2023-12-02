import axios from 'axios'
const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY

const getCountryWeather = (capital: string) => {
    const req = axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}
    `)
    return req.then((res) => res.data)
}

export default { getCountryWeather }
