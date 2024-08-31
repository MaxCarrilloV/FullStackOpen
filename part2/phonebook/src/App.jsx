import { useState, useEffect } from "react";
import personService from "./services/person";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter"
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  
  const personToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} setPersons={setPersons}></Persons>
    </div>
  );
};

export default App;
