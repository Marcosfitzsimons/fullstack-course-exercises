import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numberService from "./services/numbers";
import Notification from "./components/Notification";

export type Person = {
  name: string;
  number: string;
  id: number;
};

const INITIAL_STATE = [
  {
    name: "",
    number: "",
    id: 0,
  },
];

const App = () => {
  const [persons, setPersons] = useState<Person[]>(INITIAL_STATE);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "error"
  );
  const [notificationMessage, setNotificationMessage] = useState<null | string>(
    null
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newName || !number) return alert("Please fill in the fields");

    const personAlreadyExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personAlreadyExists && number === personAlreadyExists.number) {
      return alert("Person already exists. Change some value before send");
    }

    if (personAlreadyExists) {
      if (
        window.confirm(
          `${personAlreadyExists.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        numberService
          .updatePerson(personAlreadyExists.id, {
            ...personAlreadyExists,
            number: number,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personAlreadyExists.id ? person : returnedPerson
              )
            );
            setNotificationMessage(
              `Person number '${personAlreadyExists.name}' has been successfully modified`
            );
            setNotificationType("success");
          })

          .catch((error) => {
            console.log(error);
            if (error.response?.data?.error) {
              setNotificationMessage(error.response?.data?.error);
              setNotificationType("error");
            } else {
              setNotificationMessage(
                `Person '${personAlreadyExists.name}' was already removed from server`
              );
              setNotificationType("error");
              setPersons(
                persons.filter((person) => person.id !== personAlreadyExists.id)
              );
            }
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      const personToAdd = {
        name: newName,
        number: number,
        id: persons.length + 1 * 340,
      };
      numberService
        .createPerson(personToAdd)
        .then((returnedPerson) => {
          setNotificationMessage(
            `Person '${personToAdd.name}' successfully added`
          );
          setNotificationType("success");
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => {
          console.error(`Error adding person: ${personToAdd.name}`, error);
          setNotificationMessage(error.response?.data?.error);
          setNotificationType("error");
          // Handle error - show a message to the user, rollback changes, etc.
        });
    }
  };

  const handleDelete = (id: number) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete?.name} ?`)) {
      numberService
        .deletePerson(id)
        .then(() => {
          setNotificationMessage("Person has been deleted");
          setNotificationType("success");
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error(`Error deleting person`, error);
          setNotificationMessage(error.response?.data?.error);
          setNotificationType("error");
        });
    }
  };

  useEffect(() => {
    numberService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        console.error(`Error obtaining persons`, error);
        // Handle error - show a message to the user, rollback changes, etc.
      });
  }, []);

  const filteredByName = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification type={notificationType} message={notificationMessage} />

      <Filter setSearch={setSearch} />

      <h3>Add a new</h3>

      <PersonForm
        handleOnSubmit={handleOnSubmit}
        setNumber={setNumber}
        setNewName={setNewName}
      />

      <h4>Numbers</h4>

      <Persons
        handleDelete={handleDelete}
        persons={persons}
        search={search}
        filteredByName={filteredByName}
      />
    </div>
  );
};

export default App;
