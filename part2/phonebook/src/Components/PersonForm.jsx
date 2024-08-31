import { useState, useEffect } from "react";
import personService from "../services/person";
import Notification from "./Notification";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("exists");

  const onSubmit = (event) => {
    event.preventDefault();
    if (phone === "") {
      alert(`add phone number`);
      return;
    }
    if (newName === "") {
      alert(`add name`);
      return;
    }
    if (persons.some((e) => e.name === newName)) {
      if (persons.some((e) => e.number === phone)) {
        alert(`person name: ${newName} phone: ${phone} already exist`);
        setPhone("");
        setNewName("");
      } else if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const persona = persons.find((e) => e.name === newName);
        const changed = { ...persona, number: phone };
        personService
        .update(changed.id, changed)
        .then((data) => {
          setPersons(persons.map((e) => (e.id !== changed.id ? e : data)));
          setMessage(`The person ${newName} phone number was updated `);
          setTimeout(() => {
            setMessage("");
          }, 5000);
          setPhone("");
          setNewName("");
        })
        .catch(error => {
          setMessage(`information of ${newName} has already been removed from served `);
          setError('error')
          setTimeout(() => {
            setMessage("");
            setError('exists')
          }, 5000);
        });
      }
      return;
    }
    const person = { name: newName, number: phone, id: crypto.randomUUID };
    personService
    .addPerson(person)
    .then((person) => {
      setPersons(persons.concat(person));
      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
      setPhone("");
      setNewName("");
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Notification message={message} isError={error}></Notification>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input values={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm