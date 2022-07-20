import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  console.log("render", countries.length, "countries");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="App">
      find countries{" "}
      <input value={filter} onChange={handleFilterChange}></input>
      <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default App;
