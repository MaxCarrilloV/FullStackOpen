import personService from "../services/person";
const Persons = ({ personToShow, setPersons }) => {
  const onDelete = (person) => {
    if (window.confirm(`delete ${person.name}`)) {
      personService
        .deletePerson(person.id)
        .then((data) =>
          setPersons(personToShow.filter((p) => p.id !== person.id))
        );
    }
  };
  return (
    <div>
      {personToShow.map((p) => {
        return (
          <div key={p.id}>
            {p.name} {p.number}
            <button onClick={(e) => onDelete(p)}> delete</button>
          </div>
        );
      })}
    </div>
  );
};
export default Persons