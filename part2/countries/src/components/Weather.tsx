const Weather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.location?.name}</h3>
      <p>Temperature {weather.current?.temperature} Celcius</p>
      <img src={weather.current?.weather_icons[0]} alt="weather icon" />
      <p>{weather.current?.wind_speed} k/h</p>
    </div>
  );
};

export default Weather;
