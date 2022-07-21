import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import communication from "./components/Communication";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    communication.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      console.log("personss", response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName) !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        let id = persons.find((person) => person.name === newName).id;
        const person = persons.find((n) => n.id === id);
        const changedPerson = { ...person, number: newNumber };
        communication.update(id, changedPerson).then((response) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : response.data))
          );
        });
        setNewName("");
        setNewNumber("");
      }
    } else {
      const person = { name: newName, number: newNumber };

      communication.create(person).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onClickDeleteHandle = (event) => {
    communication
      .deletePerson(event.target.getAttribute("value"))
      .then((response) => {
        setPersons(
          persons.filter((n) => n.id != event.target.getAttribute("value"))
        );
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        onClickDeleteHandle={onClickDeleteHandle}
      />
    </div>
  );
};

export default App;
