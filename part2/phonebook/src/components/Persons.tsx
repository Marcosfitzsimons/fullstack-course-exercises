import { Person } from "../App";

type PersonsProps = {
  search: string;
  filteredByName: Person[];
  persons: Person[];
  handleDelete: (id: number) => void;
};
const Persons = ({
  search,
  filteredByName,
  persons,
  handleDelete,
}: PersonsProps) => {
  return (
    <ul>
      {search ? (
        <>
          {filteredByName.map((person) => (
            <li key={person.name}>
              {person.name} <span>{person.number}</span>
            </li>
          ))}
        </>
      ) : (
        <>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name} <span>{person.number}</span>{" "}
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default Persons;
