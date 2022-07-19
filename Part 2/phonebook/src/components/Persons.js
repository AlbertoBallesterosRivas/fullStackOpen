import Person from "./Person";

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <Person person={person} />
        ))}
    </ul>
  );
};

export default Persons;
