import { useEffect, useState } from 'react'
import CountryService from '../services/country'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const getCountry = async () => {
            try {
                const country = await CountryService.getCountry(name)
                setCountry(country)
            } catch (err) {
                console.log(err)
                setCountry(null)
            }
        }
        getCountry()
    }, [name])

    return country
}