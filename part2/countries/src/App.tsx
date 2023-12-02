import { useEffect, useState } from "react";
import "./App.css";
import CountryService from "./services/country";
import SingleCountry from "./components/SingleCountry";
import CountriesList from "./components/CountriesList";

function App() {
  const [countries, setCountries] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    CountryService.getAllCountries().then((countries) =>
      setCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    );
  }, [searchValue]);

  if (countries === null) return null;

  const handleShowCountry = (country: string) => {
    setSearchValue(country);
  };

  return (
    <>
      <div className="">
        <label htmlFor="search">Search by country name</label>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          id="search"
        />
        <div className="">
          {countries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : countries.length === 0 ? (
            <p>No matches for that input</p>
          ) : countries.length === 1 ? (
            <>
              {countries.map((country) => (
                <SingleCountry country={country} />
              ))}
            </>
          ) : (
            <CountriesList
              countries={countries}
              handleShowCountry={handleShowCountry}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
