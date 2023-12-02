import { useEffect, useState } from "react";
import WeatherService from "../services/weather";
import Weather from "./Weather";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    WeatherService.getCountryWeather(country.capital[0]).then((weather) =>
      setWeather(weather)
    );
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
      <img src={country.flags.png} alt={country.flags.alt} />

      <Weather weather={weather} />
    </div>
  );
};

export default SingleCountry;
