import { useState, useEffect } from "react";
import axios from "axios";
const Countries = ({ countries, filter, setFilter }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState(0);
  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${filteredCountries[0].name.common}&limit=1&appid=${api_key}`
        )
        .then((response) => {
          setLat(response.data[0].lat);
          setLon(response.data[0].lon);
        });

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        )
        .then((response) => {
          setIcon(response.data.weather[0].icon);
          setTemperature(response.data.main.temp);
          setWind(response.data.wind.speed);
        });
    }
  }, [filteredCountries[0]]);
  if (filteredCountries.length > 11) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    return (
      <>
        {console.log(filteredCountries[0])}
        <h2>{filteredCountries[0].name.common}</h2>
        <p>capital {filteredCountries[0].capital}</p>
        <p>area {filteredCountries[0].area}</p>

        <h3>languages:</h3>
        <ul>
          {Object.values(filteredCountries[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={filteredCountries[0].flags.png} />
        <h3>Weather in {filteredCountries[0].capital}</h3>
        <p>temperature {temperature} Celsius</p>
        {icon !== "" ? (
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
        ) : (
          <></>
        )}

        <p>wind {wind} m/s</p>
      </>
    );
  }

  const handleClick = (event) => {
    setFilter(event.target.getAttribute("country"));
  };

  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name.common}>
          <span>{country.name.common}</span>
          <button country={country.name.common} onClick={handleClick}>
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
