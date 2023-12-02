const CountriesList = ({ countries, handleShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleShowCountry(country.name.common)}>
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
