import Person from "./Person";

const Persons = ({ persons, filter, onClickDeleteHandle }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <li key={person.id}>
            <Person person={person} />
            <button onClick={onClickDeleteHandle} value={person.id}>
              delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
