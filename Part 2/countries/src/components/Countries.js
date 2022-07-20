const Countries = ({ countries, filter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

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
      </>
    );
  }
  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
};

export default Countries;
